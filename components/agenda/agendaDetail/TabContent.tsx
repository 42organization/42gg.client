import { TabContentProps } from 'types/agenda/button/tabButtonTypes';
import AgendaAnnouncements from 'components/agenda/agendaDetail/tabs/AgendaAnnouncements';
import AgendaConditions from 'components/agenda/agendaDetail/tabs/AgendaConditions';
import AgendaDescription from 'components/agenda/agendaDetail/tabs/AgendaDescription';
import AgendaParticipants from 'components/agenda/agendaDetail/tabs/AgendaParticipants';
import AgendaPoster from 'components/agenda/agendaDetail/tabs/AgendaPoster';
import styles from 'styles/agenda/agendaDetail/AgendaTab.module.scss';

export default function TabContent({
  activeTab,
  tabs,
  agendaData,
  isHost,
  myTeam,
}: TabContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case tabs.DESCRIPTION:
        return (
          <>
            <AgendaDescription agendaData={agendaData} />
            <div className={styles.web}>
              <AgendaPoster poster={agendaData.agendaPosterUrl} />
            </div>
          </>
        );
      case tabs.PARTICIPANTS:
        return <AgendaParticipants agendaData={agendaData} myTeam={myTeam} />;
      case tabs.NOTIFICATIONS:
        return <AgendaAnnouncements isHost={isHost} />;
      case tabs.CONDITIONS:
        return <AgendaConditions agendaData={agendaData} />;
      case tabs.POSTER:
        return <AgendaPoster poster={agendaData.agendaPosterUrl} />;
      default:
        return null;
    }
  };
  return <div className={styles.contentWarp}>{renderContent()}</div>;
}
