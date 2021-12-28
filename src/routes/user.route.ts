import { use } from 'chai';
import express from 'express';
import UserController from '../controllers/user.controller';

class UserRoutes {

    public router = express.Router();

    private readonly userController = new UserController();

    

    constructor() {
        this.configureUserRoutes();
        this.configurePostRoutes();
    }

    configureUserRoutes = () => {

        this.router.get('/users', this.userController.getAllUsers)
    }

    configurePostRoutes = ()=>{

        this.router.post('/sign-up', this.userController.createUser)

    }
}

export default UserRoutes;