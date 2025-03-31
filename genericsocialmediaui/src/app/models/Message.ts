export interface Message {
  id: number;
  content: string;
  isRead: boolean;
  senderUsername: string;
  senderFullname: string;
  receiverUsername: string;
  receiverFullname: string;
  sentAt: Date;
}
