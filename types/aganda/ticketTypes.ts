// ticketType :
export interface TicketHistoryAPIProps {
  totalSize: number;
  content: TicketHistoryProps[] | null;
}

export interface TicketHistoryProps {
  createdAt: string; // 발급 시작한 시
  issuedFrom: string; // Agenda 이름 or 42Intra
  issuedFromKey: string | null; // AgendaKey UUID or null
  usedTo: string; // Agenda 이름 or NotUsed or NotApporve
  usedToKey: string | null; // AgendaKey UUID or null
  approved: boolean; // true 발급완료, false 발급대기
  approvedAt: string | null; // 발급된 시간 or null
  isUsed: boolean; // true 사용된 티켓, false 사용하지 않음
  usedAt: string | null; //}

  idx?: number;
}
