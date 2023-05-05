export interface IResponseEnlace {
    status: string;
    message: string;
    data: IEnlace
}
export interface IEnlace{
    enlace_id: number;
    codigo: string;
    estado: number;
    fecha_inicio: string;
    fecha_fin: string;
    postulantes_id: number;
}