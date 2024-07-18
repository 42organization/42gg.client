import type { NextPage } from 'next';
import AgendaList from 'components/agenda/Home/AgendaList';
import AgendaTitle from 'components/agenda/Home/AgendaTitle';
import MyAgendaBtn from 'components/agenda/Home/MyAgendaBtn';
import styles from 'styles/agenda/Home/Agenda.module.scss';

const Agenda: NextPage = () => {
  return (
    <div className={styles.agendaPageContainer}>
      <AgendaTitle />
      <MyAgendaBtn />
      <AgendaList />
    </div>
  );
};

export default Agenda;
