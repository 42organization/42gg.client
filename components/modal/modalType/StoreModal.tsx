import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import CoinChangeModal from 'components/modal/statChange/CoinChangeModal';
import ChangeIdColorModal from 'components/modal/store/inventory/ChangeIdColorModal';
import ChangeProfileBackgroundModal from 'components/modal/store/inventory/ChangeProfileBackgroundModal';
import ChangeProfileEdgeModal from 'components/modal/store/inventory/ChangeProfileEdgeModal';
import EditMegaphoneModal from 'components/modal/store/inventory/EditMegaphoneModal';
import GachaModal from 'components/modal/store/inventory/GachaModal';
import NewMegaphoneModal from 'components/modal/store/inventory/NewMegaphoneModal';
import ProfileImageModal from 'components/modal/store/inventory/ProfileImageModal';
import BuyModal from 'components/modal/store/purchase/BuyModal';
import GiftModal from 'components/modal/store/purchase/GiftModal';
import NoCoinModal from 'components/modal/store/purchase/NoCoinModal';
import StoreManualModal from 'components/modal/store/StoreManualModal';
import UserCoinHistoryModal from 'components/modal/store/UserCoinHistoryModal';

export default function StoreModal() {
  const {
    modalName,
    CoinResult,
    storeManual,
    totalCoin,
    priceTag,
    useItemInfo,
    randomItem,
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
    'USE-ITEM-PROFILE_IMAGE': useItemInfo ? (
      <ProfileImageModal {...useItemInfo} />
    ) : null,
    'USE-ITEM-EDGE': useItemInfo ? (
      <ChangeProfileEdgeModal {...useItemInfo} />
    ) : null,
    'USE-ITEM-BACKGROUND': useItemInfo ? (
      <ChangeProfileBackgroundModal {...useItemInfo} />
    ) : null,
    'USE-ITEM-GACHA': randomItem ? <GachaModal {...randomItem} /> : null,
    'EDIT-ITEM-MEGAPHONE': useItemInfo ? (
      <EditMegaphoneModal {...useItemInfo} />
    ) : null,
  };

  if (!modalName) return null;
  return content[modalName];
}
