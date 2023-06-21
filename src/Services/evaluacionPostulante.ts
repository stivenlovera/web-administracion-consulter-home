import axios from "axios";

import { IEvaluacionPostulante, IResponseEvaluacionPostulante } from "./Interface/evaluacionPostulante";

export async function ObtenerListEvaluacionPostulanteService(evaluacionPostulanteId: number) {
    return await axios.get<IResponseEvaluacionPostulante>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluacion-postulante/${evaluacionPostulanteId}`);
}   
