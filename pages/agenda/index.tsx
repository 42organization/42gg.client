import type { NextPage } from 'next';
import AgendaList from 'components/agenda/Home/AgendaList';
import AgendaTitle from 'components/agenda/Home/AgendaTitle';
import MyAgendaBtn from 'components/agenda/Home/MyAgendaBtn';
import { TestModal, TestModal2 } from 'components/agenda/modal/testModal';
import styles from 'styles/agenda/Home/Agenda.module.scss';

const Agenda: NextPage = () => {
  return (
    <div className={styles.agendaPageContainer}>
      <AgendaTitle />
      <MyAgendaBtn />
      <AgendaList />

      <TestModal />
      <TestModal2 />
    </div>
  );
};

export default Agenda;
