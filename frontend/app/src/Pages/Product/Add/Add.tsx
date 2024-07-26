import { FC, useEffect } from "react";
import { ProductFormPageInterface } from "./interface";
import { Title } from "../../../Components/Title";
import { ProductForm } from "../../../Components/ProductForm";
import { Header } from "../../../Components/Header";
import { useParams } from "react-router";
import { ProductService } from "../../../Services/Product/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { ProductStateInterface } from "../../../App/Features/Product/interface";
import { setProductSelected } from "../../../App/Features/Product/ProductSlice";

export const ProductFormPage: FC<ProductFormPageInterface> = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { item } = useSelector(({ product }: {
        product: ProductStateInterface
    }) => {
        return product;
    });

    useEffect(() => {
        const handleGetProduct = async () => {
            if(id) {
                const productService = new ProductService();
                const product = await productService.getProduct(parseInt(id));
                if(product.isSuccess) {
                    dispatch(setProductSelected({
                        id: product.data.id,
                        item: product.data,
                        action: 'UPDATE'
                    }));
                }
                if(!product.isSuccess) {
                    window.location.href = '/product/create'
                }

            }
        };

        handleGetProduct();
        
    }, [id]);

    return <>
        <Header />
        <div className="flex flex-col items-center justify-center h-screen">
            <Title title={id ? "Modifier le produit" : "Ajouter un produit"} />
            <ProductForm item={item} />
        </div>
    </>
}