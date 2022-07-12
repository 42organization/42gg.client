import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import { menuBarState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
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
  const setModalInfo = useSetRecoilState(modalState);
  const setErrorMessage = useSetRecoilState(errorState);
  const setOpenMenuBar = useSetRecoilState(menuBarState);
  const reportCategory = [
    { id: 'GAMERESULT', label: '게임 결과 정정 요청' },
    { id: 'BUG', label: '버그 신고' },
    { id: 'COMPLAINT', label: '불편 사항' },
    { id: 'OPINION', label: '의견 제시' },
    { id: 'CHEERS', label: '응원의 한 마디' },
    { id: 'ETC', label: '기타' },
  ];

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
        setModalInfo({ modalName: null });
        setOpenMenuBar(false);
        alert('신고가 완료되었습니다.');
      } catch (e: any) {
        if (e.response.status === 0) setErrorMessage('DK303');
        else setErrorMessage('JH06');
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
          {reportCategory.map((category, index) => (
            <div key={index}>
              <input
                type='radio'
                name='category'
                id={category.id}
                value={category.id}
                onChange={inputChangeHandler}
              />
              <label htmlFor={category.id}>{category.label}</label>
            </div>
          ))}
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
              onClick={() => setModalInfo({ modalName: null })}
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
