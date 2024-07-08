import { useEffect, useState } from 'react';
import styles from 'styles/takgu/admin/modal/FeedbackDetail.module.scss';

export default function DetailModal({
  detailTitle,
  detailContent,
}: {
  detailTitle: string;
  detailContent: string;
}) {
  const [contentWithNewLine, setContent] = useState<string>('');
  const MAX_CONTENT_LENGTH = 32;

  useEffect(() => {
    const contentWithNewLine = detailContent
      .split('')
      .reduce(
        (result: string, char: string, index: number) =>
          index % MAX_CONTENT_LENGTH === 0 && index > 0
            ? result + '\r\n' + char
            : result + char,
        ''
      );
    setContent(contentWithNewLine);
  }, [detailContent]);
  return (
    <>
      <div className={styles.whole}>
        <h2 className={styles.writer}>{detailTitle}</h2>
        {contentWithNewLine
          .split('\r\n')
          .map((value: string, index: number) => {
            return (
              <span key={index} className={styles.content}>
                {value}
              </span>
            );
          })}
      </div>
    </>
  );
}
