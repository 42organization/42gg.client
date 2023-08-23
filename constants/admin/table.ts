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
      'seasonId',
      'seasonName',
      'startTime',
      'endTime',
      'startPpp',
      'pppGap',
      'status',
      'edit',
    ],
  },
  receiptList: {
    name: '구매 내역',
    columns: [
      'receiptId',
      'createdAt',
      'itemName',
      'itemPrice',
      'purchaserIntra',
      'ownerIntra',
      'itemStatus',
    ],
  },
  megaphoneList: {
    name: '확성기 사용 내역',
    columns: ['megaphoneId', 'usedAt', 'intraId', 'content', 'status'],
  },
  profileList: {
    name: '프로필 변경권 사용 내역',
    columns: ['profileId', 'date', 'intraId', 'imageUri'],
  },
  itemList: {
    name: '상점 아이템 목록',
    columns: [
      'itemId',
      'itemName',
      'content',
      'itemType',
      'imageUri',
      'originalPrice',
      'discount',
      'salePrice',
    ],
  },
  itemHistory: {
    name: '상점 아이템 변경 이력',
    columns: [
      'itemId',
      'createdAt',
      'itemName',
      'content',
      'imageUri',
      'price',
      'discount',
      'creatorIntraId',
      'deleterIntraId',
      'visible',
    ],
  },
  coinPolicyHistory: {
    name: '재화 정책 변경 이력',
    columns: [
      'coinPolicyId',
      'createdAt',
      'createUserId',
      'attendance',
      'normal',
      'rankWin',
      'rankLose',
    ],
  },
};
