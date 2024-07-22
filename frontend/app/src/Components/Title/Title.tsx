import { FC } from "react";
import { TitleComponentInterface } from "./interface";

export const Title: FC<TitleComponentInterface> = (props) => {
    return  <div className="text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{props.title}</h1>
        
        {props.subtitle && (
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{props.subtitle}</p>
        )}
        {props.cta && (
            <a href={props.cta.link} className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {props.cta.title}
            </a>
        )}
    </div>
}