import { useEffect, useState } from 'react';

export default function FeedbackDetailModal({
  intraId,
  detailContent,
}: {
  intraId: string;
  detailContent: string;
}) {
  const [contentWithNewLine, setContent] = useState<string>('');
  const MAX_CONTENT_LENGTH = 30;

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
      <h2>{intraId}</h2>
      {contentWithNewLine.split('\r\n').map((value: string, index: number) => {
        return (
          <span
            key={index}
            style={{
              padding: '5px',
              fontSize: '1.2rem',
            }}
          >
            {value}
          </span>
        );
      })}
    </>
  );
}
