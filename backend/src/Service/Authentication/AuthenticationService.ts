import { Response } from 'express'
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { dataSource } from "./../../Config/database";
import { LoginInputInterface, MeInputInterface, RegisterInputInterface } from "./interface";
import { User } from "./../../Model/User";

dotenv.config();

export class AuthenticationService {
    async login(input: LoginInputInterface, res: Response) {
        const secretKey = process.env.JWT_SECRET_KEY || '';
        const userRepository = dataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email: input.email });

        if (!user) {
            return res.status(401).json({
                message: 'Utilisateur introuvable'
            })
        }

        const isPasswordValid = await bcrypt.compare(input.password, user.password);

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

    async register(input: RegisterInputInterface, res: Response) {
        const secretKey = process.env.JWT_SECRET_KEY || '';
        const userRepository = dataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email: input.email });

        if(user) {
            return res.status(400).json({
                message: 'Email deja pris.'
            });
        }

        const hash = await bcrypt.hash(input.password, 10);

        const newUser = new User();

        newUser.email = input.email;
        newUser.password = hash;

        await userRepository.save(newUser);

        const token = jwt.sign({ id: newUser.id, username: newUser.email }, secretKey, {
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