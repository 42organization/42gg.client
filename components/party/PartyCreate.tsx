import { useRouter } from 'next/router';
import { PartyForm, PartyGameTemplate } from 'types/partyTypes';
import { mockInstance } from 'utils/mockAxios';
import usePartyCategory from 'hooks/party/usePartyCategory';
import { usePartyTemplate } from 'hooks/party/usePartyTemplate';
import styles from 'styles/party/PartyCreate.module.scss';

export const partyInitForm = {
  title: '',
  categoryId: 1,
  minPeople: 2,
  maxPeople: 2,
  content: '',
  dueDate: '',
};

function CategorySelection({
  updatePartyForm,
}: {
  updatePartyForm: (data: Partial<PartyForm>) => void;
}) {
  const { categorys } = usePartyCategory();
  const router = useRouter();

  return (
    <ul>
      {categorys.map(({ categoryId, categoryName }) => (
        <li key={categoryId}>
          <button
            onClick={() => {
              updatePartyForm({
                categoryId,
              });
              router.push({
                pathname: router.pathname,
                query: { step: 'template' },
              });
            }}
          >
            {categoryName}
          </button>
        </li>
      ))}
    </ul>
  );
}

function TemplateSelection({
  categoryId,
  updatePartyForm,
}: {
  categoryId: number;
  updatePartyForm: (data: Partial<PartyForm>) => void;
}) {
  const { templates } = usePartyTemplate({ categoryId });
  const router = useRouter();

  return (
    <div>
      <input type='text' placeholder='검색' />
      <ul>
        <li key={'custum'}>
          <button
            onClick={() => {
              updatePartyForm({ ...partyInitForm });
              router.push({
                pathname: router.pathname,
                query: { step: 'detail' },
              });
            }}
          >
            직접 입력
          </button>
        </li>
        {templates.map((t: PartyGameTemplate) => (
          <li key={t.gameTemplateId}>
            <button
              onClick={() => {
                updatePartyForm({
                  title: `${t.gameName}`,
                  minPeople: t.minGamePeople,
                  maxPeople: t.maxGamePeople,
                  content:
                    `난이도: ${t.difficulty}\n` +
                    `장르: ${t.genre}\n` +
                    `게임 시간: ${t.minGameTime} - ${t.maxGameTime}\n` +
                    `${t.summary}`,
                });
                router.push({
                  pathname: router.pathname,
                  query: { step: 'detail' },
                });
              }}
            >
              {t.gameName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DetailCustomization({
  partyForm,
  updatePartyForm,
}: {
  partyForm: PartyForm;
  updatePartyForm: (data: Partial<PartyForm>) => void;
}) {
  const router = useRouter();

  return (
    <div className={styles.detailForm}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(partyForm);
          mockInstance.post('/party/rooms', partyForm).then(({ data }) => {
            router.push(`/parties/${data.roomId}`);
          });
        }}
      >
        <input
          type='text'
          value={partyForm.title}
          onChange={(e) => updatePartyForm({ title: e.target.value })}
        />
        <select
          name='minPeople'
          onChange={(e) => updatePartyForm({ minPeople: +e.target.value })}
        >
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
        </select>
        <select
          name='maxPeople'
          onChange={(e) => updatePartyForm({ maxPeople: +e.target.value })}
        >
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
        </select>
        <textarea
          rows={5}
          value={partyForm.content}
          onChange={(e) => updatePartyForm({ content: e.target.value })}
        />
        <select
          name=''
          onChange={(e) => updatePartyForm({ dueDate: e.target.value })}
        >
          <option value='7'>7시</option>
          <option value='7.5'>7시반</option>
          <option value='8'>8시</option>
        </select>
        <button type='submit'>게임 생성</button>
      </form>
    </div>
  );
}

const PartyCreate = {
  CategorySelection,
  TemplateSelection,
  DetailCustomization,
};

export default PartyCreate;
