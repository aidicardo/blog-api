import mongoose, { Document, Model } from 'mongoose';

export interface PostDocument extends Document {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<PostDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Post: Model<PostDocument> = mongoose.model<PostDocument>('Post', postSchema);
