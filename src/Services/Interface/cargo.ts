export interface IResponseCargo {
    status: number;
    message: string;
    data: {
        cargos: ICargo[]
    }
}
export interface ICargo {
    cargo_id: number;
    nombreCargo: string;
}
export interface IResponseInsertCargo {
    status: number;
    message: string;
    data: null
}
export interface IResponseEditarCargo {
    status: number;
    message: string;
    data: {
        cargo:ICargo
    }
}
export interface IResponseUpdateCargo {
    status: number;
    message: string;
    data: null
}
export interface IResponseDeleteCargo {
    status: number;
    message: string;
    data: null
}