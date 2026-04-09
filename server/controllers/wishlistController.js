import Wishlist from '../models/Wishlist.js';

export const addToWishlist = async (req, res) => {
  try {
    const item = await Wishlist.create({
      customer: req.user._id,
      property: req.body.propertyId
    });
    return res.status(201).json(item);
  } catch (error) {
    return res.status(400).json({ message: 'Already saved or invalid property' });
  }
};

export const removeFromWishlist = async (req, res) => {
  await Wishlist.findOneAndDelete({ customer: req.user._id, property: req.params.propertyId });
  return res.json({ message: 'Removed from wishlist' });
};

export const getWishlist = async (req, res) => {
  const items = await Wishlist.find({ customer: req.user._id }).populate('property');
  return res.json(items);
};
