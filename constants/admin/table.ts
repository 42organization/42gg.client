import { TableFormat } from 'types/admin/tableTypes';

export const tableFormat: TableFormat = {
  notification: {
    name: '알림 관리',
    columns: [
      'notiId',
      'intraId',
      'slotId',
      'type',
      'message',
      'createdTime',
      'isChecked',
    ],
  },
  userInfo: {
    name: '사용자 정보',
    columns: ['id', 'roleType', 'intraId', 'statusMessage', 'etc'],
    etc: {
      type: 'button',
      value: ['자세히', '패널티 부여'],
    },
  },
  feedback: {
    name: '피드백 관리',
    columns: [
      'id',
      'intraId',
      'category',
      'content',
      'createdTime',
      'isSolved',
    ],
    etc: {
      type: 'toggle',
      value: ['completed', 'notCompleted'],
    },
  },
  games: {
    name: '게임 관리',
    columns: ['gameId', 'startAt', 'slotTime', 'mode', 'team1', 'team2'],
  },
  announcement: {
    name: '과거 공지사항',
    columns: [
      'content',
      'createdTime',
      'creatorIntraId',
      'deletedTime',
      'deleterIntraId',
      'isDel',
    ],
  },
  penalty: {
    name: '패널티 관리',
    columns: ['intraId', 'reason', 'releaseTime', 'etc'],
    etc: {
      type: 'button',
      value: ['해제'],
    },
  },
  season: {
    name: '시즌 목록',
    columns: [
      'id',
      'seasonName',
      'startTime',
      'endTime',
      'startPpp',
      'pppGap',
      'status',
      'edit',
    ],
  },
};
