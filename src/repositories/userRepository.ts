import dotenv from 'dotenv';
import { IResponseBody } from "../interfaces/IResponseBody";
import IUser from "../models/userModel";
import { prisma } from "../services/prisma-client";
import bcrypt from 'bcrypt';

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
