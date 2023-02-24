export type TableName =
  | 'notification'
  | 'userInfo'
  | 'feedback'
  | 'announcement';
export type EtcType = 'button' | 'toggle';

export type TableFormat = {
  [key in TableName]: {
    name: string;
    columns: string[];
    etc?: {
      type: EtcType;
      value: string[];
    };
  };
};
