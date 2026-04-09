import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
