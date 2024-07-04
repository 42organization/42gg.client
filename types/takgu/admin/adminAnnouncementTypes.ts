export interface IAnnouncement {
  content: string;
  creatorIntraId: string;
  deleterIntraId: string;
  deletedAt: Date;
  createdAt: Date;
  modifiedAt: Date;
}

export interface IAnnouncementTable {
  announcementList: IAnnouncement[];
  totalPage: number;
  currentPage: number;
}
