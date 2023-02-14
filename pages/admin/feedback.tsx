import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';

export default function Feedback() {
  const setModal = useSetRecoilState(modalState);

  return (
    <div>
      feedback page{' '}
      <button
        onClick={() =>
          setModal({ modalName: 'ADMIN-CHECK_FEEDBACK', intraId: 'daijeong' })
        }
      >
        피드백 확인
      </button>
    </div>
  );
}
