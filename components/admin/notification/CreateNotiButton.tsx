import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import style from 'styles/admin/notification/CreateNotificationButton.module.scss';

export default function CreateNotiButton() {
  const setModal = useSetRecoilState(modalState);

  // TODO Create Modal Distinguishing Criteria(param)
  const openModal = (param?: string) => {
    if (!param) {
      // TODO all notification modal
      console.log('Create all notification');
    } else {
      // TODO someone notification modal
      console.log(`Create ${param} notification`);
    }
  };
  return (
    <>
      <div className={style.container}>
        <button className={style.createAllButton} onClick={() => openModal()}>
          Create All
        </button>
        <button
          className={style.createSomeoneButton}
          onClick={() => openModal('SOME-ONE')}
        >
          Create Someone
        </button>
      </div>
    </>
  );
}
