import { TabValues } from 'constants/agenda/agendaDetail/agendaTabs';
import TapButton from 'components/agenda/button/TapButton';
import styles from 'styles/agenda/agendaDetail/AgendaTap.module.scss';

interface TabsProps {
  tabs: Record<string, TabValues>;
  activeTab: TabValues;
  onTabClick: (tab: TabValues) => void;
}

export default function Tabs({ tabs, activeTab, onTabClick }: TabsProps) {
  return (
    <div className={styles.tapButtonList}>
      {Object.values(tabs).map((tab) => (
        <TapButton
          key={tab}
          text={tab}
          isActive={activeTab === tab}
          onClick={() => onTabClick(tab)}
        />
      ))}
    </div>
  );
}
