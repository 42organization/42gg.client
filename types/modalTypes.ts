import { MatchMode } from './mainType';
import { ISeason } from './seasonTypes';
import { Value } from 'react-quill';
import { IFeedback } from 'components/admin/feedback/FeedbackTable';
import { ModifyScoreType } from 'types/admin/gameLogTypes';
import { CoinResult } from 'types/coinTypes';
import { ImegaphoneInfo, IprofileInfo } from './admin/adminReceiptType';
import { IitemInfo } from './admin/adminStoreTypes';
import { IcoinPolicy } from './admin/adminCoinTypes';
import { StoreManualMode } from './storeTypes';

type EventModal = 'WELCOME' | 'ANNOUNCEMENT';

type MenuModal = 'REPORT' | 'LOGOUT';

type MatchModal = 'ENROLL' | 'REJECT' | 'CANCEL' | 'MANUAL';

type UserModal = 'PROFILE_EDIT' | 'KAKAO_EDIT';

type FixedModal = 'AFTER_GAME' | 'STAT';

type PurchaseModal = 'BUY' | 'GIFT' | 'NO_COIN';

type StoreModal = 'MANUAL' | 'COIN_HISTORY';

type AdminModal =
  | 'PROFILE'
  | 'PENALTY'
  | 'PENALTY_DELETE'
  | 'NOTI_USER'
  | 'CHECK_FEEDBACK'
  | 'DETAIL_CONTENT'
  | 'SEASON_EDIT'
  | 'MODIFY_SCORE'
  | 'MEGAPHONE_DELETE'
  | 'PROFILE_DELETE'
  | 'ITEM_EDIT'
  | 'ITEM_DELETE'
  | 'COINPOLICY_EDIT';

type ModalName =
  | null
  | `EVENT-${EventModal}`
  | `MENU-${MenuModal}`
  | `MATCH-${MatchModal}`
  | `USER-${UserModal}`
  | `FIXED-${FixedModal}`
  | `ADMIN-${AdminModal}`
  | `COIN-ANIMATION`
  | `PURCHASE-${PurchaseModal}`
  | `STORE-${StoreModal}`;

export interface Cancel {
  startTime: string;
}

export interface Enroll {
  startTime: string;
  endTime: string;
  mode?: MatchMode;
}

export interface Announcement {
  content: Value;
}

export interface Exp {
  gameId?: number;
  mode?: MatchMode | null;
}
export interface Coin {
  //gameId?: number;
  mode?: MatchMode | null;
}

// 지워도 되는 것?
// export interface Manual {
//   radioMode: MatchMode;
// }

export interface manual {
  radioMode: MatchMode;
}

export interface PriceTag {
  product: string;
  price: number;
}

export interface StoreManual {
  radioMode: StoreManualMode;
}

export interface Modal {
  modalName: ModalName;
  manual?: manual;
  cancel?: Cancel;
  enroll?: Enroll;
  announcement?: Announcement;
  exp?: Exp;
  gameId?: number;
  intraId?: string;
  detailContent?: string;
  feedback?: IFeedback;
  penaltyId?: number;
  ISeason?: ISeason;
  ModifyScore?: ModifyScoreType;
  CoinResult?: CoinResult;
  priceTag?: PriceTag;
  megaphoneInfo?: ImegaphoneInfo;
  profileInfo?: IprofileInfo;
  itemInfo?: IitemInfo;
  coinPolicy?: IcoinPolicy;
  storeManual?: StoreManual;
}
