import { useRecoilValue } from 'recoil';
import { modalState } from 'utils/recoil/takgu/modal';
import CoinChangeModal from 'components/takgu/modal/statChange/CoinChangeModal';
import ChangeIdColorModal from 'components/takgu/modal/store/inventory/ChangeIdColorModal';
import ChangeProfileBackgroundModal from 'components/takgu/modal/store/inventory/ChangeProfileBackgroundModal';
import ChangeProfileEdgeModal from 'components/takgu/modal/store/inventory/ChangeProfileEdgeModal';
import EditMegaphoneModal from 'components/takgu/modal/store/inventory/EditMegaphoneModal';
import GachaModal from 'components/takgu/modal/store/inventory/GachaModal';
import NewMegaphoneModal from 'components/takgu/modal/store/inventory/NewMegaphoneModal';
import ProfileImageModal from 'components/takgu/modal/store/inventory/ProfileImageModal';
import BuyModal from 'components/takgu/modal/store/purchase/BuyModal';
import GiftModal from 'components/takgu/modal/store/purchase/GiftModal';
import NoCoinModal from 'components/takgu/modal/store/purchase/NoCoinModal';
import StoreManualModal from 'components/takgu/modal/store/StoreManualModal';
import UserCoinHistoryModal from 'components/takgu/modal/store/UserCoinHistoryModal';

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
