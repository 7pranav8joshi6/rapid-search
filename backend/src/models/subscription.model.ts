import mongoose, { Document, Schema } from "mongoose";

export interface Subscriptions extends Document {
  subscriptionName: string;
  subscriptionId: string;
  price: number;
  usageLimit: number;
}

const SubscriptionsSchema = new Schema<Subscriptions>({
  subscriptionName: { type: String },
  subscriptionId: { type: String, unique: true },
  price: { type: Number, unique: true },
  usageLimit: { type: Number },
});

export default mongoose.model<Subscriptions>(
  "Subscriptions",
  SubscriptionsSchema
);
