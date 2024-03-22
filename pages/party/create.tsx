import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { PartyCreateForm } from 'types/partyTypes';
import { toastState } from 'utils/recoil/toast';
import PartyCreate from 'components/party/PartyCreate';
import usePartyCategory from 'hooks/party/usePartyCategory';
import usePartyColorMode from 'hooks/party/usePartyColorMode';
import styles from 'styles/party/PartyCreate.module.scss';

export default function PartyCreatePage() {
  const router = useRouter();
  const createStep = router.query['step'];
  const setSnackBar = useSetRecoilState(toastState);
  const { categories, isCategoryLoading, isCategoryError } = usePartyCategory();
  const [partyForm, setPartyForm] = useState<PartyCreateForm>();
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (!(createStep === 'category' || createStep === 'detail'))
      router.replace({
        pathname: router.pathname,
        query: { step: 'category' },
      });
  }, [router]);

  useEffect(() => {
    if (!isCategoryLoading && categories.length === 0) {
      if (!isCategoryError) {
        setSnackBar({
          toastName: 'GET request',
          message: '방을 만들기 위해 적어도 하나의 카테고리가 필요합니다.',
          severity: 'error',
          clicked: true,
        });
      }
      router.push('/party');
    }
  }, [isCategoryLoading]);

  useEffect(() => {
    if (createStep === 'detail') {
      partyForm
        ? setCategoryName(
            categories.find((c) => c.categoryId === partyForm.categoryId)
              ?.categoryName ?? '' // todo: 추후에 백엔드가 categoryName을 pk로 바꾸면 수정
          )
        : router.replace({
            pathname: router.pathname,
            query: { step: 'category' },
          });
    }
  }, [router, !!partyForm]);

  usePartyColorMode('PARTY-DETAIL');

  if (categories.length === 0) return null;

  return (
    <div className={styles.pageContainer}>
      {createStep === 'category' && (
        <PartyCreate.CategorySelection
          categories={categories}
          defaultCategoryId={categories[0].categoryId}
          setPartyForm={setPartyForm}
        />
      )}
      {createStep === 'detail' && partyForm && (
        <PartyCreate.DetailCustomization
          categoryName={categoryName}
          partyForm={partyForm}
          setPartyForm={setPartyForm}
        />
      )}
    </div>
  );
}
