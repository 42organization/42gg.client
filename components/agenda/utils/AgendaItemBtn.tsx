import AgendaInfo from 'components/agenda/Home/AgendaInfo';
import styles from 'styles/agenda/utils/AgendaItemBtn.module.scss';

const AgendaItemBtn = () => {
  return (
    <div className={styles.myagendaItemContainer}>
      <AgendaInfo />
    </div>
  );
};

export default AgendaItemBtn;
