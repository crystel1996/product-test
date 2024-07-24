import axios from "axios";
import { ProductAddInputInterface } from "./interface";
import { GetCookies } from "../Session/Cookies";

export class ProductService {

    isValidProduct(input: ProductAddInputInterface) {
        if(!input.name) {
            return {
                isValid: false,
                message: "Veuillez inserer le nom."
            }
        }
     
        if (!(typeof input.price === 'number' && !isNaN(input.price))) {

            return {
                isValid: false,
                message: "Veuillez ajouter un nombre."
            }
        }

        if(input.price < 0) {
            return {
                isValid: false,
                message: "Veuillez ajouter un prix positif."
            }
        }

        if(!input.description) {
            return {
                isValid: false,
                message: "Veuillez inserer la description."
            }
        }

        return {
            isValid: true,
            message: ''
        }
    }

    async add (input: ProductAddInputInterface) {

        const checkValidation = this.isValidProduct(input);
        console.log(checkValidation)
        if(checkValidation?.isValid) {
            return axios({
                url: `${process.env.REACT_APP_API_URL}/api/product/create`,
                method: 'post',
                data: {
                    title: input.name,
                    price: input.price,
                    description: input.description
                },
                headers: {
                    Authorization: `Bearer ${GetCookies('accessToken')}`
                }
            }).then((result) => {
             
                return {
                    success: true,
                    message: "Produit ajouté.",
                    data: result.data
                }
            }).catch((error) => {
                console.log('[ERROR]', error.response.data);
                return {
                    success: false,
                    message: error.response.data?.message,
                    data: undefined
                }
            });
        }
        return {
            success: false,
            message: checkValidation.message,
            data: undefined
        }
    }

}