import express, { Router } from 'express'


const UserRouter: Router = express.Router();

UserRouter.post('/verify-person', emailVerification);
UserRouter.post('/forgot-password', forgotPassword);


export default UserRouter;