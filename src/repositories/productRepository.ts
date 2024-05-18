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

export const alterarProduto = async (id: number, product: IProduct): Promise<IResponseBody> => {
    try{

        const findProduct = prisma.product.findUnique({
            where: {
                id: id
            }
        })
        
        if(!findProduct){
            return {
                error: true,
                message: 'Produto não encontrado!'
            }
        }
        
        await prisma.product.update({
            where: {
                id: id
            },
            data: {
                name: product.name,
                description: product.description,
                image: product.image,
                value: product.value,
                quantity: product.quantity
            }
        })

        return {
            error: false,
            message: "Produto atualizado com sucesso!"
        }
    }catch(e){
        throw new Error(e as string)
    }
}

export const obterProduto = async (id: number): Promise<IResponseBody> => {
    try{
        const findProduct = await prisma.product.findUnique({
            where:{
                id:id
            }
        })

        if(!findProduct){
            return {
                error: true,
                message: "Produto não encontrado"
            }
        }

        return {
            error: false,
            message: "Produto localizado!",
            data: findProduct,
        }
    }catch(e){
        throw new Error(e as string);
    }
}