import dotenv from 'dotenv';
import { IResponseBody } from "../interfaces/IResponseBody";
import IUser from "../models/userModel";
import { prisma } from "../services/prisma-client";
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

const salt = process.env.BCRYPT_SALT;

export const criarUsuario = async (user: IUser): Promise<IResponseBody> => {
        try{
            const findUser = await prisma.user.findUnique({
                where: {
                    email: user.email,
                },
            })
            

            if( findUser ) {
                return {
                    error: true,
                    message: 'Usuário Já cadastrado',
                }
            }

            user.password = bcrypt.hashSync(user.password, salt!)
            await prisma.user.create({
                data: user
            })

            return {
                error: false,
                message: 'Usuário cadastrado com sucesso!',
            }
            
        }catch(e){
            throw new Error("Não foi possível cadastrar o usuário");
        }
    }

export const criarJWT = async (user: IUser): Promise<IResponseBody> => {
    try{
        const findUser = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        })

        if(!findUser || !bcrypt.compareSync(findUser.password, user.password)) {
            return {
                error: true,
                message: "Email ou senha incorretos"
            }
        }
        
        const token = sign({
            id: findUser.id,
            email: findUser.email,
            name: findUser.name,
            password: findUser.password,
        }, process.env.SECRET!, {
            expiresIn: "1d",
        })

        return {
            error: false,
            data: token,
        }


        
    }catch(e){
        throw new Error('Não foi possível realizar a autenticação');
    }
}