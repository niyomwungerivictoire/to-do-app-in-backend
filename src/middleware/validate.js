import Joi from 'joi';
import ApiError from '../utils/errorHandler.js';

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true, 
    errors: {
      wrap: {
        label: ''
      }
    }
  });

  if (error) {
    const message = error.details.map(detail => detail.message).join(', ');
    return next(new ApiError(message, 400));
  }
  next();
};

export const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .max(50)
    .messages({
      'string.empty': 'Name is required',
      'string.max': 'Name cannot be more than 50 characters'
    }),

  email: Joi.string()
    .trim()
    .required()
    .email()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email'
    }),

  password: Joi.string()
    .trim()
    .required()
    .min(6)
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters'
    })
});
export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .required()
    .email()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email'
    }),

  password: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'Password is required'
    })
});
