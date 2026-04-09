import User from '../models/User.js';
import Property from '../models/Property.js';

export const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  return res.json(users);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ message: 'User removed' });
};

export const getPendingProperties = async (req, res) => {
  const properties = await Property.find({ isApproved: false }).populate('owner', 'name email');
  return res.json(properties);
};

export const approveProperty = async (req, res) => {
  const property = await Property.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    { new: true }
  );
  return res.json(property);
};

export const removeProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  return res.json({ message: 'Property removed by admin' });
};
