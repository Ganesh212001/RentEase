import { Router } from 'express';
import {
  approveProperty,
  deleteUser,
  getPendingProperties,
  getUsers,
  removeProperty
} from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { allowRoles } from '../middleware/role.js';

const router = Router();

router.use(protect, allowRoles('admin'));
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.get('/properties/pending', getPendingProperties);
router.put('/properties/:id/approve', approveProperty);
router.delete('/properties/:id', removeProperty);

export default router;
