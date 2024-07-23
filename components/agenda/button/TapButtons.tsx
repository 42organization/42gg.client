import { TabButtonsProps } from 'types/agenda/button/tapButtonTypes';
import TapButton from 'components/agenda/button/TapButton';
import styles from 'styles/agenda/agendaDetail/AgendaTap.module.scss';

export default function TabButtons({
  tabs,
  activeTab,
  onTabClick,
}: TabButtonsProps) {
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
