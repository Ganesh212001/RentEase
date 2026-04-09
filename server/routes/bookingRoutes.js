import { Router } from 'express';
import {
  createBookingRequest,
  getCustomerBookings,
  updateBookingStatus
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';
import { allowRoles } from '../middleware/role.js';

const router = Router();

router.post('/', protect, allowRoles('customer'), createBookingRequest);
router.get('/me', protect, allowRoles('customer'), getCustomerBookings);
router.put('/:id/status', protect, allowRoles('owner'), updateBookingStatus);

export default router;
