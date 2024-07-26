import { ChangeEvent, FC, useEffect, useState } from "react";
import { SearchInterface } from "./interface";
import useDebounce from "./useDebounce";

export const SearchForm: FC<SearchInterface> = (props) => {

    const [input, setInput] = useState<string>(props.value ?? '');
    const debouncedTerm = useDebounce(input, 500);

    useEffect(() => {
        if (debouncedTerm !== props.value) {
          props.onSearch(debouncedTerm);
        }
      }, [debouncedTerm]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setInput(e.target.value);
    };

    return  <form className="w-full max-w-md sm:w-auto sm:max-w-none">
                <div className="flex items-center border-b border-gray-300 py-2">
                    <input value={input} onChange={handleChange} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Rechercher..." aria-label="Search" />
                    <button className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                        Rechercher
                    </button>
                </div>
            </form>
}