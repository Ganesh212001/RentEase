import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true }
  },
  { timestamps: true }
);

wishlistSchema.index({ customer: 1, property: 1 }, { unique: true });

export default mongoose.model('Wishlist', wishlistSchema);
