import { FC, MouseEvent } from "react";
import { TableComponentInterface } from "./interface";
import { useLocation, useNavigate } from "react-router-dom";

export const Table: FC<TableComponentInterface> = (props) => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleUpdate = (event: MouseEvent<HTMLElement>, id: number) => {
        event.stopPropagation();
        props.onUpdate(id)
    };

    const handleDelete = (event: MouseEvent<HTMLElement>, id: number) => {
        event.stopPropagation();
        props.onDelete(id)
    };

    const handlePrevious = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const searchParams = new URLSearchParams(location.search);
        const skip = (props.skip ?? 0) - 12;
        searchParams.set('skip', `${skip < 1 ? 0 : skip}`);
        const newUrl = `${location.pathname}?${searchParams.toString()}`;
        navigate(newUrl);
    };

    const handleNext = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const searchParams = new URLSearchParams(location.search);
        const skip = (props.skip ?? 0) + 12;
        searchParams.set('skip', `${skip}`);
        const newUrl = `${location.pathname}?${searchParams.toString()}`;
        navigate(newUrl);
    };

    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {props.headerList.map((header) => {
                    return  <th key={header} scope="col" className="px-6 py-3">
                                {header}
                            </th>
                })}
            </tr>
        </thead>
        <tbody>
            {props.items.map((item, index) => {
                return  <tr key={`${index}-table`}className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.name}
                            </th>
                            <td className="px-6 py-4">
                                {item.description}
                            </td>
                            <td className="px-6 py-4">
                                $ {item.price}
                            </td>
                            <td className="px-6 py-4">
                                <a href="javascript:void(0)" onClick={(e) => handleUpdate(e, item.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                <a href="javascript:void(0)" onClick={(e) => handleDelete(e, item.id)} className="px-1 font-medium text-red-600 dark:text-blue-500 hover:underline">Supprimer</a>
                            </td>
                        </tr>
            })}
        </tbody>
    </table>
    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Afficher <span className="font-semibold text-gray-900 dark:text-white">{props.skip ?? 1}-{props.take ?? props.count}</span> sur <span className="font-semibold text-gray-900 dark:text-white">{props.count}</span></span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                {((props.skip || 0) <  1 || (props.skip || 0) === 0)  && (
                    <span className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Precedent</span>
                )}
                {(props.skip || 0) > 1 && (
                    <a href="javascript:void(0)" onClick={handlePrevious} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Precedent</a>
                )}
                
            </li>
            <li>
                {(props.count < 12 || props.items.length < 12) && (
                    <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Suivant</span>
                )}
                {(props.count > 12 || props.items.length > props.count) && (
                    <a href="javascript:void(0)" onClick={handleNext} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Suivant</a>
                )}
            </li>
        </ul>
    </nav>
</div>
}