import mongoose, { Document, Schema } from "mongoose";

export interface SubscriptionHistory extends Document {
  customerId: string;
  email: string;
  payment_status: string;
  price: number;
}

const SubscriptionHistorySchema = new Schema<SubscriptionHistory>({
  customerId: { type: String },
  email: { type: String },
  payment_status: { type: String },
  price: { type: Number },
});

export default mongoose.model<SubscriptionHistory>(
  "SubscriptionHistory",
  SubscriptionHistorySchema
);
