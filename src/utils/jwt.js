import jwt from 'jsonwebtoken';
import config from '../config/env.js';
	
// Generate JWT token
export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    config.jwtSecret,
    { expiresIn: config.jwtExpiration }
  );
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return { valid: true, expired: false, decoded };
  } catch (error) {
																		    return {
      valid: false,
      expired: error.name === 'TokenExpiredError',
      decoded: null
    };
  }
};
