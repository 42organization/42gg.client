import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import style from 'styles/admin/notification/CreateNotificationButton.module.scss';

export default function CreateNotiButton() {
  const setModal = useSetRecoilState(modalState);

  return (
    <div className={style.container}>
      <button
        className={style.createSomeoneButton}
        onClick={() => setModal({ modalName: 'ADMIN-NOTI_USER' })}
      >
        알림 보내기
      </button>
    </div>
  );
}
