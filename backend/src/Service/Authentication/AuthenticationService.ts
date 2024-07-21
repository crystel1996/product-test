import { Response } from 'express'
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { dataSource } from "./../../Config/database";
import { LoginInputInterface, MeInputInterface } from "./interface";
import { User } from "./../../Model/User";

dotenv.config();

export class AuthenticationService {
    async login(input: LoginInputInterface, res: Response) {
        const secretKey = process.env.JWT_SECRET_KEY || '';
        const userRepository = dataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email: input.email });

        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            })
        }

        const isPasswordValid = bcrypt.compareSync(input.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Mot de passe incorrecte'
            });
        }

        const token = jwt.sign({ id: user.id, username: user.email }, secretKey, {
            expiresIn: process.env.JWT_LIFETIME,
        });

        return res.status(200).json({
            token
        });

    }

    async me (input: MeInputInterface, res: Response) {
        
        if (!input.accessToken) {
            return res.status(401).json({ message: "Token manquant" });
        }
        
        try {
            const decoded = jwt.verify(input.accessToken, process.env.JWT_SECRET_KEY || '');
            return res.status(200).json(decoded)
        } catch (error) {
            return res.status(401).json({ message: "Token invalide ou expiré" });
        }
          
    }

}