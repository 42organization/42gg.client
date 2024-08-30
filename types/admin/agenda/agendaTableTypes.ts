export type agendaTableName =
  | 'agenda'
  | 'team'
  | 'announcement'
  | 'ticket'
  | 'user';

export type EtcType = 'button' | 'toggle';

export type AgendaTableFormat = {
  [key in agendaTableName]: {
    name: string;
    columns: string[];
    etc?: {
      type: EtcType;
      value: string[];
    };
  };
};
