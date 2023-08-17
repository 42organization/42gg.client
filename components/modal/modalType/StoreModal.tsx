import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import CoinChangeModal from '../statChange/CoinChangeModal';
import StoreManualModal from '../store/StoreManualModal';
import UserCoinHistoryModal from '../store/UserCoinHistoryModal';
import BuyModal from '../store/purchase/BuyModal';
import GiftModal from '../store/purchase/GiftModal';
import NoCoinModal from '../store/purchase/NoCoinModal';
import ChangeIdColorModal from '../store/inventory/ChangeIdColorModal';
import NewMegaphoneModal from '../store/inventory/NewMegaphoneModal';
import EditMegaphoneModal from '../store/inventory/EditMegaphoneModal';
import ChangeProfileEdgeModal from '../store/inventory/ChangeProfileEdgeModal';
import GachaModal from '../store/inventory/GachaModal';

export default function StoreModal() {
  const {
    modalName,
    CoinResult,
    storeManual,
    totalCoin,
    priceTag,
    useItemInfo,
  } = useRecoilValue(modalState);

  const content: { [key: string]: JSX.Element | null } = {
    'COIN-ANIMATION': CoinResult ? <CoinChangeModal {...CoinResult} /> : null,
    'STORE-MANUAL': storeManual ? <StoreManualModal {...storeManual} /> : null,
    'STORE-COIN_HISTORY': totalCoin ? (
      <UserCoinHistoryModal {...totalCoin} />
    ) : null,
    'PURCHASE-BUY': priceTag ? <BuyModal {...priceTag} /> : null,
    'PURCHASE-GIFT': priceTag ? <GiftModal {...priceTag} /> : null,
    'PURCHASE-NO_COIN': <NoCoinModal />,
    'USE-ITEM-TEXT_COLOR': useItemInfo ? (
      <ChangeIdColorModal {...useItemInfo} />
    ) : null,
    'USE-ITEM-MEGAPHONE': useItemInfo ? (
      <NewMegaphoneModal {...useItemInfo} />
    ) : null,
    'USE-ITEM-PROFILE_BAND': useItemInfo ? (
      <ChangeProfileEdgeModal {...useItemInfo} />
    ) : null,
    'USE-ITEM-GACHA': <GachaModal />,
    'EDIT-ITEM-MEGAPHONE': useItemInfo ? (
      <EditMegaphoneModal {...useItemInfo} />
    ) : null,
  };

  if (!modalName) return null;
  return content[modalName];
}
