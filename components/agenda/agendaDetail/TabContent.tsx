import { TabContentProps } from 'types/agenda/button/tabButtonTypes';
import AgendaAnnouncements from 'components/agenda/agendaDetail/tabs/AgendaAnnouncements';
import AgendaDescription from 'components/agenda/agendaDetail/tabs/AgendaDescription';
import AgendaParticipants from 'components/agenda/agendaDetail/tabs/AgendaParticipants';
import AgendaPoster from 'components/agenda/agendaDetail/tabs/AgendaPoster';
import styles from 'styles/agenda/agendaDetail/AgendaTab.module.scss';

export default function TabContent({
  activeTab,
  tabs,
  agendaData,
  myTeam,
}: TabContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case tabs.DESCRIPTION:
        return (
          <div className={styles.flex}>
            <AgendaDescription agendaData={agendaData} />
            <div className={styles.web}>
              <AgendaPoster poster={agendaData.agendaPosterUrl} />
            </div>
          </div>
        );
      case tabs.PARTICIPANTS:
        return <AgendaParticipants agendaData={agendaData} myTeam={myTeam} />;
      case tabs.NOTIFICATIONS:
        return <AgendaAnnouncements />;

      case tabs.POSTER:
        return (
          <div className={styles.flex}>
            <div className={styles.web}>
              <AgendaDescription agendaData={agendaData} />
            </div>
            <AgendaPoster poster={agendaData.agendaPosterUrl} />
          </div>
        );
      default:
        return null;
    }
  };
  return <div className={styles.contentWarp}>{renderContent()}</div>;
}
