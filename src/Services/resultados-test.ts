import axios from "axios";
import { IResultadoTest } from "./Interface/ResultadoTest";
import { IResponse } from "./Interface/response";

export async function GetGetListResultService(evaluacionId: number, postulanteId: number) {
    return await axios.get<IResponse<IResultadoTest>>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/resultado-evaluacion/${evaluacionId}/${postulanteId} `);
}
