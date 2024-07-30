import { TabButtonsProps } from 'types/agenda/button/tabButtonTypes';
import TabButton from 'components/agenda/button/TabButton';
import styles from 'styles/agenda/agendaDetail/AgendaTab.module.scss';

export default function TabButtons({
  tabs,
  activeTab,
  onTabClick,
}: TabButtonsProps) {
  return (
    <div className={styles.tabButtonList}>
      {Object.values(tabs).map((tab) => (
        <TabButton
          key={tab}
          text={tab}
          isActive={activeTab === tab}
          onClick={() => onTabClick(tab)}
        />
      ))}
    </div>
  );
}
