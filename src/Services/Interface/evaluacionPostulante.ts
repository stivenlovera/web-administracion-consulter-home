import { Dayjs } from "dayjs";
import { ITest } from "./test";
import { IEvaluacion } from "./configEvaluador";

export interface IResponseEvaluacionPostulante {
    status: number;
    message: string;
    data: {
        evaluacionPostulante: IEvaluacionPostulante[]
    }
}
export interface IEvaluacionPostulante {
    ci: string;
    nombreCompleto: string;
    url: string;
    estado: string;
    postulante_evaluacion_id: number;
}
export interface IEvaluacionPreview {
    test: ITest[],
    evaluacion: IEvaluacion
}