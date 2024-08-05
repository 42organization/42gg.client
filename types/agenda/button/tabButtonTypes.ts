import { TabValues } from 'constants/agenda/agendaDetail/agendaTabs';
import { AgendaDataProps } from '../agendaDetail/agendaDataTypes';

export interface TabButtonProps {
  text: string;
  isActive?: boolean;
  onClick: () => void;
}

export interface TabButtonsProps {
  tabs: Record<string, TabValues>;
  activeTab: TabValues;
  onTabClick: (tab: TabValues) => void;
}

export interface TabContentProps {
  activeTab: TabValues;
  tabs: Record<string, TabValues>;
  agendaData: AgendaDataProps;
}
