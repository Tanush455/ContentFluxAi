import express, { Router } from 'express';
import { getAllListProjects, createProject, updateProject, deleteProject, getProjectById } from '../controllers/project.controller';

export const projectRouter: Router = express.Router();

projectRouter.get('/list', getAllListProjects);
projectRouter.post('/create', createProject);
projectRouter.get('/:id', getProjectById)
projectRouter.patch('/:id', updateProject);
projectRouter.delete('/:id', deleteProject);
