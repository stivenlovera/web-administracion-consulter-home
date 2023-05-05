import axios from "axios";
import { IPostulante, IResponseInsertPostulante, IResponsePostulante,IResponseEditPostulante } from "./Interface/postulantes";

export async function GetPostulantesService() {
    return await axios.get<IResponsePostulante>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/postulantes`);
}
export async function StorePostulanteService(Postulante: IPostulante) {
    return await axios.post<IResponseInsertPostulante>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/postulantes`, Postulante);
}
export async function EditarPostulanteService(CargoId: number) {
    return await axios.get<IResponseEditPostulante>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/postulantes/editar/${CargoId}`);
}
export async function UpdatePostulanteService(Postulante: IPostulante) {
    return await axios.put<IResponseInsertPostulante>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/postulantes/${Postulante.postulante_id}`, Postulante);
}
export async function DeletePostulanteService(CargoId: number) {
    return await axios.delete<IResponseInsertPostulante>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/postulantes/${CargoId}`);
}