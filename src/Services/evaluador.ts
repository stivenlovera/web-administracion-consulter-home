import axios from "axios";

import { IEvaluacion, IResponseEditarEvaluacion, IResponseEvaluacion, IResponseInsertEvaluacion,IResponseUpdateEvaluacion,IResponseDeleteEvaluacion, IResponseCreateEvaluacion, IFormEvaluacion } from "./Interface/configEvaluador";

export async function ObtenerListEvaluadorService() {
    return await axios.get<IResponseEvaluacion>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluacion`);
}
export async function CreateEvaluadorService() {
    return await axios.get<IResponseCreateEvaluacion>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluacion/create`);
}
export async function StoreEvaluadorService(formEvaluacion: IFormEvaluacion) {
    return await axios.post<IResponseInsertEvaluacion>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluacion`, formEvaluacion);
}
export async function EditarEvaluadorService(evaluacion_id: number) {
    return await axios.get<IResponseEditarEvaluacion>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluacion/editar/${evaluacion_id}`);
}
export async function UpdateEvaluadorService(formEvaluacion: IFormEvaluacion) {
    return await axios.put<IResponseUpdateEvaluacion>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluacion/${formEvaluacion.evaluacion_id}`, formEvaluacion);
}
export async function DeleteEvaluadorService(evaluacion_id: number) {
    return await axios.delete<IResponseDeleteEvaluacion>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluacion/${evaluacion_id}`);
}
