import { Value } from 'react-quill';
import { IcoinPolicy } from 'types/admin/adminCoinTypes';
import { IFeedback } from 'types/admin/adminFeedbackTypes';
import { Imegaphone, Iprofile } from 'types/admin/adminReceiptType';
import { ModifyScoreType } from 'types/admin/gameLogTypes';
import { CoinResult } from 'types/coinTypes';
import { RandomColors } from 'types/colorModeTypes';
import { RandomItem, ItemType, UseItemData } from 'types/inventoryTypes';
import { Item } from 'types/itemTypes';
import { MatchMode } from 'types/mainType';
import { ISeason } from 'types/seasonTypes';
import { StoreManualMode } from 'types/storeTypes';
import { ICoin } from 'types/userTypes';

type EventModal = 'WELCOME' | 'ANNOUNCEMENT';

type MenuModal = 'REPORT' | 'LOGOUT';

type MatchModal = 'ENROLL' | 'REJECT' | 'CANCEL' | 'MANUAL';

type UserModal = 'PROFILE_EDIT' | 'KAKAO_EDIT';

type FixedModal = 'AFTER_GAME' | 'STAT';

type PurchaseModal = 'BUY' | 'GIFT' | 'NO_COIN';

type UseItemModal = ItemType | 'GACHA';

type EditItemModal = 'MEGAPHONE';
type StoreModal = 'MANUAL' | 'COIN_HISTORY';

type AdminModal =
  | 'PROFILE'
  | 'USER-COIN'
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
  | 'COINPOLICY_EDIT'
  | 'CHECK_SEND_NOTI';

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
  | `USE-ITEM-${UseItemModal}`
  | `EDIT-ITEM-${EditItemModal}`
  | `STORE-${StoreModal}`
  | `PURCHASE-${PurchaseModal}`;

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

export interface Manual {
  radioMode: MatchMode;
}

export interface PriceTag {
  itemId: number;
  product: string;
  price: number;
}

export interface StoreManual {
  radioMode: StoreManualMode;
}

export interface IRandomItem {
  item: RandomItem;
  color: RandomColors;
}

export interface Modal {
  modalName: ModalName;
  manual?: Manual;
  cancel?: Cancel;
  enroll?: Enroll;
  announcement?: Announcement;
  exp?: Exp;
  gameId?: number;
  intraId?: string;
  detailTitle?: string;
  detailContent?: string;
  feedback?: IFeedback;
  penaltyId?: number;
  ISeason?: ISeason;
  ModifyScore?: ModifyScoreType;
  CoinResult?: CoinResult;
  priceTag?: PriceTag;
  megaphone?: Imegaphone;
  profile?: Iprofile;
  item?: Item;
  coinPolicy?: IcoinPolicy;
  useItemInfo?: UseItemData;
  storeManual?: StoreManual;
  isAttended?: boolean;
  totalCoin?: ICoin;
  randomItem?: IRandomItem;
}
