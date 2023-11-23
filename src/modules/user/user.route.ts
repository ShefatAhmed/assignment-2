import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getSingleUser);
router.put('/:userId', UserController.updateUser);


export const UserRoute = router;