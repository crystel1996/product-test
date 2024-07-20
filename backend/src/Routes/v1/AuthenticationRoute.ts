import express, { Router } from 'express';
import { AuthenticationController } from './../../Controller/AuthenticationController';

export class AuthenticationRoute {

    _router: Router = express.Router();
    _controller: AuthenticationController;

    constructor() {
        this._controller = new AuthenticationController();
    }

    login () {
        if (this._router) {
            this._router.post('/login', this._controller.login);
        }
        return this._router;
    }

}