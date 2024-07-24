import { ChangeEvent, FC, FormEvent, useState } from "react";
import { ProductFormInterface, ProductInputInterface } from "./interface";
import { ProductService } from "../../Services/Product/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, setErrorProduct, setSuccessProduct } from "../../App/Features/Product/ProductSlice";
import { ProductStateInterface } from "../../App/Features/Product/interface";

const DEFAULT_INPUT: ProductInputInterface = {
    name: '',
    price: 0,
    description: ''
}

export const ProductForm: FC<ProductFormInterface> = () => {

    const [input, setInput] = useState<ProductInputInterface>(DEFAULT_INPUT);

    const dispatch = useDispatch();
    const { error, success } = useSelector(({ product }: {
        product: ProductStateInterface
    }) => {
        return product;
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.stopPropagation();
        setInput((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const productService = new ProductService();
        const submitCreateProduct = await productService.add({...input, price: Number(input.price)});
        if(submitCreateProduct.success) {
            console.log(submitCreateProduct)
            dispatch(addProduct({
                name: submitCreateProduct.data.title,
                price: submitCreateProduct.data.price,
                description: submitCreateProduct.data.description
            }));
            dispatch(setSuccessProduct(submitCreateProduct.message));
            setInput(DEFAULT_INPUT)
        }
        if(!submitCreateProduct.success) {
            dispatch(setErrorProduct(submitCreateProduct.message));
        }
    };

    return <>
        
        <div className="flex items-center justify-center">
            <div className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {error && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Erreur! </span>{error}
                    </div>
                )}
                {success && (
                    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <span className="font-medium">Success!</span> {success}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto w-[320px]">
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Nom du produit" 
                            required 
                            name="name"
                            onChange={handleChange}
                            value={input.name}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prix</label>
                        <input 
                            type="number" 
                            min={0} 
                            id="price" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required
                            name="price"
                            onChange={handleChange}
                            value={input.price}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea 
                            id="descritption" 
                            rows={4} 
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Description du produit"
                            name="description"
                            onChange={handleChange}
                            value={input.description}
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    </>
}