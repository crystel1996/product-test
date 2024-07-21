import { Response } from "express";
import { ProductCreateInputInterface, ProductUpdateInputInterface } from "./interface";
import { Product } from "./../../Model/Product";
import { dataSource } from "./../../Config/database";

export class ProductService {
    async create(input: ProductCreateInputInterface, res: Response) {
        try {
            const product = new Product();
            product.title = input.title;
            product.description = input.description;
            product.price = input.price;

            const productRepository = dataSource.getRepository(Product);
            
            await productRepository.save(product);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(res.statusCode).json(error)
        }
    }
    async update(input: ProductUpdateInputInterface, product: Product, res: Response) {
        try {

            const productRepository = dataSource.getRepository(Product);

            product.title = input.title;
            product.description = input.description;
            product.price = input.price;
            
            await productRepository.save(product);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(res.statusCode).json(error)
        }
    }

    async delete(id: number, res: Response) {
        try {

            const productRepository = dataSource.getRepository(Product);

            const product = await productRepository.findOne({
                where: {
                    id: id
                }
            });

            if(!product) {
                return res.status(400).json({
                    message: 'Produit introuvable.'
                })
            }
            
            await productRepository.remove(product);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(res.statusCode).json(error)
        }
    }
}