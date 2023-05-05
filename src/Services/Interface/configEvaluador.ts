import { ITest } from "./test";

export interface IResponseEvaluador {
    status: number;
    message: string;
    data: {
        evaluadores: IEvaluador[]
    }
}
export interface IEvaluador {
    evaluador_id: number;
    nombreEvaluador: string;
    cargo_id: number;
    nombreCargo: string;
    tests: ITest[];
}
export interface IResponseCreaterEvaluador {
    status: number;
    message: string;
    data: {
        cargos: IEvaluador[]
        tests: ITest[]
    }
}
export interface IResponseInsertEvaluador {
    status: number;
    message: string;
    data: null
}
export interface IResponseEditarEvaluador {
    status: number;
    message: string;
    data: {
        evaluador: IEvaluador,
        cargos: IEvaluador[]
        tests: ITest[]
    }
}
export interface IResponseUpdateEvaluador {
    status: number;
    message: string;
    data: null
}
export interface IResponseDeleteEvaluador {
    status: number;
    message: string;
    data: null
}