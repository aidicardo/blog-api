import { db } from '../config/db.js';
import type { Post } from '../models/post.model.js';

let idCounter = 1;

export const createPost = async ({ title, content }: { title: string; content: string }): Promise<Post> => {
  const post: Post = {
    id: idCounter++,
    title,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  db.posts.push(post);
  return post;
};

export const getPosts = async (): Promise<Post[]> => db.posts;

export const getPostById = async (id: number): Promise<Post | undefined> => db.posts.find((p) => p.id === id);

export const updatePost = async (
  id: number,
  { title, content }: { title?: string; content?: string }
): Promise<Post | null> => {
  const post = db.posts.find((p) => p.id === id);
  if (!post) return null;
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  post.updatedAt = new Date();
  return post;
};

export const deletePost = async (id: number): Promise<boolean> => {
  const index = db.posts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  db.posts.splice(index, 1);
  return true;
};
