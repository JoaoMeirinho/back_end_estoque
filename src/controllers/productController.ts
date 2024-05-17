import { Request, Response } from "express";
import IProduct from "../models/productModel";
import { criarProduto } from "../repositories/productRepository";

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

// export const atualizarProduto = async (req: Request, res: Response) => {
//     try{
//         const {email, password} = req.body;
//         res.json(await criarJWT(email, password)); 
//     }catch(e){
//         res.status(400).json({
//             error: true,
//             message: "erro ao fazer login",
//         })
//     }
// }
