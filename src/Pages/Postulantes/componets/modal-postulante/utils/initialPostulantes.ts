import dayjs from "dayjs";
import { IPostulante } from "../../../../../Services/Interface/postulantes";

export const initialStatePostulante: IPostulante = {
    fechaIngreso: '',
    ci: '',
    apellidos: '',
    dirrecion: '',
    email: '',
    postulante_id: 0,
    fecha_nacimiento: dayjs(),
    nombre: '',
    telefono: '',
    expectativaSalarial: 0,
    estadoCivilId: 0,
    numeroHijos: '',
    edades: '',
    profesion: '',
    estadoPostulanteId: 0,
    nombreEstadoPostulante:''
}