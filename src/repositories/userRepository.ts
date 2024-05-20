import dotenv from 'dotenv';
import { IResponseBody } from "../interfaces/IResponseBody";
import IUser from "../models/userModel";
import { prisma } from "../services/prisma-client";
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
dotenv.config();

const salt = Number(process.env.BCRYPT_SALT);

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
            const hash = await bcrypt.hash(user.password, salt)
            user.password = hash;
            await prisma.user.create({
                data: user
            })

            return {
                error: false,
                message: 'Usuário cadastrado com sucesso!',
            }
            
        }catch(e){
            throw new Error(e as string);
        }
    }

export const criarJWT = async (email: string, password: string): Promise<IResponseBody> => {
    try{
        const findUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if(!findUser || !bcrypt.compareSync(password, findUser.password)) {
            return {
                error: true,
                message: "Email ou senha incorretos"
            }
        }
        
        const token = sign({
            email: findUser.email,
            name: findUser.name,
        }, process.env.SECRET!, {
            expiresIn: "1d",
        })

        return {
            error: false,
            message: "success",
            data: token,
        }


        
    }catch(e){
        throw new Error('Não foi possível realizar a autenticação');
    }
}