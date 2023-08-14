import axios from "axios";
import { IPregunta } from "./Interface/pregunta";
import { IResponse } from "./Interface/response";
import { IPlantilla } from "./Interface/plantilla";

export async function listPregunta() {
    return await axios.get<IResponse<IPlantilla[]>>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/test`);
}
export async function storePregunta(values?: IPlantilla) {
    return await axios.post<IResponse<null>>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/test`, values);
}
export async function editarPregunta(id: number) {
    return await axios.get<IResponse<IPlantilla>>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/test/edit/${id}`);
}
export async function updatePregunta(values?: IPlantilla) {
    return await axios.put<IResponse<null>>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/test`, values);
}
export async function deletePregunta(id: number) {
    return await axios.delete<IResponse<null>>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/test/${id}`);
}
