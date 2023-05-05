import { Dayjs } from "dayjs";

export interface IResponsePostulante {
    status: number;
    message: string;
    data: {
        postulantes: IPostulante[]
    }
}
export interface IPostulante {
    ci:string;
    postulante_id: number;
    nombre: string;
    apellidos: string;
    dirrecion: string;
    fecha_nacimiento: Dayjs;
    telefono: string;
    email: string;
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
        postulante:IPostulante
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
