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
  data.set('agendaStartTime', data.get('agendaStartTime') + ':00.00Z');
  data.set('agendaEndTime', data.get('agendaEndTime') + ':00.00Z');
  data.set('agendaDeadLine', data.get('agendaDeadLine') + ':00.00Z');
  data.set(
    'agendaIsRanking',
    data.get('agendaIsRanking') === 'on' ? 'true' : 'false'
  );
  if (data.get('isSolo') === 'on') {
    data.set('agendaMaxPeoPle', '1');
    data.set('agendaMinPeoPle', '1');
  }
  for (const key of data.keys()) {
    console.log(key, data.get(key));
  }
  const poster = data.get('agendaPoster') as File;
  if (poster.size > 1024 * 1024) {
    alert('파일 사이즈가 너무 큽니다.');
    return;
  }
  if (poster.type !== 'image/jpeg' && poster.type !== 'image/jpg') {
    alert('jpg, jpeg 파일만 업로드 가능합니다.');
    return;
  }
  await instanceInAgenda
    .post(
      '/request',
      data //json으로 변환
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
