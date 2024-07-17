import type { NextPage } from 'next';
import AgendaTitle from 'components/agenda/Home/AgendaTitle';
import MyAgendaBtn from 'components/agenda/Home/MyAgendaBtn';
import styles from 'styles/agenda/Home/Agenda.module.scss';

const Agenda: NextPage = () => {
  return (
    <div className={styles.agendaPageContainer}>
      <AgendaTitle />
      <MyAgendaBtn />
    </div>
  );
};

export default Agenda;
