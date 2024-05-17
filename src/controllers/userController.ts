import { prisma } from "../services/prisma-client";
import { Request, Response } from "express";
import IUser from "../models/userModel";
import { error } from "console";
import { criarUsuario, criarJWT } from "../repositories/userRepository";

export const cadastrarUsuario = async (req: Request, res: Response) => {
    try{
        const user: IUser = req.body;
        res.json(await criarUsuario(user));        
    } catch(e){
        console.log(e);
        res.status(400).json({
            error: true,
            message: "erro ao cadastrar usuário",
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        res.json(await criarJWT(email, password)); 
    }catch(e){
        res.status(400).json({
            error: true,
            message: "erro ao fazer login",
        })
    }
}
