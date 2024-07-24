import axios from "axios";
import { isEmailValid } from "../../Validation/EmailValidation";
import { LoginInputInterface } from "./interface";
import { SetCookies } from "../Session/Cookies";

export class LoginService {
    _input: LoginInputInterface | undefined;

    constructor(input: LoginInputInterface) {
        this._input = input;
    }

    isValid() {
        if (!isEmailValid(this._input?.email)) {
            return {
                isValid: false,
                message: "Veuillez inserer un email"
            }
        }
        if (!this._input?.password) {
            return {
                isValid: false,
                message: "Veuillez inserer le mot de passe"
            }
        }
        return {
            isValid: true,
            message: ''
        }
    }

    async ubmit() {
        const checkValidation = this.isValid();
        if(checkValidation.isValid) {
            return axios({
                method: 'post',
                url: `{${process.env.REACT_APP_API_URL}}`,
                data: {
                    email: this._input?.email,
                    password: this._input?.password
                }
            }).then((result) => {
                SetCookies('accessToken', result.data.accessToken);
                return {
                    message: "Connexion reussi."
                }
            })
        }

        return {
            message: checkValidation.isValid
        }
    }
}