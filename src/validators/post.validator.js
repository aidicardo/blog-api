import Joi from 'joi';

export const postSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(1).required(),
});
