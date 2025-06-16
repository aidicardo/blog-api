import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { postSchema } from '../validators/post.validator.js';

const router = Router();

router.post('/', validate(postSchema), postController.create);
router.get('/', postController.findAll);
router.get('/:id', postController.findOne);
router.put('/:id', validate(postSchema), postController.update);
router.delete('/:id', postController.remove);

export default router;
