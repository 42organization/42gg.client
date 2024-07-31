import { collapseClasses } from '@mui/material';
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
      value: ['자세히', '대회 수정', '대회 삭제', '팀 목록', '공지사항'],
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
      value: ['자세히', '팀 수정', '팀 삭제'],
    },
  },
};
