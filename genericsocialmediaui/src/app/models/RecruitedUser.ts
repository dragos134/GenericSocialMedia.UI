export interface RecruitedUser {
  id: number;
  createdAt: Date;
  email: string;
  createdBy: string;
  isRegistered: boolean;
  subscription: string;
  subscriptionId: number;
  firstName: string;
  lastName: string;
}
