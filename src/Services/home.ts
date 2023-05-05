import axios from "axios";
import { IResponseHome } from "./Interface/home";

export async function ResumenHomeService() {
    return await axios.get<IResponseHome>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/home`);
}

