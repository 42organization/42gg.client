import { TabValues } from 'constants/agenda/agendaDetail/agendaTabs';
import AgendaConditions from 'components/agenda/agendaDetail/taps/AgendaConditions';
import AgendaDescription from 'components/agenda/agendaDetail/taps/AgendaDescription';
import AgendaNotifications from 'components/agenda/agendaDetail/taps/AgendaNotifications';
import AgendaParticipants from 'components/agenda/agendaDetail/taps/AgendaParticipants';
import styles from 'styles/agenda/agendaDetail/AgendaTap.module.scss';

interface TabContentProps {
  activeTab: TabValues;
  tabs: Record<string, TabValues>;
}

export default function TabContent({ activeTab, tabs }: TabContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case tabs.DESCRIPTION:
        return <AgendaDescription />;
      case tabs.PARTICIPANTS:
        return <AgendaParticipants />;
      case tabs.NOTIFICATIONS:
        return <AgendaNotifications />;
      case tabs.CONDITIONS:
        return <AgendaConditions />;
      default:
        return null;
    }
  };
  return <div className={styles.contentWarp}>{renderContent()}</div>;
}
