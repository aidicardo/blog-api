import mongoose, { Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);
