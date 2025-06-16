import { Request, Response } from 'express';
import * as postService from '../services/post.service.js';

export const create = async (req: Request, res: Response): Promise<void> => {
  const post = await postService.createPost(req.body);
  res.status(201).json(post);
};

export const findAll = async (_req: Request, res: Response): Promise<void> => {
  const posts = await postService.getPosts();
  res.json(posts);
};

export const findOne = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const post = await postService.getPostById(id);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.json(post);
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const post = await postService.updatePost(id, req.body);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.json(post);
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  const success = await postService.deletePost(id);
  if (!success) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.status(204).send();
};
