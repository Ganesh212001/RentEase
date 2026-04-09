import { Router } from 'express';
import {
  createProperty,
  deleteProperty,
  getOwnerDashboard,
  getProperties,
  getPropertyById,
  updateProperty
} from '../controllers/propertyController.js';
import { protect } from '../middleware/auth.js';
import { allowRoles } from '../middleware/role.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/', getProperties);
router.get('/owner/dashboard/me', protect, allowRoles('owner'), getOwnerDashboard);
router.get('/:id', getPropertyById);
router.post('/', protect, allowRoles('owner', 'admin'), upload.array('images', 6), createProperty);
router.put('/:id', protect, upload.array('images', 6), updateProperty);
router.delete('/:id', protect, deleteProperty);

export default router;
