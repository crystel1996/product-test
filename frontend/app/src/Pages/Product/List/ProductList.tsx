import { FC } from "react";
import { ProductListInterface } from "./interface";
import { Header } from "../../../Components/Header";
import { Table } from "../../../Components/Table";
import { Title } from "../../../Components/Title";

const HeaderList: string[] = ['Title', 'Description', 'Prix', 'Action']

export const ProductListPage: FC<ProductListInterface> = () => {
    return <>
        <Header />
        <div className="px-2">
            <Title title="Liste de vos produits" subtitle="Consultez et gérez les niveaux de stock de vos produits." cta={{ link: "/product/add", title: "Ajouter" }} />
            <div className="py-4">
                <Table headerList={HeaderList} />
            </div>
        </div>
    </>
}