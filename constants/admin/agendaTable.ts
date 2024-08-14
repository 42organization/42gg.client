import { AgendaTableFormat } from 'types/admin/agenda/agendaTableTypes';

export const agendaTableFormat: AgendaTableFormat = {
  agenda: {
    name: '대회 관리',
    columns: [
      'agendaId',
      // 'agendaPosterUrl',
      'agendaTitle',
      'agendaDeadLine',
      'agendaStartTime',
      'agendaEndTime',
      // 'agendaCurrentTeam',
      // 'agendaMaxTeam',
      // 'agendaMinPeople',
      // 'agendaMaxPeople',
      'agendaLocation',
      // 'agendaId',
      // 'isRanking',
      'isOfficial',
      'agendaStatus',
      // ---------------------
      'etc',
    ],
    etc: {
      type: 'button',
      value: ['자세히', '팀 목록', '공지사항'],
    },
  },
  team: {
    name: '팀 관리',
    columns: [
      'teamName',
      'teamStatus',
      'teamScore',
      'teamIsPrivate',
      'teamLeaderIntraId',
      'teamMateCount',
      'etc',
    ],
    etc: {
      type: 'button',
      value: ['자세히', '수정', '삭제'],
    },
  },

  announcement: {
    name: '공지사항 관리',
    columns: ['id', 'title', 'content', 'isShow', 'createdAt', 'etc'],
    etc: {
      type: 'button',
      value: ['자세히', '수정', '삭제'],
    },
  },
  ticket: {
    name: '티켓 관리',
    columns: [
      'ticketId',
      'createdAt',
      'issuedFrom',
      // 'issuedFromKey',
      'usedTo',
      // 'usedToKey',
      'isApproved',
      'approvedAt',
      'isUsed',
      'usedAt',
      'etc',
    ],
    etc: {
      type: 'button',
      value: ['자세히', '수정', '삭제'],
    },
  },

  user: {
    name: '사용자 정보',
    columns: ['id', 'roleType', 'intraId', 'etc'],
  },
};
