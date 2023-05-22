import { useState } from 'react';
import styles from 'styles/modal/menu/ReportModal.module.scss';

interface Report {
  category: string;
  content: string;
}

import useReportHandler from 'hooks/modal/useReportHandler';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'utils/recoil/modal';

export default function ReportModal() {
  const setModal = useSetRecoilState(modalState);
  const [report, setReport] = useState<Report>({
    category: '',
    content: '',
  });
  const reportCategory = [
    { id: 'CHEERS', label: '응원의 한 마디' },
    { id: 'OPINION', label: '의견 제시' },
    { id: 'COMPLAINT', label: '불편 사항' },
    { id: 'BUG', label: '버그 신고' },
    { id: 'ETC', label: '기타' },
  ];

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

  const reportHandler = useReportHandler(report);

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
