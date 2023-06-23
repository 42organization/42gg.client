import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import { instanceInManage } from 'utils/axios';
import { ModifyScoreType } from 'types/admin/gameLogTypes';
import { HiCheckCircle } from 'react-icons/hi';
import styles from 'styles/admin/modal/AdminModifyScoreModal.module.scss';

type ModifyScoreBodyType = {
  team1Score: number;
  team2Score: number;
  team1Id: number;
  team2Id: number;
};

export default function AdminModifyScoreModal({
  gameId,
  team1,
  team2,
}: ModifyScoreType) {
  const setModal = useSetRecoilState(modalState);
  const setSnackbar = useSetRecoilState(toastState);

  const handleModifyScore = async () => {
    const requestBody: ModifyScoreBodyType = {
      team1Score: team1.score,
      team2Score: team2.score,
      team1Id: team1.teamId,
      team2Id: team2.teamId,
    };
    try {
      await instanceInManage.put(`/games/${gameId}`, requestBody);
      setSnackbar({
        toastName: `put request`,
        severity: 'success',
        message: `🔥 스코어가 수정되었습니다. 🔥`,
        clicked: true,
      });
    } catch (e: any) {
      setSnackbar({
        toastName: `bad request`,
        severity: 'error',
        message: `🔥 ${e.response.data.message} 🔥`,
        clicked: true,
      });
    }
    setModal({ modalName: null });
  };

  return (
    <div className={styles['whole']}>
      <HiCheckCircle />
      <div className={styles['msg']}>수정하시겠습니까?</div>
      <div className={styles['scoreInfo']}>
        <div className={`${styles['header']} header1`}>Team 1</div>
        <div className={`${styles['header']} header2`}>Team 2</div>
        <div
          className={`intra1 
          ${styles['intra']} ${styles[team1.win ? 'win' : 'lose']} `}
        >
          {team1.intraId1} {team1.intraId2}
        </div>
        <div
          className={`intra2 
          ${styles['intra']} ${styles[team2.win ? 'win' : 'lose']}`}
        >
          {team2.intraId1} {team2.intraId2}
        </div>
        <div
          className={`score1 
          ${styles['score']} ${styles[team1.win ? 'win' : 'lose']} `}
        >
          {team1.score}
        </div>
        <div
          className={`score2 
          ${styles['score']} ${styles[team2.win ? 'win' : 'lose']}`}
        >
          {team2.score}
        </div>
      </div>
      <div className={styles['btns']}>
        <button
          className={styles['cancelBtn']}
          onClick={() => setModal({ modalName: null })}
        >
          취소
        </button>
        <button className={styles['modifyBtn']} onClick={handleModifyScore}>
          확인
        </button>
      </div>
    </div>
  );
}
