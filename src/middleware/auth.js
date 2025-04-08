import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';
import ApiError from '../utils/errorHandler.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ApiError('Not authorized to access this route', 401));
    }

    const { valid, expired, decoded } = verifyToken(token);

    if (!valid) {
	      return next(
        new ApiError(
          expired ? 'Your token has expired' : 'Invalid token',
          401
        )
      );
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(
        new ApiError('The user belonging to this token no longer exists', 401)
      );
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError('Not authorized to access this route', 401));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
