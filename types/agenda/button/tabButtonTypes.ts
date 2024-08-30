import { AgendaDataProps } from 'types/agenda/agendaDetail/agendaTypes';
import { TeamDataProps } from 'types/agenda/team/teamDataTypes';
import { TabValues } from 'constants/agenda/agendaDetail/agendaTabs';

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
  isHost: boolean;
  myTeam?: TeamDataProps | null;
}
