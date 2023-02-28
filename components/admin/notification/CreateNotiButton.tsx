import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import style from 'styles/admin/notification/CreateNotificationButton.module.scss';

export default function CreateNotiButton() {
  const setModal = useSetRecoilState(modalState);

  return (
    <>
      <div className={style.container}>
        <button
          className={style.createAllButton}
          onClick={() => setModal({ modalName: 'ADMIN-NOTI_ALL' })}
        >
          All
        </button>
        <button
          className={style.createSomeoneButton}
          onClick={() =>
            setModal({ modalName: 'ADMIN-NOTI_USER', intraId: 'test' })
          }
        >
          User
        </button>
      </div>
    </>
  );
}
