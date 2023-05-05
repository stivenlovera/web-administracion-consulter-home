import axios from "axios";
import { IPostulante, IResponsePostulante } from "./Interface/postulantes";

export async function ObtenerEnlace() {
    return await axios.get<IResponsePostulante>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/postulantes`);
}
export async function ModificarEnlace(postulante: IPostulante) {
    return await axios.post<IResponsePostulante>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/postulantes`,postulante);
}
