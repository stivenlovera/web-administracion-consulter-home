import { IPregunta } from "./pregunta";
import { ITest } from "./test";

export interface IPlantilla {
    test_id: number;
    nombreTest: string;
    tipo_preguntas_id: number;
    descripcion_test: string;
    tiempo_total: number;
    preguntas: IPregunta[];
    procedimiento: ''
    pasos: IProcedimiento[]
    test_ejemplo_id: number;

}
export interface IProcedimiento {
    procedimiento_id: number;
    descripcion: string;
    imagen: string;
}