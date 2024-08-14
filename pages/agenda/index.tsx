import { Button } from '@mui/material';
import type { NextPage } from 'next';
import AgendaList from 'components/agenda/Home/AgendaList';
import AgendaTitle from 'components/agenda/Home/AgendaTitle';
import MyAgendaBtn from 'components/agenda/Home/MyAgendaBtn';
import ConfirmModal from 'components/agenda/modal/ConfirmModal';
import styles from 'styles/agenda/Home/Agenda.module.scss';

const Agenda: NextPage = () => {
  const handleDelete = () => {
    // 삭제 로직
    console.log('Item deleted');
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
    </div>
  );
};

export default Agenda;
