import Booking from '../models/Booking.js';
import Property from '../models/Property.js';

export const createBookingRequest = async (req, res) => {
  try {
    const { propertyId, message } = req.body;
    const property = await Property.findById(propertyId);

    if (!property) return res.status(404).json({ message: 'Property not found' });

    const booking = await Booking.create({
      property: property._id,
      customer: req.user._id,
      owner: property.owner,
      message
    });

    return res.status(201).json(booking);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only owner can update booking status' });
    }

    booking.status = req.body.status;
    await booking.save();

    return res.json(booking);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getCustomerBookings = async (req, res) => {
  const bookings = await Booking.find({ customer: req.user._id }).populate('property', 'title city rentPrice');
  return res.json(bookings);
};
