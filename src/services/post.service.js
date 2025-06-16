import { getDB, saveDB } from '../config/db.js';
import { v4 as uuid } from 'uuid';
export const createPost = async ({ title, content }) => {
  const db = getDB();
  const now = new Date().toISOString();
  const post = { id: uuid(), title, content, createdAt: now, updatedAt: now };
  db.posts.push(post);
  await saveDB();
  return post;
};

export const getPosts = async () => {
  const db = getDB();
  return db.posts;
};

export const getPostById = async id => {
  const db = getDB();
  return db.posts.find(p => p.id === id) || null;
};

export const updatePost = async (id, { title, content }) => {
  const db = getDB();
  const post = db.posts.find(p => p.id === id);
  if (!post) return null;
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  post.updatedAt = new Date().toISOString();
  await saveDB();
  return post;
};

export const deletePost = async id => {
  const db = getDB();
  const index = db.posts.findIndex(p => p.id === id);
  if (index === -1) return false;
  db.posts.splice(index, 1);
  await saveDB();
  return true;
};
