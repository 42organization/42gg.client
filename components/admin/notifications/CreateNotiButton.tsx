import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';

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
      <button onClick={() => openModal()}>Create All Notification</button>;
      <button onClick={() => openModal('SOME-ONE')}>
        Create Someone Notification
      </button>
      ;
    </>
  );
}
