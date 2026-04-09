// Authorize only selected roles for an endpoint.
export const allowRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: access denied' });
  }
  next();
};
