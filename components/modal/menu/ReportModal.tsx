import { useState } from 'react';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { errorState } from 'utils/recoil/error';
import { openMenuBarState } from 'utils/recoil/layout';
import { modalState } from 'utils/recoil/modal';
import instance from 'utils/axios';
import styles from 'styles/modal/ReportModal.module.scss';

interface Report {
  category: string;
  content: string;
}

export default function ReportModal() {
  const [report, setReport] = useState<Report>({
    category: '',
    content: '',
  });
  const setModal = useSetRecoilState(modalState);
  const setError = useSetRecoilState(errorState);
  const resetOpenMenuBar = useResetRecoilState(openMenuBarState);
  const reportCategory = [
    { id: 'CHEERS', label: '응원의 한 마디' },
    { id: 'OPINION', label: '의견 제시' },
    { id: 'COMPLAINT', label: '불편 사항' },
    { id: 'BUG', label: '버그 신고' },
    { id: 'ETC', label: '기타' },
  ];
  const reportResponse: { [key: string]: string } = {
    SUCCESS: '의견 주셔서 감사합니다 ❤️',
    REJECT: '마음을 담아 의견을 보내주세요 ❤️',
  };

  const inputChangeHandler = ({
    target: { name, value },
  }:
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLInputElement>) => {
    setReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reportHandler = async () => {
    if (report.category && report.content.replace(/^\s+|\s+$/g, '')) {
      try {
        await instance.post('/pingpong/feedback', report);
        setModal({ modalName: null });
        resetOpenMenuBar();
        alert(reportResponse.SUCCESS);
      } catch (e) {
        setError('JH06');
      }
    } else {
      alert(reportResponse.REJECT);
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
          <div>{`${report.content.length}/300`}</div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.negative}>
            <input
              type='button'
              onClick={() => setModal({ modalName: null })}
              value='취소'
            />
          </div>
          <div className={styles.positive}>
            <input type='button' onClick={reportHandler} value='보내기' />
          </div>
        </div>
      </form>
    </div>
  );
}
