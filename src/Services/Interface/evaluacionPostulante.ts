import { Dayjs } from "dayjs";

export interface IResponseEvaluacionPostulante{
    status: number;
    message: string;
    data: {
        evaluacionPostulante: IEvaluacionPostulante[]
    }
}
export interface IEvaluacionPostulante {
    ci:string;
    nombreCompleto: string;
    url: string;
    estado: string;
    postulante_evaluacion_id: number;
}