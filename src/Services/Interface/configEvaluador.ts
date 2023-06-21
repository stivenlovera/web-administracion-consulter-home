import { IEmpresa } from "./empresas";
import { IEstado } from "./estado";
import { IPostulante } from "./postulantes";
import { ITest } from "./test";

export interface IResponseEvaluacion {
    status: number;
    message: string;
    data: {
        evaluaciones: IEvaluacion[]
    }
}
export interface IFormEvaluacion{
    evaluacion_id: number;
    nota:string;
    nombreEvaluacion: string;
    estado_id:number;
    dia:number,
    cargo_id: number;
    empresa_id: number;
    nombreCargo: string;
    fechaCreacion:string;
    tests: number[];
    postulantes: number[];
}
export interface IEvaluacion {
    evaluacion_id: number;
    nota:string;
    nombreEvaluacion: string;
    estadoId:number;
    dia:number,
    cargo_id: number;
    nombreCargo: string;
    fechaCreacion:string;
    tests: ITest[];
}
export interface IResponseCreateEvaluacion {
    status: number;
    message: string;
    data: {
        cargos: IEvaluacion[]
        tests: ITest[]
        postulantes: IPostulante[]
        empresas: IEmpresa[]
        estados: IEstado[]
    }
}
export interface IResponseInsertEvaluacion {
    status: number;
    message: string;
    data: null
}
export interface IResponseEditarEvaluacion {
    status: number;
    message: string;
    data: {
        evaluacion: IFormEvaluacion,
        cargos: IEvaluacion[]
        tests: ITest[]
        postulantes: IPostulante[]
        empresas: IEmpresa[]
        estados: IEstado[]
    }
}
export interface IResponseUpdateEvaluacion {
    status: number;
    message: string;
    data: null
}
export interface IResponseDeleteEvaluacion {
    status: number;
    message: string;
    data: null
}