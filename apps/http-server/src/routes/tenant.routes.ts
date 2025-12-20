import express from 'express';
import { createTenant, getMyWorkspaces } from '../controllers/tenant.controller';
import { inviteMember, getTeamMembers } from '../controllers/team.controller'; // Assuming you separate team logic

export const tenantRouter = express.Router();
export const teamRouter = express.Router();

// Workspace Routes
tenantRouter.post('/create', createTenant);
tenantRouter.get('/list', getMyWorkspaces);

// Team Routes (Mounted separately or here)
teamRouter.post('/invite', inviteMember);
teamRouter.get('/list', getTeamMembers);