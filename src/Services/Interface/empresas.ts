export interface IResponseEmpresa {
    status: number;
    message: string;
    data: {
        empresas: IEmpresa[]
    }
}
export interface IEmpresa {
    empresa_id: number;
    nombreEmpresa: string;
    dirrecion: string;
    telefono: string;
    nombreRespresentante: string;
}
export interface IResponseInsertEmpresa {
    status: number;
    message: string;
    data: null
}
export interface IResponseEditarEmpresa {
    status: number;
    message: string;
    data: {
        empresa:IEmpresa
    }
}
export interface IResponseUpdateEmpresa {
    status: number;
    message: string;
    data: null
}
export interface IResponseDeleteEmpresa {
    status: number;
    message: string;
    data: null
}