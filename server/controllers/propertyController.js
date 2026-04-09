import Property from '../models/Property.js';
import Booking from '../models/Booking.js';

export const createProperty = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      owner: req.user._id,
      images: req.files?.map((file) => `/uploads/${file.filename}`) || []
    };

    const property = await Property.create(payload);
    return res.status(201).json(property);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getProperties = async (req, res) => {
  try {
    const { state, city, pincode, type, priceMin, priceMax, landmark } = req.query;
    const query = { isApproved: true };

    if (state) query.state = state;
    if (city) query.city = city;
    if (pincode) query.pincode = pincode;
    if (type) query.propertyType = type;
    if (landmark) query.landmark = { $regex: landmark, $options: 'i' };
    if (priceMin || priceMax) {
      query.rentPrice = {};
      if (priceMin) query.rentPrice.$gte = Number(priceMin);
      if (priceMax) query.rentPrice.$lte = Number(priceMax);
    }

    const properties = await Property.find(query).populate('owner', 'name email phone');
    return res.json(properties);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email phone');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    return res.json(property);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed to update this property' });
    }

    Object.assign(property, req.body);
    if (req.files?.length) {
      property.images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const updated = await property.save();
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (property.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not allowed to delete this property' });
    }

    await property.deleteOne();
    return res.json({ message: 'Property deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOwnerDashboard = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id });
    const bookings = await Booking.find({ owner: req.user._id })
      .populate('property', 'title city')
      .populate('customer', 'name email');

    return res.json({ properties, bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
