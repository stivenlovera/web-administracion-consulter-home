import axios from "axios";

import { IEvaluador, IResponseEditarEvaluador, IResponseEvaluador, IResponseInsertEvaluador,IResponseUpdateEvaluador,IResponseDeleteEvaluador } from "./Interface/configEvaluador";

export async function ObtenerListEvaluadorService() {
    return await axios.get<IResponseEvaluador>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluador`);
}
export async function CreateEvaluadorService() {
    return await axios.get<IResponseEditarEvaluador>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluador/create`);
}
export async function StoreEvaluadorService(evaluador: IEvaluador) {
    return await axios.post<IResponseInsertEvaluador>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluador`, evaluador);
}
export async function EditarEvaluadorService(evaluador_id: number) {
    return await axios.get<IResponseEditarEvaluador>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluador/editar/${evaluador_id}`);
}
export async function UpdateEvaluadorService(evaluador: IEvaluador) {
    return await axios.put<IResponseUpdateEvaluador>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluador/${evaluador.evaluador_id}`, evaluador);
}
export async function DeleteEvaluadorService(evaluador_id: number) {
    return await axios.delete<IResponseDeleteEvaluador>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluador/${evaluador_id}`);
}
