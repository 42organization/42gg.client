export interface IFeedback {
  id: number;
  intraId: string;
  category: number; // 1: bug, 2: suggestion, 3: question
  content: string;
  createdAt: Date;
  isSolved: boolean;
}

export interface IFeedbackTable {
  feedbackList: IFeedback[];
  totalPage: number;
  currentPage: number;
}
