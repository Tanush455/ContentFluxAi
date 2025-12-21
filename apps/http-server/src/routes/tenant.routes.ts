import express, { Router } from 'express';
import { createTenant, getMyWorkspaces } from '../controllers/tenant.controller';
import { teamInvite, acceptInvite } from '../controllers/team.controller'; // Assuming you separate team logic

export const tenantRouter: Router = express.Router();
export const teamRouter: Router = express.Router();

// Workspace Routes
tenantRouter.post('/create', createTenant);
tenantRouter.get('/list', getMyWorkspaces);

// Team Routes (Mounted separately or here)
teamRouter.post('/invite', teamInvite);
teamRouter.get('/list', acceptInvite);