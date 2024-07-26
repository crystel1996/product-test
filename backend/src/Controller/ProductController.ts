import { Request, Response } from 'express';
import { ProductService } from './../Service/Product/ProductService';
import { ProductValidation } from "./../Validation/Product/ProductValidation";

export class ProductController {
    async create(req: Request, res: Response) {

        const { title, price, description } = req.body;

        const productValidation = new ProductValidation({
            title,
            price,
            description
        });

        const checkValidation = productValidation.createValidation();
     
        if (!checkValidation?.isValid) {
            return res.status(400).json({message: checkValidation.message});
        }

        const productService =new ProductService();

        const result = await productService.create({
            title,
            price,
            description
        }, res);

        return result;

    }

    async update(req: Request, res: Response) {

        const { title, price, description, id } = req.body;

        const productValidation = new ProductValidation({
            title,
            price,
            description
        });

        const checkValidation = await productValidation.updateValidation(id);
        
        if (!checkValidation?.isValid) {
            return res.status(400).json({message: checkValidation.message});
        }

        const productService =new ProductService();

        const result = await productService.update({
            title,
            price,
            description,
            id
        }, checkValidation.data as any, res);

        return result;

    }

    async delete (req: Request, res: Response) {
        const { id } = req.body;

        const productService =new ProductService();

        const result = await productService.delete(id, res);

        return result;

    }

    async list(req: Request, res: Response) {
       
        const title = req.body.title as string;
        const minPrice = req.body.minPrice ? parseInt(req.query.minPrice as string) : undefined
        const maxPrice = req.body.maxPrice ? parseInt(req.query.maxPrice as string) : undefined;
        const skip = req.body.skip ? parseInt(req.query.skip as string) : 0;
        const take = req.body.take ? parseInt(req.query.take as string) : 12;

        const productService = new ProductService();

        const result = await productService.list({
            title,
            take,
            skip,
            minPrice,
            maxPrice
        }, res);

        return result;

    }

    async product(req: Request, res: Response) {
        const { id } = req.body;

        const productService = new ProductService();

        const result = await productService.product(id, res);

        return result;


    }

}