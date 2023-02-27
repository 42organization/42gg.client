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
};
