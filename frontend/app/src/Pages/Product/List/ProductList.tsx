import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductListInterface } from "./interface";
import { Header } from "../../../Components/Header";
import { Table } from "../../../Components/Table";
import { Title } from "../../../Components/Title";
import { ProductService } from "../../../Services/Product/ProductService";
import { addListProduct, deleteProduct, setCountProduct, setErrorProduct, setProductSelected, setProductUnselected } from "../../../App/Features/Product/ProductSlice";
import { ProductStateInterface } from "../../../App/Features/Product/interface";
import React from "react";
import { Modal } from "../../../Components/Modal";

const HeaderList: string[] = ['Title', 'Description', 'Prix', 'Action']

export const ProductListPage: FC<ProductListInterface> = () => {

    const dispatch = useDispatch();
    const { items, count, delete: productToDeleted } = useSelector(({ product }: {
        product: ProductStateInterface
    }) => {
        return product;
    });

    const handleFetchProduct = async () => {
        const productService = new ProductService();
        const products = await productService.list({
            skip: 0,
            take: 12
        });
        dispatch(addListProduct(products.data));
        dispatch(setCountProduct(products.count));
    }

    useEffect(() => {
        handleFetchProduct();
    }, []);

    

    const handleDelete = (id: number) => {
        dispatch(setProductSelected({
            id,
            action: 'DELETE'
        }));
    };

    const handleConfirmDelete = async () => {
        if(productToDeleted?.id) {
            const productService = new ProductService();
            const deleteService = await productService.delete(productToDeleted?.id);
            if(deleteService.isSuccess) {
                dispatch(deleteProduct({
                    id: productToDeleted.id
                }));
                dispatch(setProductUnselected());
                handleFetchProduct();
            }
            if(!deleteService.isSuccess) {
                dispatch(setErrorProduct(deleteService.message));
            }
        }
    };

    const handleCloseModal = () => {
        dispatch(setProductUnselected());
    };

    const handleUpdate = (id: number) => {
       window.location.href= `/product/update/${id}`;
    };

    const LIST = React.useMemo(() => {
        return items.map((item)=> {
            return {
                name: item.title,
                description: item.description,
                price: item.price,
                id: item.id
            }
        });
    }, [items]);

    return <>
        <Header />
        <div className="px-2">
            <Title title="Liste de vos produits" subtitle="Consultez et gérez les niveaux de stock de vos produits." cta={{ link: "/product/add", title: "Ajouter" }} />
            <div className="py-4">
                <Table 
                    headerList={HeaderList} 
                    items={LIST}
                    count={count}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            </div>
        </div>
        <Modal 
            textCancel="Annuler"
            textConfirm="Confirmer"
            title="Voulez-vous supprimer ce produit"
            open={!!productToDeleted?.open}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
        />
    </>
}