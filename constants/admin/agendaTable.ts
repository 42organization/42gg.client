import { AgendaTableFormat } from 'types/admin/agenda/agendaTableTypes';

export const agendaTableFormat: AgendaTableFormat = {
  agenda: {
    name: '대회 관리',
    columns: [
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
      value: ['대회 수정', '대회 삭제', '팀 목록', '공지사항'],
    },
  },
};
