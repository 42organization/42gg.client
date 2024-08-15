import { Button } from '@mui/material';
import type { NextPage } from 'next';
import AgendaList from 'components/agenda/Home/AgendaList';
import AgendaTitle from 'components/agenda/Home/AgendaTitle';
import MyAgendaBtn from 'components/agenda/Home/MyAgendaBtn';
import AlarmModal from 'components/agenda/modal/AlarmModal';
import ConfirmModal from 'components/agenda/modal/ConfirmModal';
import styles from 'styles/agenda/Home/Agenda.module.scss';

const Agenda: NextPage = () => {
  const handleDelete = () => {
    console.log('삭제삭제');
  };

  const handleProceed = () => {
    console.log('확인확인');
  };
  return (
    <div className={styles.agendaPageContainer}>
      <AgendaTitle />
      <MyAgendaBtn />
      <AgendaList />
      <Button>
        <ConfirmModal
          title='삭제 확인'
          message='이 항목을 삭제하시겠습니까?'
          onProceed={handleDelete}
        />
      </Button>

      <Button>
        <AlarmModal
          title='알림'
          message='알림알림'
          onProceed={handleProceed}
          cancel={false}
        />
      </Button>
    </div>
  );
};

export default Agenda;
