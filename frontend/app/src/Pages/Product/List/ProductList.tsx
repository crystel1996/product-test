import { FC, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ProductFilterInterface, ProductListInterface } from "./interface";
import { Header } from "../../../Components/Header";
import { Table } from "../../../Components/Table";
import { Title } from "../../../Components/Title";
import { ProductService } from "../../../Services/Product/ProductService";
import { addListProduct, deleteProduct, setCountProduct, setErrorProduct, setProductSelected, setProductUnselected, setSuccessProduct } from "../../../App/Features/Product/ProductSlice";
import { ProductStateInterface } from "../../../App/Features/Product/interface";
import { Modal } from "../../../Components/Modal";
import { SearchForm } from "../../../Components/SearchForm";

const HeaderList: string[] = ['Title', 'Description', 'Prix', 'Action']

export const ProductListPage: FC<ProductListInterface> = () => {

    const dispatch = useDispatch();
    const { items, count, delete: productToDeleted, error, success } = useSelector(({ product }: {
        product: ProductStateInterface
    }) => {
        return product;
    });

    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);

    const handleFetchProduct = async (filter: ProductFilterInterface) => {
        const productService = new ProductService();
        const products = await productService.list({
            skip: filter.skip ? parseInt(filter.skip) : 0,
            take: filter.take ? parseInt(filter.take) : 12,
            title: filter.title ?? '',
            minPrice: filter.minPrice ? parseInt(filter.minPrice) : undefined,
            maxPrice: filter.maxPrice ? parseInt(filter.maxPrice) : undefined,
        });
        dispatch(addListProduct(products.data));
        dispatch(setCountProduct(products.count));
    }

    const { title, skip, take, minPrice, maxPrice } = useMemo(() => {
        return {
            title: queryParams.get('q'),
            skip: queryParams.get('skip'),
            take: queryParams.get('take'),
            minPrice: queryParams.get('minPrice'),
            maxPrice: queryParams.get('maxPrice')
        }
    }, [queryParams]);

    useEffect(() => {
        handleFetchProduct({
            title, skip, take, minPrice, maxPrice
        });
    }, [title, skip, take, minPrice, maxPrice]);

    const handleSearch = (search: string) => {
        window.location.href = `/product/list?q=${search}`;
    };

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
                dispatch(setSuccessProduct(deleteService.message));
                handleFetchProduct({
                    title,
                    skip,
                    take,
                    minPrice,
                    maxPrice 
                });
            }
            if(!deleteService.isSuccess) {
                dispatch(setErrorProduct(deleteService.message));
            }
        }
    };

    const handleCloseModal = () => {
        dispatch(setProductUnselected());
        dispatch(setErrorProduct(''));
        dispatch(setSuccessProduct(''));
    };

    const handleUpdate = (id: number) => {
       window.location.href= `/product/update/${id}`;
    };

    const LIST = useMemo(() => {
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
            <div className="flex justify-end p-4">
                <SearchForm onSearch={handleSearch} value={title}/>
            </div>
            <div className="py-4">
                <Table 
                    headerList={HeaderList} 
                    items={LIST}
                    count={count}
                    skip={skip ? parseInt(skip) : 0}
                    take={take ? parseInt(take) : 12}
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
            alertMessage={error  || success || undefined}
        />
    </>
}