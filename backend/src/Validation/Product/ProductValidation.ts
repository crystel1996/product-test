import { dataSource } from "./../../Config/database";
import { ProductValidationInputInterface } from "./interface";
import { Product } from "./../../Model/Product";

export class ProductValidation {

    _input: ProductValidationInputInterface | undefined;

    constructor(input: ProductValidationInputInterface) {
        this._input = input;
    }

    createValidation() {

        if(!this._input?.title) {
            return {
                isValid: false,
                message: 'Veuillez ajouter le titre.'
            }
        }

        if (!(typeof this._input.price === 'number' && !isNaN(this._input.price))) {

            return {
                isValid: false,
                message: "Veuillez ajouter un nombre."
            }
        }

        if(this._input.price < 0) {
            return {
                isValid: false,
                message: "Veuillez ajouter un nombre positif."
            }
        }

        if(typeof this._input?.price !== 'number') {
            if(this._input?.price < 0) {
                return {
                    isValid: false,
                    message: 'Veuillez ajouter un nombre positif.'
                }
            }
            return {
                isValid: false,
                message: 'Veuillez ajouter le bon prix.'
            }
        }

        if(!this._input?.description) {
            return {
                isValid: false,
                message: 'Veuillez ajouter la description.'
            }
        }

        return {
            isValid: true,
            message: ''
        }

    }

    async updateValidation(id: number) {
        const productRepository = dataSource.getRepository(Product);
        if (!id) {
            return {
                isValid: false,
                message: 'Produit inconnue.',
                data: undefined
            }
        }

        const product = await productRepository.findOne({
            where: {
                id: id
            }
        });

        if(!product) {
            return {
                isValid:  false,
                message: 'Produit inconnue.',
                data: undefined
            }
        }

        const checkCreateValidation = this.createValidation();

        return {...checkCreateValidation, data: product};
    }

}