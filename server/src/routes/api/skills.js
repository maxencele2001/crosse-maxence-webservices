import express from 'express';
import skillsController from '#src/controllers/skillsController'
import authGard from '#src/middleware/authGard'
const router = express.Router();


router.get('/',skillsController.allSkills);


router.post('/',authGard.isAdmin,skillsController.createSkill);

export default router;