import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { reloadMatchState } from 'utils/recoil/match';
import styles from 'styles/modal/Modal.module.scss';
import EditProfileModal from './profile/EditProfileModal';
import KakaoEditModal from './profile/KakaoEditModal';
import LogoutModal from './menu/LogoutModal';
import MatchCancelModal from './match/MatchCancelModal';
import MatchEnrollModal from './match/MatchEnrollModal';
import MatchManualModal from './match/MatchManualModal';
import MatchRejectModal from './match/MatchRejectModal';
import ReportModal from './menu/ReportModal';
import AnnouncementModal from './event/AnnouncementModal';
import AfterGameModal from './afterGame/AfterGameModal';
import StatChangeModal from './statChange/StatChangeModal';
import AdminProfileModal from './admin/AdminProfileModal';
import AdminPenaltyModal from './admin/AdminPenaltyModal';
import AdminNotiUserModal from './admin/AdminNotiUserModal';
import AdminCheckFeedback from './admin/AdminFeedbackCheckModal';
import AdminSeasonEdit from './admin/SeasonEdit';
import DetailModal from './admin/DetailModal';
import DeletePenaltyModal from './admin/DeletePenaltyModal';
import AdminModifyScoreModal from './admin/AdminModifyScoreModal';
import CoinChangeModal from './statChange/CoinChangeModal';
import WelcomeModal from './event/WelcomeModal';
import AdminDeleteMegaphoneModal from './admin/AdminDeleteMegaphoneModal';
import AdminDeleteProfileModal from './admin/AdminDeleteProfileModal';
import AdminDeleteItemModal from './admin/AdminDeleteItem';
import AdminEditItemModal from './admin/AdminEditItem';
import AdminEditCoinPolicyModal from './admin/AdminEditCoinPolicy';
import AdminCheckSendNotiModal from './admin/AdminCheckSendNoti';
// Store Modal
import StoreManualModal from './store/StoreManualModal';
import UserCoinHistoryModal from './store/UserCoinHistoryModal';
// Purchase Modal
import BuyModal from './store/purchase/BuyModal';
import GiftModal from './store/purchase/GiftModal';
import NoCoinModal from './store/purchase/NoCoinModal';
// Inventory Modal
import NewMegaphoneModal from './store/inventory/NewMegaphoneModal';
import EditMegaphoneModal from './store/inventory/EditMegaphoneModal';
import ChangeIdColorModal from './store/inventory/ChangeIdColorModal';

