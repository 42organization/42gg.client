import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { PartyCategory, PartyCreateForm } from 'types/partyTypes';
import { instance } from 'utils/axios';
import { getFormattedDateToString } from 'utils/handleTime';
import { toastState } from 'utils/recoil/toast';
import {
  customTemplate,
  hourOptions,
  minuteOptions,
  peopleOptions,
} from 'constants/takgu/party/createOptions';
import LoadingSpinner from 'components/takgu/UI/LoadingSpinner';
import usePartyForm from 'hooks/party/usePartyForm';
import { usePartyTemplate } from 'hooks/party/usePartyTemplate';
import styles from 'styles/party/PartyCreate.module.scss';

// ================================================================================
// CategorySelection: 방 카테고리 및 템플릿 선택
// ================================================================================

type CategorySelectionProps = {
  categories: PartyCategory[];
  defaultCategoryName: string;
  dispatchPartyForm: ReturnType<typeof usePartyForm>['dispatchPartyForm'];
};

function CategorySelection({
  categories,
  defaultCategoryName,
  dispatchPartyForm,
}: CategorySelectionProps) {
  const router = useRouter();
  const [selectedCategoryName, setSelectedCategoryName] =
    useState(defaultCategoryName);
  const { templates } = usePartyTemplate();
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    customTemplate.gameTemplateId
  );
  const templateOptions = [
    customTemplate,
    ...templates.filter((t) => t.categoryName === selectedCategoryName),
  ];

  function handleTemplate() {
    const template =
      templateOptions.find((t) => t.gameTemplateId === selectedTemplateId) ??
      customTemplate;
    dispatchPartyForm({
      type: 'APPLY_TEMPLATE',
      template,
      categoryName: selectedCategoryName,
    });
    router.push({
      pathname: router.pathname,
      query: { step: 'detail' },
    });
  }

  return (
    <div className={styles.selectionPageContainer}>
      <header>
        <h2>카테고리</h2>
      </header>
      <section className={styles.categoryContainer}>
        <ul>
          {categories.map((c) => (
            <li key={c.categoryName}>
              <button
                onClick={() => {
                  setSelectedCategoryName(c.categoryName);
                }}
                className={`${
                  c.categoryName === selectedCategoryName ? styles.selected : ''
                }`}
              >
                {c.categoryName}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.templateContainer}>
        <h3>템플릿</h3>
        <ul>
          {templateOptions.map((t) => (
            <li key={t.gameTemplateId}>
              <button
                onClick={() => {
                  setSelectedTemplateId(t.gameTemplateId);
                }}
                className={`${
                  t.gameTemplateId === selectedTemplateId ? styles.selected : ''
                }`}
              >
                <div>{t.gameName}</div>
                <div>{`${t.minGamePeople}-${t.maxGamePeople}인`}</div>
              </button>
            </li>
          ))}
        </ul>
      </section>
      <div className={styles.submitButtonWrap}>
        <button onClick={handleTemplate}>다음</button>
      </div>
    </div>
  );
}

// ================================================================================
// DetailCustomization : 방 세부사항 수정
// ================================================================================

type DetailCustomizationProps = {
  partyForm: PartyCreateForm;
  dispatchPartyForm: ReturnType<typeof usePartyForm>['dispatchPartyForm'];
};

function DetailCustomization({
  partyForm,
  dispatchPartyForm,
}: DetailCustomizationProps) {
  const router = useRouter();
  const setSnackBar = useSetRecoilState(toastState);
  const [openPeriod, setOpenPeriod] = useState({
    hour: 1,
    minute: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dueDate = getFormattedDateToString(
    new Date(Date.now() + partyForm.openPeriod * 60 * 1000)
  );

  function handleOpenPeriod(period: { hour: number; minute: number }) {
    setOpenPeriod(period);
    dispatchPartyForm({
      type: 'UPDATE_OPEN_PERIOD',
      openPeriod: period.hour * 60 + period.minute,
    });
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const errorMessage = !partyForm.title
      ? '제목을 입력해주세요'
      : partyForm.content.length < 5
      ? '상세글을 5자 이상 입력해주세요'
      : '';

    try {
      errorMessage
        ? await Promise.reject(new Error(errorMessage))
        : await instance.post('/party/rooms', partyForm).then(({ data }) => {
            router.push(`/takgu/party/room?id=${data.roomId}`);
          });
    } catch (e) {
      setSnackBar({
        toastName: 'GET request',
        message: errorMessage || '서버 요청에 실패했습니다. 다시 시도해주세요',
        severity: 'error',
        clicked: true,
      });
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  }

  return (
    <div className={styles.detailFormContainer}>
      <header>
        <h2>#{partyForm.categoryName}</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <label className={styles.titleLabel}>
          <h3>방 제목</h3>
          <input
            value={partyForm.title}
            onChange={(e) =>
              dispatchPartyForm({ type: 'UPDATE_TITLE', title: e.target.value })
            }
            placeholder='제목을 입력하세요'
          />
          <div className={styles.titleCount}>
            {`${partyForm.title.length}/15`}
          </div>
        </label>
        <label>
          <h3>인원</h3>
          <div className={styles.peopleSelectWrap}>
            <select
              onChange={(e) =>
                dispatchPartyForm({
                  type: 'UPDATE_MIN_PEOPLE',
                  minPeople: +e.target.value,
                })
              }
              defaultValue={partyForm.minPeople}
            >
              {peopleOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className={styles.textCenter}>~</div>
            <select
              onChange={(e) =>
                dispatchPartyForm({
                  type: 'UPDATE_MAX_PEOPLE',
                  maxPeople: +e.target.value,
                })
              }
              defaultValue={partyForm.maxPeople}
            >
              {peopleOptions
                .filter((opt) => opt >= partyForm.minPeople)
                .map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
            </select>
            <div className={styles.textCenter}>인</div>
          </div>
        </label>
        <label>
          <h3>마감 기한</h3>
          <div className={styles.dueDateWrap}>
            <select
              onChange={(e) =>
                handleOpenPeriod({
                  hour: +e.target.value,
                  minute: openPeriod.minute,
                })
              }
              defaultValue={openPeriod.hour}
            >
              {hourOptions.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
            <div className={styles.textCenter}>시간</div>
            <select
              onChange={(e) =>
                handleOpenPeriod({
                  hour: openPeriod.hour,
                  minute: +e.target.value,
                })
              }
              defaultValue={openPeriod.minute}
            >
              {minuteOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <div className={styles.textCenter}>분 후</div>
            <div className={styles.dueDate}>
              {dueDate.hour}시 {dueDate.min}분 마감
            </div>
          </div>
        </label>
        <label className={styles.contentLabel}>
          <h3>상세글</h3>
          <textarea
            rows={10}
            value={partyForm.content}
            onChange={(e) =>
              dispatchPartyForm({
                type: 'UPDATE_CONTENT',
                content: e.target.value,
              })
            }
            placeholder='상세글을 작성해 주세요.'
          />
          <div
            className={styles.contentCount}
          >{`${partyForm.content.length}/100`}</div>
        </label>
        <div className={styles.submitButtonWrap}>
          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? <LoadingSpinner /> : '파티 생성'}
          </button>
        </div>
      </form>
    </div>
  );
}

const PartyCreate = {
  CategorySelection,
  DetailCustomization,
};

export default PartyCreate;
