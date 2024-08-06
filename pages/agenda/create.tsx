import { instanceInAgenda } from 'utils/axios';
import { CancelBtn } from 'components/agenda/button/Buttons';
import CreateAgendaForm from 'components/agenda/Form/CreateAgendaForm';
import styles from 'styles/agenda/pages/CreateAgenda.module.scss';

const saveLocal = () => {
  console.log('saveLocal', '팀 만들기');
};

const submitTeamForm = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log(e.target);
  const form = document.querySelector('form');
  console.log(form);
  const data = new FormData(e.target as HTMLFormElement);
  data.set('agendaStartTime', data.get('agendaStartTime') + ':00.002Z');
  data.set('agendaEndTime', data.get('agendaEndTime') + ':00.002Z');
  data.set('agendaDeadLine', data.get('agendaDeadLine') + ':00.002Z');
  data.set(
    'agendaIsRanking',
    data.get('agendaIsRanking') === 'on' ? 'true' : 'false'
  );
  data.set(
    'agendaIsSolo',
    data.get('agendaIsSolo') === 'on' ? 'true' : 'false'
  );
  for (const key of data.keys()) {
    console.log(key, data.get(key));
  }
  data.set('agendaPoster', 'string test'); // 이후 api 업데이트되면 수정

  //json으로 변환
  const temp = JSON.stringify(Object.fromEntries(data));
  const jsonData = JSON.parse(temp);
  jsonData.agendaIsRanking = true;
  // console.log('json', JSON.stringify(jsonData));
  await instanceInAgenda
    .post(
      '/request',
      jsonData //json으로 변환
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const CreateAgenda = () => {
  return (
    <div className={styles.container}>
      <div>
        <CancelBtn onClick={saveLocal} />
      </div>
      <h2 className={styles.title}>새로운 아젠다 만들기</h2>
      <p className={styles.description}>당부사항</p>
      <CreateAgendaForm handleSubmit={submitTeamForm} />
    </div>
  );
};

export default CreateAgenda;
