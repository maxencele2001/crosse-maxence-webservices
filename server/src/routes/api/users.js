import express from 'express';
import usersController from '#src/controllers/usersController'
import authGard from '#src/middleware/authGard'

const router = express.Router();


router.get('/',usersController.allUsers);

router.post('/',authGard.isAdmin,usersController.createUser);
router.patch('/:id',authGard.isAdmin,usersController.patchUser);

export default router;