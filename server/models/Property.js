import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    propertyType: {
      type: String,
      enum: ['House', 'Farmhouse', 'Villa'],
      required: true
    },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    landmark: { type: String, default: '' },
    rentPrice: { type: Number, required: true, min: 0 },
    rentCycle: { type: String, enum: ['day', 'month'], default: 'month' },
    images: [{ type: String }],
    isApproved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Property', propertySchema);
