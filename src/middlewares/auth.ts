import { Request, Response, NextFunction } from "express";
import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken";
import { prisma } from "../services/prisma-client";
import { error } from "console";

interface CustomRequest extends Request{
    user: string | JwtPayload;
}
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.header('Authorization')?.replace('Bearer ','');
        if(!token) {
            throw new Error('Falha na autenticação. O token está faltando.');
        }

        const decoded = jwt.verify(token, process.env.SECRET as string);
        
        (req as CustomRequest).user = decoded; 

        next()

    }catch(e){
        res.status(401).json({
            error: true,
            message: e,
        })
    }
}
