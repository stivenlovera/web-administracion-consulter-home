import { Dayjs } from "dayjs";
import { IEstadoCivil } from "./estadoCivil";
import { IEstadoPostulante } from "./estadoPostulante";

export interface IResponsePostulante {
    status: number;
    message: string;
    data: {
        postulantes: IPostulante[]
    }
}
export interface IPostulante {
    fechaIngreso:string;
    ci:string;
    postulante_id: number;
    nombre: string;
    apellidos: string;
    dirrecion: string;
    fecha_nacimiento: Dayjs;
    telefono: string;
    email: string;
    expectativaSalarial:number;
    estadoCivilId:number;
    numeroHijos:string;
    edades:string;
    profesion:string;
    estadoPostulanteId:number;
    nombreEstadoPostulante:string;
}
export interface IResponseCreatePostulante {
    status: number;
    message: string;
    data: {
        estadoCiviles:IEstadoCivil[],
        estadoPostulantes:IEstadoPostulante[]
    }
}
export interface IResponseInsertPostulante {
    status: number;
    message: string;
    data: null
}
export interface IResponseEditPostulante {
    status: number;
    message: string;
    data: {
        postulante:IPostulante,
        estadoCiviles:IEstadoCivil[],
        estadoPostulantes:IEstadoPostulante[]
    }
}
export interface IResponseUpdatePostulante {
    status: number;
    message: string;
    data: null
}
export interface IResponseDeletePostulante {
    status: number;
    message: string;
    data: null
}
