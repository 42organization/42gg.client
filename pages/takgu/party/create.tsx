import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastState } from 'utils/recoil/toast';
import PartyCreate from 'components/takgu/party/PartyCreate';
import usePartyCategory from 'hooks/takgu/party/usePartyCategory';
import usePartyColorMode from 'hooks/takgu/party/usePartyColorMode';
import usePartyForm from 'hooks/takgu/party/usePartyForm';
import styles from 'styles/takgu/party/PartyCreate.module.scss';

export default function PartyCreatePage() {
  const router = useRouter();
  const createStep = router.query['step'];
  const setSnackBar = useSetRecoilState(toastState);
  const { categories, isCategoryLoading, isCategoryError } = usePartyCategory();
  const { partyForm, dispatchPartyForm } = usePartyForm();

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
      router.replace('/takgu/party');
    }
  }, [isCategoryLoading]);

  useEffect(() => {
    if (createStep === 'detail' && !partyForm.categoryName) {
      router.replace({
        pathname: router.pathname,
        query: { step: 'category' },
      });
    }
  }, [router, !!partyForm]);

  usePartyColorMode('PARTY-MAIN');

  if (categories.length === 0) return null;

  return (
    <div className={styles.pageContainer}>
      {createStep === 'category' && (
        <PartyCreate.CategorySelection
          categories={categories}
          defaultCategoryName={categories[0].categoryName}
          dispatchPartyForm={dispatchPartyForm}
        />
      )}
      {createStep === 'detail' && (
        <PartyCreate.DetailCustomization
          partyForm={partyForm}
          dispatchPartyForm={dispatchPartyForm}
        />
      )}
    </div>
  );
}
