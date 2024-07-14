import styles from 'styles/agenda/Layout/Layout.module.scss';

const AgendaUserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.appContainer}>
      <div className={`${styles.background}`}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AgendaUserLayout;