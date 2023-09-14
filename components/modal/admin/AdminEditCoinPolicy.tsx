import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { IcoinPolicy } from 'types/admin/adminCoinTypes';
import { instanceInManage } from 'utils/axios';
import { modalState } from 'utils/recoil/modal';
import { toastState } from 'utils/recoil/toast';
import styles from 'styles/admin/modal/AdminEditCoinPolicy.module.scss';

export default function AdminEditCoinPolicyModal(props: IcoinPolicy) {
  const { attendance, normal, rankWin, rankLose } = props;
  const setModal = useSetRecoilState(modalState);
  const setSnackBar = useSetRecoilState(toastState);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (data: IcoinPolicy): Promise<AxiosResponse> => {
      return instanceInManage.post(`/coinpolicy`, data);
    }
  );

  const editCoinPolicyHandler = () => {
    mutate(props, {
      onSuccess: () => {
        setSnackBar({
          toastName: 'edit coinpolicy',
          severity: 'success',
          message: '새로운 재화 정책이 등록되었습니다.',
          clicked: true,
        });
        queryClient.invalidateQueries({ queryKey: 'coinPolicyHistory' });
        setModal({ modalName: null });
      },
      onError: () => {
        setSnackBar({
          toastName: 'edit coinpolicy',
          severity: 'error',
          message: 'API 요청에 문제가 발생했습니다.',
          clicked: true,
        });
      },
    });
  };

  return (
    <div className={styles.whole}>
      <div className={styles.title}>
        <div className={styles.titleText}>정책 등록</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.body}>
        <div className={styles.bodyWrap}>
          <div className={styles.contentWrap}>
            <div className={styles.bodyText}>출석 획득 :</div>
            <input
              className={styles.contentBlank}
              value={attendance}
              readOnly
            />
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.bodyText}>일반게임 획득 :</div>
            <input className={styles.contentBlank} value={normal} readOnly />
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.bodyText}>랭크게임 승리 획득 :</div>
            <input className={styles.contentBlank} value={rankWin} readOnly />
          </div>
          <div className={styles.contentWrap}>
            <div className={styles.bodyText}>랭크게임 패배 획득 :</div>
            <input className={styles.contentBlank} value={rankLose} readOnly />
          </div>
          <div className={styles.checkWrap}>
            해당 재화 정책을 등록하시겠습니까?
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button className={styles.editBtn} onClick={editCoinPolicyHandler}>
            등록
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => setModal({ modalName: null })}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
