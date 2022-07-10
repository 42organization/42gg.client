import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import { reportModalState } from 'utils/recoil/layout';
import instance from 'utils/axios';
import styles from 'styles/modal/ReportModal.module.scss';

interface ReportInfo {
  category: string;
  content: string;
}

export default function ReportModal() {
  const [reportData, setReportData] = useState<ReportInfo>({
    category: '',
    content: '',
  });
  const setErrorMessage = useSetRecoilState(errorState);
  const setReportModal = useSetRecoilState(reportModalState);

  const inputChangeHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>) => {
    setReportData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reportHandler = async () => {
    if (reportData.category && reportData.content) {
      const body = reportData;
      try {
        await instance.post('/pingpong/feedback', body);
        setReportModal(false);
        alert('신고가 완료되었습니다.');
      } catch (e) {
        setErrorMessage('JH06');
      }
    } else {
      alert('마음을 담아 신고를 해주세요 ❤️');
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.emoji}>👮‍♀️</div>
        <div className={styles.phrase}>Report</div>
      </div>
      <form>
        <div className={styles.category}>
          <div>
            <input
              type='radio'
              name='category'
              id='gameResult'
              value='GAMERESULT'
              onChange={inputChangeHandler}
            />
            <label htmlFor='gameResult'>게임 결과 정정 요청</label>
          </div>
          <div>
            <input
              type='radio'
              name='category'
              id='bug'
              value='BUG'
              onChange={inputChangeHandler}
            />
            <label htmlFor='bug'>버그 신고</label>
          </div>
          <div>
            <input
              type='radio'
              name='category'
              id='complaint'
              value='COMPLAINT'
              onChange={inputChangeHandler}
            />
            <label htmlFor='complaint'>불편 사항</label>
          </div>
          <div>
            <input
              type='radio'
              name='category'
              id='opinion'
              value='OPINION'
              onChange={inputChangeHandler}
            />
            <label htmlFor='opinion'>의견 제시</label>
          </div>
          <div>
            <input
              type='radio'
              name='category'
              id='cheers'
              value='CHEERS'
              onChange={inputChangeHandler}
            />
            <label htmlFor='cheers'>응원의 한 마디</label>
          </div>
          <div>
            <input
              type='radio'
              name='category'
              id='etc'
              value='ETC'
              onChange={inputChangeHandler}
            />
            <label htmlFor='etc'>기타</label>
          </div>
        </div>
        <div className={styles.content}>
          <textarea
            name='content'
            maxLength={300}
            onChange={inputChangeHandler}
          />
          <div>{`${reportData.content.length}/300`}</div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.negative}>
            <input
              type='button'
              onClick={() => {
                setReportModal(false);
              }}
              value='취소'
            />
          </div>
          <div className={styles.positive}>
            <input type='button' onClick={reportHandler} value='신고' />
          </div>
        </div>
      </form>
    </div>
  );
}
