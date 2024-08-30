export interface ITicket {
  ticketId: number;
  createdAt?: string;
  issuedFrom?: string;
  issuedFromKey?: string;
  usedTo?: string;
  usedToKey?: string;
  isApproved?: boolean;
  approvedAt?: string;
  isUsed?: boolean;
  usedAt?: string;
}
