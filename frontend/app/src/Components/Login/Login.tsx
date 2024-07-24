import { ChangeEvent, FC, useState, FormEvent } from "react";
import { LoginComponentInterface } from "./interface";
import { LoginInputInterface } from "../../Services/Login/interface";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginRequest, LoginStateInterface, loginSuccess } from "../../App/Features/Login";
import { LoginService } from "../../Services/Login/Login";

const DEFAULT_INPUT: LoginInputInterface = {
    email: '',
    password: ''
}

export const Login: FC<LoginComponentInterface> = () => {
    const [input, setInput] = useState<LoginInputInterface>(DEFAULT_INPUT);
    const dispatch = useDispatch();
    const { error } = useSelector(({ login }: {
        login: LoginStateInterface
    }) => {
        return login;
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        dispatch(loginRequest());
        const loginService = new LoginService(input);
        const submitLogin = await loginService.submit();
        if(submitLogin.success) {
            dispatch(loginSuccess({
                accessToken: submitLogin.data
            }));
            window.location.href = '/'
        }
        if(!submitLogin.success) {
            dispatch(loginFailure({
                message: submitLogin.message
            }));
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
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto w-[320px]">
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                        <input 
                            type="email" 
                            id="email" 
                            onChange={handleChange}
                            value={input.email}
                            name="email" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="your@email.com" 
                            required 
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre mot de passe</label>
                        <input 
                            type="password" 
                            id="password" 
                            onChange={handleChange} 
                            value={input.password}
                            name="password" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required 
                        />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Connecter</button>
                </form>
            </div>
        </div>
    </>
}