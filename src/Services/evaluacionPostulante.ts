import axios from "axios";

import { IEvaluacionPostulante, IEvaluacionPreview, IResponseEvaluacionPostulante } from "./Interface/evaluacionPostulante";
import { IResponse } from "./Interface/response";

export async function ObtenerListEvaluacionPostulanteService(evaluacionPostulanteId: number) {
    return await axios.get<IResponseEvaluacionPostulante>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluacion-postulante/${evaluacionPostulanteId}`);
}   
export async function GetGetListEvaluacionPreviewService(evaluacionPostulanteId: number) {
    return await axios.get<IResponse<IEvaluacionPreview>>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/evaluacion-postulante/preview/${evaluacionPostulanteId}`);
}