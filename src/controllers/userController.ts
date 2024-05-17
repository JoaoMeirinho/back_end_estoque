import { prisma } from "../services/prisma-client";
import { Request, Response } from "express";
import IUser from "../models/userModel";
import { error } from "console";
import { criarJWT, criarUsuario } from "../repositories/userRepository";

export const cadastrarUsuario = async (req: Request, res: Response) => {
    try{
        const user: IUser = req.body;
        res.json(await criarUsuario(user));        
    } catch(e){
        res.status(400).json({
            error: true,
            message: e,
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const user: IUser = req.body;
        res.json(await criarJWT(user)); 
    }catch(e){
        res.status(400).json({
            error: true,
            message: e,
        })
    }
}
