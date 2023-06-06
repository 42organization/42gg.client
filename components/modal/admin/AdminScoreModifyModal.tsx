import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { instanceInManage } from 'utils/axios';
import { ScoreModifyType } from 'types/admin/gameLogTypes';
import { HiCheckCircle } from 'react-icons/hi';
import styles from 'styles/admin/modal/AdminScoreModifyModal.module.scss';

type ScoreModifyBodyType = {
  team1Score: number;
  team2Score: number;
  team1Id: number;
  team2Id: number;
};

export default function AdminScoreModifyModal({
  gameId,
  team1,
  team2,
}: ScoreModifyType) {
  const setModal = useSetRecoilState(modalState);

  return (
    <div className={styles['whole']}>
      <HiCheckCircle />
      <div className={styles['scoreInfo']}>
        <div>Team 1</div>
        <div>Team 2</div>
        <div>
          {team1.intraId1} {team1.intraId2}
        </div>
        <div>
          {team2.intraId1} {team2.intraId2}
        </div>
        <div>{team1.score}</div>
        <div>{team2.score}</div>
      </div>
      <div>수정하시겠습니까?</div>
    </div>
  );
}
