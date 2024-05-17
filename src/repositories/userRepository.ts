import dotenv from 'dotenv';
import { IResponseBody } from "../interfaces/IResponseBody";
import IUser from "../models/userModel";
import { prisma } from "../services/prisma-client";
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
dotenv.config();

const salt = process.env.BCRYPT_SALT as string;

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
            console.log('chegou aqui')
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

export const criarJWT = async (email: string, password: string): Promise<IResponseBody> => {
    try{
        const findUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if(!findUser || !bcrypt.compareSync(bcrypt.hashSync(password, salt!), findUser.password)) {
            console.log(salt)
            console.log(password)
            console.log(bcrypt.hashSync(password, salt))
            console.log(findUser?.password)
            console.log(bcrypt.compareSync(bcrypt.hashSync(password, salt!), findUser!.password))
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
            message: "success",
            data: token,
        }


        
    }catch(e){
        throw new Error('Não foi possível realizar a autenticação');
    }
}