import { Router } from 'express';
import { register, login, getMe } from '../controller/authController.js';
import { validate, registerSchema, loginSchema } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

router.get('/me', protect, getMe);

export default router;
