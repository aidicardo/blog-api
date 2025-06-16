import { db } from '../config/db.js';
import { Post } from '../models/post.model.js';

let idCounter = 1;

export const createPost = ({ title, content }) => {
  const post = new Post({ id: idCounter++, title, content });
  db.posts.push(post);
  return post;
};

export const getPosts = () => db.posts;

export const getPostById = (id) => db.posts.find((p) => p.id === id);

export const updatePost = (id, { title, content }) => {
  const post = getPostById(id);
  if (!post) return null;
  post.title = title !== undefined ? title : post.title;
  post.content = content !== undefined ? content : post.content;
  post.updatedAt = new Date();
  return post;
};

export const deletePost = (id) => {
  const index = db.posts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  db.posts.splice(index, 1);
  return true;
};
