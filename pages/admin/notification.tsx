import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';

export default function Notification() {
  const setModal = useSetRecoilState(modalState);

  return (
    <div>
      notification page
      <button
        onClick={() =>
          setModal({ modalName: 'ADMIN-NOTI_ALL', intraId: 'daijeong' })
        }
      >
        전체 유저
      </button>
      <button
        onClick={() =>
          setModal({ modalName: 'ADMIN-NOTI_USER', intraId: 'daijeong' })
        }
      >
        특정 유저
      </button>
    </div>
  );
}
