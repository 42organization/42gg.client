export interface Schedule {
  id?: number;
  classification: string;
  eventTag?: string;
  jobTag?: string;
  techTag?: string;
  author: string;
  title: string;
  content: string;
  link: string;
  startTime: string;
  endTime: string;
  sharedCount?: number;
}
