import { Router } from 'express';
import { auth } from '../middlewares/auth.js';

import {
  getUser,
  getUsers,
  approveUser,
  update,
  remove,
} from '../controllers/user.controller.js';

const router = Router();

router.get('/:id', auth, getUser);
router.get('/', getUsers);
router.put('/approve/:id', auth, approveUser);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

export default router;

