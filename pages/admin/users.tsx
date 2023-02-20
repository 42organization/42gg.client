import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';

export default function Users() {
  const setModal = useSetRecoilState(modalState);

  return (
    <div>
      users page
      <button
        onClick={() => setModal({ modalName: 'ADMIN-PROFILE', userId: 5 })}
      >
        자세히
      </button>
    </div>
  );
}
