import axios from "axios";
import { IResponseLogin } from "./Interface/login";
import { LoginProps } from "../Pages/Login/login";

export async function LoginService({ password, usuario }: LoginProps) {
    return await axios.post<IResponseLogin>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/auth/login`, { password, usuario });
}