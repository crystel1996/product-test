import { Response } from "express";
import { ProductCreateInputInterface, ProductListInputInterface, ProductUpdateInputInterface } from "./interface";
import { Product } from "./../../Model/Product";
import { dataSource } from "./../../Config/database";
import { Between, FindOptionsWhere, ILike, LessThan, MoreThan } from "typeorm";

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
    async list(input: ProductListInputInterface, res: Response) {
        const productRepository = dataSource.getRepository(Product);

        let where: FindOptionsWhere<Product> | FindOptionsWhere<Product>[] = {};

        if(input.title) {
            where = {
                ...where,
                title: ILike(`%${input.title}%`)
            }
        }

        if (input.minPrice && input.maxPrice) {
            const minPrice = Math.min(input.minPrice, input.maxPrice);
            const maxPrice = Math.max(input.minPrice, input.maxPrice);
            where = {
                ...where,
                price: Between(minPrice,maxPrice)
            }
        }

        if (input.minPrice) {
            where = {
                ...where,
                price: MoreThan(input.minPrice)
            }
        }

        if (input.maxPrice) {
            where = {
                ...where,
                price: LessThan(input.maxPrice)
            }
        }

        const condition = {
            where: {
                ...where
            },
            skip: input.skip || 0,
            take: input.take || 12
        };

        const resultPromise =  productRepository.find(condition);

        const countPromise =  productRepository.count(condition);

        const [result, count] = await Promise.all([
            await resultPromise,
            await countPromise
        ]);

        return res.status(200).json({
            "data": result,
            "count": count
        });
    }

    async product(id: number, res: Response) {
        const productRepository = dataSource.getRepository(Product);

        const product = await productRepository.findOne({
            where: {
                id
            }
        });

        if(!product) {
            return res.status(400).json({
                message: "Produit introuvable."
            });
        }

        return res.status(200).json(product);

    }

}