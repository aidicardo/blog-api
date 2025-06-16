import { db } from '../config/db.js';
import { PostModel, Post } from '../models/post.model.ts';

let idCounter = 1;

export const createPost = async ({ title, content }: Pick<Post, 'title' | 'content'>): Promise<Post> => {
  const post: Post = new PostModel({ id: idCounter++, title, content });
  db.posts.push(post);
  return post;
};

export const getPosts = async (): Promise<Post[]> => {
  return db.posts;
};

export const getPostById = async (id: number): Promise<Post | undefined> => {
  return db.posts.find((p: Post) => p.id === id);
};

export const updatePost = async (
  id: number,
  { title, content }: Partial<Pick<Post, 'title' | 'content'>>
): Promise<Post | null> => {
  const post = await getPostById(id);
  if (!post) return null;
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  post.updatedAt = new Date();
  return post;
};

export const deletePost = async (id: number): Promise<boolean> => {
  const index = db.posts.findIndex((p: Post) => p.id === id);
  if (index === -1) return false;
  db.posts.splice(index, 1);
  return true;
};
