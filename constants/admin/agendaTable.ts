import { AgendaTableFormat } from 'types/admin/agenda/agendaTableTypes';

export const agendaTableFormat: AgendaTableFormat = {
  agenda: {
    name: '대회 관리',
    columns: [
      'id',
      'title',
      'contents',
      'deadLine',
      'startTime',
      'endTime',
      'minTeam',
      'maxTeam',
      'currentTeam',
      'minPeople',
      'maxPeople',
      'poster',
      'host',
      'location',
      'status',
      'createdAt',
      'isRanking',
      'isOfficial',
    ],
  },
};
