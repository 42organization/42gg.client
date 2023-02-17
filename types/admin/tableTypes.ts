export const tableColumnNames = {
  notification: [
    'notiId',
    'intraId',
    'slotId',
    'type',
    'message',
    'createdTime',
    'isChecked',
  ],
  userInfo: {
    name: '사용자 정보',
    columns: ['id', 'roleType', 'intraId', 'statusMessage', 'etc'],
    etc: {
      type: 'button',
      value: ['자세히', '패널티 부여'],
    },
  },
  // TODO: 각 페이지별 column name을 contants object로 분류, 각 페이지에서 indexing해서 사용
};
