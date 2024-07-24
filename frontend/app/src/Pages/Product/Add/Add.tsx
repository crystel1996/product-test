import { FC } from "react";
import { ProductFormPageInterface } from "./interface";
import { Title } from "../../../Components/Title";
import { ProductForm } from "../../../Components/ProductForm";
import { Header } from "../../../Components/Header";

export const ProductFormPage: FC<ProductFormPageInterface> = () => {
    return <>
        <Header />
        <div className="flex flex-col items-center justify-center h-screen">
            <Title title="Ajout produit" />
            <ProductForm />
        </div>
    </>
}