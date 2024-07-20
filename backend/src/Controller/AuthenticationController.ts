import { Request, Response } from 'express';

export class AuthenticationController {
    async login(req: Request, res: Response) {
        res.send({
            token: 'fkdjfdsjkdsjcoicnfcudiofjdkjfskdjfsdkf'
        });
    }
}