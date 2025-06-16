import { Post } from '../models/post.model.js';

export const createPost = async ({ title, content }: { title: string; content: string }) => {
  const post = await Post.create({ title, content });
  return post.toObject();
};

export const getPosts = async () => Post.find().lean();

export const getPostById = async (id: string) => Post.findById(id).lean();

export const updatePost = async (
  id: string,
  { title, content }: { title?: string; content?: string }
) =>
  Post.findByIdAndUpdate(
    id,
    { $set: { title, content } },
    { new: true, runValidators: true }
  ).lean();

export const deletePost = async (id: string) => {
  const result = await Post.findByIdAndDelete(id);
  return !!result;
};
