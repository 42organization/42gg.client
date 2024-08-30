import { useRouter } from 'next/router';
import { CancelBtn } from 'components/agenda/button/Buttons';
import AgendaForm from 'components/agenda/Form/AgendaForm';
import { saveLocal } from 'pages/agenda/create';
import { useAgendaInfo } from 'hooks/agenda/useAgendaInfo';
import styles from 'styles/agenda/pages/CreateAgenda.module.scss';

const ModifyAgenda = () => {
  const router = useRouter();
  const { agendaKey } = router.query;
  const data = useAgendaInfo(agendaKey as string);

  return (
    <>
      <div className={styles.container}>
        <div>
          <CancelBtn onClick={saveLocal} />
        </div>
        <h2 className={styles.title}>아젠다 수정하기</h2>
        <p className={styles.description}>당부사항</p>
        {data && (
          <AgendaForm
            isEdit={true}
            data={data}
            stringKey={agendaKey as string}
            onProceed={() => {
              router.push(`/agenda/${agendaKey}`);
            }}
          />
        )}
      </div>
    </>
  );
};

export default ModifyAgenda;
