import axios from "axios";
import { responseAutenticacionDto } from "./Interface/authenticacion";
import { AxiosRequest } from "../Utils/Axios";
//llamada a interceptor
AxiosRequest();
export async function Authenticacion() {
    return await axios.get<responseAutenticacionDto>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/auth`);
}