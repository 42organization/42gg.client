import { TabContentProps } from 'types/agenda/button/tabButtonTypes';
import AgendaAnnouncements from 'components/agenda/agendaDetail/tabs/AgendaAnnouncements';
import AgendaConditions from 'components/agenda/agendaDetail/tabs/AgendaConditions';
import AgendaDescription from 'components/agenda/agendaDetail/tabs/AgendaDescription';
import AgendaParticipants from 'components/agenda/agendaDetail/tabs/AgendaParticipants';
import styles from 'styles/agenda/agendaDetail/AgendaTab.module.scss';

export default function TabContent({
  activeTab,
  tabs,
  agendaData,
}: TabContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case tabs.DESCRIPTION:
        return <AgendaDescription agendaData={agendaData} />;
      case tabs.PARTICIPANTS:
        return <AgendaParticipants agendaData={agendaData} />;
      case tabs.NOTIFICATIONS:
        return <AgendaAnnouncements />;
      case tabs.CONDITIONS:
        return <AgendaConditions agendaData={agendaData} />;
      default:
        return null;
    }
  };
  return <div className={styles.contentWarp}>{renderContent()}</div>;
}
