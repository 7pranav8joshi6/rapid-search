import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  subscriptionId?: string;
  customerId?: string;
  isSubscribed?: boolean;
  searchCount: number;
  paymentType: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscriptionId: { type: String },
  customerId: { type: String },
  isSubscribed: { type: Boolean },
  searchCount: { type: Number },
  paymentType: { type: String },
});

export default mongoose.model<User>("User", userSchema);