export default function ModalProvider() {
  const [
    {
      modalName,
      cancel,
      enroll,
      manual,
      announcement,
      exp,
      intraId,
      detailTitle,
      detailContent,
      feedback,
      penaltyId,
      ISeason,
      ModifyScore,
      CoinResult,
      priceTag,
      megaphone,
      profile,
      item,
      coinPolicy,
      useItemInfo,
      storeManual,
      totalCoin,
    },
    setModal,
  ] = useRecoilState(modalState);
  const setReloadMatch = useSetRecoilState(reloadMatchState);
  const content: { [key: string]: JSX.Element | null } = {
    'EVENT-ANNOUNCEMENT': announcement ? (
      <AnnouncementModal announcement={announcement} />
    ) : null,
    'MENU-REPORT': <ReportModal />,
    'MENU-LOGOUT': <LogoutModal />,
    'MATCH-REJECT': <MatchRejectModal />,
    'MATCH-ENROLL': enroll ? <MatchEnrollModal {...enroll} /> : null,
    'MATCH-CANCEL': cancel ? <MatchCancelModal {...cancel} /> : null,
    'MATCH-MANUAL': manual ? <MatchManualModal {...manual} /> : null,
    'USER-PROFILE_EDIT': <EditProfileModal />,
    'FIXED-AFTER_GAME': <AfterGameModal />,
    'FIXED-STAT': <StatChangeModal {...exp} />,
    'ADMIN-PROFILE': intraId ? <AdminProfileModal intraId={intraId} /> : null,
    'ADMIN-PENALTY': intraId ? <AdminPenaltyModal intraId={intraId} /> : null,
    'ADMIN-PENALTY_DELETE':
      penaltyId && intraId ? (
        <DeletePenaltyModal intraId={intraId} penaltyId={penaltyId} />
      ) : null,
    'ADMIN-NOTI_USER': <AdminNotiUserModal />,
    'ADMIN-SEASON_EDIT': ISeason ? <AdminSeasonEdit {...ISeason} /> : null,
    'ADMIN-CHECK_FEEDBACK': feedback ? (
      <AdminCheckFeedback {...feedback} />
    ) : null,
    'ADMIN-DETAIL_CONTENT':
      detailTitle && detailContent ? (
        <DetailModal detailTitle={detailTitle} detailContent={detailContent} />
      ) : null,
    'ADMIN-MODIFY_SCORE': ModifyScore ? (
      <AdminModifyScoreModal {...ModifyScore} />
    ) : null,
    'USER-KAKAO_EDIT': <KakaoEditModal />,
    'COIN-ANIMATION': CoinResult ? <CoinChangeModal {...CoinResult} /> : null,
    'EVENT-WELCOME': <WelcomeModal />,
    'STORE-MANUAL': storeManual ? <StoreManualModal {...storeManual} /> : null,
    'STORE-COIN_HISTORY': totalCoin ? (
      <UserCoinHistoryModal {...totalCoin} />
    ) : null,
    'PURCHASE-BUY': priceTag ? <BuyModal {...priceTag} /> : null,
    'PURCHASE-GIFT': priceTag ? <GiftModal {...priceTag} /> : null,
    'PURCHASE-NO_COIN': <NoCoinModal />,
    'ADMIN-MEGAPHONE_DELETE': megaphone ? (
      <AdminDeleteMegaphoneModal {...megaphone} />
    ) : null,
    'ADMIN-PROFILE_DELETE': profile ? (
      <AdminDeleteProfileModal {...profile} />
    ) : null,
    'ADMIN-ITEM_EDIT': item ? <AdminEditItemModal {...item} /> : null,
    'ADMIN-ITEM_DELETE': item ? <AdminDeleteItemModal {...item} /> : null,
    'ADMIN-COINPOLICY_EDIT': coinPolicy ? (
      <AdminEditCoinPolicyModal {...coinPolicy} />
    ) : null,
    'ADMIN-CHECK_SEND_NOTI':
      intraId && detailContent ? (
        <AdminCheckSendNotiModal
          intraId={intraId}
          detailContent={detailContent}
        />
      ) : null,
    'USE-ITEM-MEGAPHONE': useItemInfo ? (
      <NewMegaphoneModal {...useItemInfo} />
    ) : null,
    'EDIT-ITEM-MEGAPHONE': useItemInfo ? (
      <EditMegaphoneModal {...useItemInfo} />
    ) : null,
    'USE-ITEM-TEXT_COLOR': useItemInfo ? (
      <ChangeIdColorModal {...useItemInfo} />
    ) : null,
  };

  useEffect(() => {
    setModalOutsideScroll();
  }, [modalName]);

  const setModalOutsideScroll = () =>
    (document.body.style.overflow = modalName ? 'hidden' : 'unset');

  const closeModalHandler = (e: React.MouseEvent) => {
    if (modalName?.split('-')[0] === 'FIXED') return;
    if (e.target instanceof HTMLDivElement && e.target.id === 'modalOutside') {
      if (modalName === 'MATCH-CANCEL') setReloadMatch(true);
      setModal({ modalName: null });
    }
  };

  return (
    modalName && (
      <div
        className={styles.backdrop}
        id='modalOutside'
        onClick={closeModalHandler}
      >
        {content[modalName]}
      </div>
    )
  );
}
