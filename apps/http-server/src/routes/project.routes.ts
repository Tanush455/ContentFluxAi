import express, { Router } from 'express';
import {
    getAllListProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject
} from '../controllers/project.controller';

import {
    getPostsOfProject,
    createPost,
    getThePostById,
    savePost,
    deletePost
} from '../controllers/post.controller';

export const projectRouter: Router = express.Router();

// ========================
// PROJECT ROUTES
// ========================
projectRouter.get('/list', getAllListProjects);
projectRouter.post('/create', createProject);
projectRouter.get('/:projectId', getProjectById); // Changed :id to :projectId for clarity
projectRouter.patch('/:projectId', updateProject);
projectRouter.delete('/:projectId', deleteProject);

// ========================
// POST ROUTES (Nested)
// ========================
// List all posts in a project
projectRouter.get('/:projectId/posts', getPostsOfProject);

// Create a new post in a project
projectRouter.post('/:projectId/posts', createPost);

// Get a single post for the Editor
projectRouter.get('/:projectId/posts/:postId', getThePostById);

// Save/Update a post (Autosave)
projectRouter.patch('/:projectId/posts/:postId', savePost);

// Delete a post
projectRouter.delete('/:projectId/posts/:postId', deletePost);