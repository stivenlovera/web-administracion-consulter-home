import { IEvaluacion } from "./configEvaluador";
import { IPostulante } from "./postulantes";

export interface IResultadoTest {
    postulante: IPostulante;
    evaluacion: IEvaluacion;
    tests: ITestResultos[];
}
export interface ITestResultos {
    test_id: number;
    nombreTest: number;
    descripcion_test: number;
    tiempo_total: number;
    procedimiento: string;
    tipo_preguntas_id: number;
    completado: string;
    evaluacion_id: number;
}