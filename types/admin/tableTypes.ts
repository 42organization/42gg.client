export type TableName =
  | 'notification'
  | 'userInfo'
  | 'feedback'
  | 'games'
  | 'announcement'
  | 'seasonCreate'
  | 'seasonHistory'
  | 'penalty'
  | 'receiptList'
  | 'megaphoneList'
  | 'profileList'
  | 'profileListCurrent'
  | 'profileDeletedList'
  | 'itemList'
  | 'itemHistory'
  | 'coinPolicy'
  | 'coinPolicyHistory';

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
