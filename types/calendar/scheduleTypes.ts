export interface Schedule {
  id?: number; //post할땐 필요없음 get에서 필요
  classification?: string; //전체일정, 개인일정은 get 할때만
  eventTag?: string; //EVENT
  jobTag?: string; //JOB_NOTICE
  techTag?: string; //JOB_NOTICE
  author?: string; //전체일정
  title: string;
  content: string;
  link: string;
  startTime: string;
  endTime: string;
  sharedCount?: number; //상세조회에서 필요
  status?: string; //get에서 필요
  alarm?: true; //개인일정
  groupId?: number; //개인일정
  groupTitle?: string; //개인일정
  groupColor?: string; //개인일정
}

export interface PublicSchedule extends Schedule {
  eventTag?: string;
  jobTag?: string;
  techTag?: string;
  author?: string;
  sharedCount?: number;
  status?: string;
}

export interface PrivateSchedule extends Schedule {
  alarm?: true;
  groupId?: number;
  groupTitle?: string;
  groupColor?: string;
}

export interface ScheduleProps {
  selecedSchedule: Schedule;
  setSelecedSchedule: (schedule: Schedule) => void;
}
