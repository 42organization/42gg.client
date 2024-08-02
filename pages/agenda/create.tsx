import { json } from 'stream/consumers';
import { useRef } from 'react';
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
  for (const key of data.keys()) {
    console.log(key, data.get(key));
  }
  data.set('agendaStartTime', data.get('agendaStartTime') + ':00.002Z');
  data.set('agendaEndTime', data.get('agendaEndTime') + ':00.002Z');
  data.set('agendaDeadLine', data.get('agendaDeadLine') + ':00.002Z');
  data.set('agendaPoster', 'string test'); // 이후 api 업데이트되면 수정
  data.set('agendaIsRanking', 'true');

  const temp = JSON.stringify(Object.fromEntries(data));
  // const jsonData = JSON.parse(temp);
  // jsonData.agendaIsRanking = true;
  // console.log(jsonData);

  const jsonData = {
    agendaTitle: '123456',
    agendaContent: '설명설명설명',
    agendaDeadLine: '2024-09-01T04:35:06.872Z',
    agendaStartTime: '2024-09-12T04:35:06.872Z',
    agendaEndTime: '2024-09-14T04:35:06.872Z',
    agendaMinTeam: 3,
    agendaMaxTeam: 7,
    agendaMinPeople: 2,
    agendaMaxPeople: 5,
    agendaPoster: '1',
    agendaLocation: 'SEOUL',
    agendaIsRanking: false,
    agendaIsOfficial: false,
  };

  await instanceInAgenda
    .post('/request', {
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      data: jsonData,
    })
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
