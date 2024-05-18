import { Request, Response } from "express";
import IProduct from "../models/productModel";
import { criarProduto, alterarProduto, obterProduto } from "../repositories/productRepository";

export const cadastrarProduto = async (req: Request, res: Response) => {
    try{
        const product: IProduct = req.body;
        res.json(await criarProduto(product));        
    } catch(e){
        console.log(e);
        res.status(400).json({
            error: true,
            message: "erro ao cadastrar produto!",
        })
    }
}

export const atualizarProduto = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const product: IProduct = req.body;
        res.json(await alterarProduto(id, product)); 
    }catch(e){
        res.status(400).json({
            error: true,
            message: "erro ao alterar produto",
        })
    }
}

export const lerProduto = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        res.json(await obterProduto(id)); 
    }catch(e){
        res.status(400).json({
            error: true,
            message: e,
        })
    }
}
