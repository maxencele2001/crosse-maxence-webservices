import express from 'express';
import projectsController from '#src/controllers/ProjectsController'
import authGard from '#src/middleware/authGard'
const router = express.Router();

// router.get('/',projectsController.allProjects);
router.get('/',projectsController.allProjects);
router.get('/recents',projectsController.recentsProjects);
router.get('/:id',projectsController.oneProject);
router.post('/',authGard.isAdmin,projectsController.createProject);
router.put('/:id',authGard.isAdmin,projectsController.updateProject);
router.patch('/:id',authGard.isAdmin,projectsController.patchProject);

export default router;