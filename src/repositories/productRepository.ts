import dotenv from 'dotenv';
import { IResponseBody } from "../interfaces/IResponseBody";
import IProduct from "../models/productModel";
import { prisma } from "../services/prisma-client";
dotenv.config();


export const criarProduto= async (product: IProduct): Promise<IResponseBody> => {
        try{
            await prisma.product.create({
                data: product
            })

            return {
                error: false,
                message: 'Produto cadastrado com sucesso!',
            }
            
        }catch(e){
            throw new Error(e as string);
        }
    }
