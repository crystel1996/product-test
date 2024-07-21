import { NextFunction, Request, Response } from 'express';
import { AuthenticationService } from './..//Service/Authentication/AuthenticationService';

export class AuthenticationController {
    async login(req: Request, res: Response) {

        const { email, password } = req.body;

        const authService = new AuthenticationService();

        const token = await authService.login({
            email,
            password
        }, res);

        return res.send({
            token
        });
    }

    async me(req: Request, res: Response) {
        const { accessToken } = req.body;
        const authService = new AuthenticationService();
        const checkMe = await authService.me({
            accessToken
        }, res);

        return checkMe;

    }

}