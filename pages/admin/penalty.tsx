import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';

export default function Penalty() {
  const setModal = useSetRecoilState(modalState);

  return (
    <div>
      penalty page{' '}
      <button
        onClick={() =>
          setModal({ modalName: 'ADMIN-PENALTY', intraId: 'daijeong' })
        }
      >
        패널티 부여
      </button>
    </div>
  );
}
