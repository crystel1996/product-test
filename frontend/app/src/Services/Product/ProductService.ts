import axios from "axios";
import { ProductAddInputInterface, ProductListInputInterface } from "./interface";
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

    async update(input: ProductAddInputInterface) {
        const checkValidation = this.isValidProduct(input);
        
        if(checkValidation?.isValid) {
            return axios({
                url: `${process.env.REACT_APP_API_URL}/api/product/update`,
                method: 'post',
                data: {
                    id: input.id,
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
                    message: "Produit modifié.",
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

    async delete(id: number) {
        return axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/product/delete`,
            data: {
                id
            },
            headers: {
                Authorization: `Bearer ${GetCookies('accessToken')}`
            }
        }).then((result) => {
            return {
                isSuccess: true,
                data: result.data,
                message: "Produit supprimé"
            }
        }).catch((error) => {
            return {
                isSuccess: false,
                data: undefined,
                message: error.response.data.message
            }
        })
    }

    async list(input: ProductListInputInterface) {
        return axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/product/list`,
            data: input,
            headers: {
                Authorization: `Bearer ${GetCookies('accessToken')}`
            }
        }).then((result) => {
            return {
                data: result.data.data,
                count: result.data.count
            }
        }).catch((error) => {
            console.log('[ERROR]', error)
            return {
                data: [],
                count: 0
            }
        });
    }

    async getProduct(id: number) {
        return axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/product/product`,
            data: {
                id
            },
            headers: {
                Authorization: `Bearer ${GetCookies('accessToken')}`
            }
        }).then((result) => {
            return {
                data: result.data,
                isSuccess: true,
                message: ''
            }
        }).catch((error) => {
            console.log('[ERROR]', error)
            return {
                data: undefined,
                message: error.response.data.message,
                isSuccess: false,
            }
        });
    }

}