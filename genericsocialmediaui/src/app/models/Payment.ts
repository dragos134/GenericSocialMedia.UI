export interface Payment {
  userId: number;
  userEmail: string;
  subscription: string;
  paymentMessage: string;
  paymentStatus: string;
  date: Date;
}
