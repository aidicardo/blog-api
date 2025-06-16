import * as postService from '../services/post.service.js';

export const create = (req, res) => {
  const post = postService.createPost(req.body);
  res.status(201).json(post);
};

export const findAll = (req, res) => {
  const posts = postService.getPosts();
  res.json(posts);
};

export const findOne = (req, res) => {
  const id = Number(req.params.id);
  const post = postService.getPostById(id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

export const update = (req, res) => {
  const id = Number(req.params.id);
  const post = postService.updatePost(id, req.body);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

export const remove = (req, res) => {
  const id = Number(req.params.id);
  const success = postService.deletePost(id);
  if (!success) return res.status(404).json({ message: 'Post not found' });
  res.status(204).send();
};
