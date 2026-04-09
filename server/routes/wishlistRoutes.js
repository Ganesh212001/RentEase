import { Router } from 'express';
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/wishlistController.js';
import { protect } from '../middleware/auth.js';
import { allowRoles } from '../middleware/role.js';

const router = Router();

router.get('/', protect, allowRoles('customer'), getWishlist);
router.post('/', protect, allowRoles('customer'), addToWishlist);
router.delete('/:propertyId', protect, allowRoles('customer'), removeFromWishlist);

export default router;
