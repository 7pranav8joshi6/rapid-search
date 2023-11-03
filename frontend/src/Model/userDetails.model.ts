export interface UserDetailDTO {
  name: string;
  email: string;
  password: string;
  searchCount: number;
  isSubscribed: boolean;
  subscriptionId?: string;
  customerId?: string;
  paymentType?: ["SUBSCRIBE", "UPGRADE", "DOWNGRADE"];
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface SubscriptionDTO {
  subscriptionName: string;
  subscriptionId: string;
  usageLimit: number;
  price: number;
}

export interface SubscriptionHistoryDTO {
  customerId: string;
  email: string;
  payment_status: string;
  price: number;
}
