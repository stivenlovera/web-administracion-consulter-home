export interface IPregunta {
    pregunta_id: number;
    pregunta_nombre: string;
    resultado: IRespuesta[]
}
export interface IRespuesta {
    respuesta_id: number;
    tipo_respuesta_id: number;
    respuesta_fija: string;
    recurso: string;
}