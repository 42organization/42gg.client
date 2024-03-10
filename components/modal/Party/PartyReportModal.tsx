import { useState } from 'react';
import { mockInstance } from 'utils/mockAxios';

type PartyReportModalProps = {
  reportName: 'COMMENT' | 'ROOM' | 'NO_SHOW';
  commentId?: number;
  roomId?: number;
  userIntraId?: number;
};

export function PartyReport({
  reportName,
  commentId,
  roomId,
  userIntraId,
}: PartyReportModalProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (reportName) {
      case 'COMMENT':
        mockInstance.post(`/party/reports/comments/${commentId}`);
        break;
      case 'ROOM':
        mockInstance.post(`/party/reports/rooms/${roomId}`);
        break;
      case 'NO_SHOW':
        mockInstance.post(
          `/party/reports/rooms/${roomId}/users/${userIntraId}`
        );
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        rows={10}
        autofocus
        cols={80}
        placeholder='신고 내역 작성'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <button type='submit'>신고하기</button>
    </form>
  );
}
