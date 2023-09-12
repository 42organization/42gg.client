import { TableFormat } from 'types/admin/tableTypes';

export const tableFormat: TableFormat = {
  notification: {
    name: '알림 관리',
    columns: ['id', 'createdAt', 'intraId', 'type', 'message', 'isChecked'],
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
    columns: ['id', 'createdAt', 'intraId', 'category', 'content', 'isSolved'],
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
      'createdAt',
      'creatorIntraId',
      'modifiedAt',
      'deletedAt',
      'deleterIntraId',
    ],
  },
  penalty: {
    name: '패널티 관리',
    columns: ['penaltyId', 'releaseTime', 'intraId', 'reason', 'etc'],
    etc: {
      type: 'button',
      value: ['해제'],
    },
  },
  seasonCreate: {
    name: '시즌 생성',
    columns: ['seasonName', 'startTime', 'startPpp', 'pppGap', 'create'],
  },
  seasonHistory: {
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
      'purchaserIntraId',
      'ownerIntraId',
      'itemStatusType',
    ],
  },
  megaphoneList: {
    name: '확성기 사용 내역',
    columns: [
      'megaphoneId',
      'usedAt',
      'intraId',
      'content',
      'status',
      'delete',
    ],
  },
  profileList: {
    name: '프로필 변경권 사용 내역 및 삭제',
    columns: [
      'id',
      'createdAt',
      'userIntraId',
      'imageUri',
      'deletedAt',
      'delete',
      'isCurrent',
    ],
  },
  profileListCurrent: {
    name: '현재 프로필 조회',
    columns: ['id', 'createdAt', 'userIntraId', 'imageUri'],
  },
  profileDeletedList: {
    name: '프로필 삭제 내역',
    columns: ['id', 'createdAt', 'deletedAt', 'userIntraId', 'imageUri'],
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
      'edit',
      'delete',
    ],
  },
  itemHistory: {
    name: '상점 아이템 변경 이력',
    columns: [
      'itemId',
      'createdAt',
      'name',
      'content',
      'imageUri',
      'price',
      'discount',
      'creatorIntraId',
      'deleterIntraId',
      'visible',
    ],
  },
  coinPolicy: {
    name: '재화 정책 변경',
    columns: ['attendance', 'normal', 'rankWin', 'rankLose', 'edit'],
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
