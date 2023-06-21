import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { EditarPostulanteService } from "../../../../../Services/postulante";
import { IPostulante } from "../../../../../Services/Interface/postulantes";
import { initialStatePostulante } from "../utils/initialPostulantes";
import dayjs from "dayjs";
import { IEstadoPostulante } from "../../../../../Services/Interface/estadoPostulante";
import { IEstadoCivil } from "../../../../../Services/Interface/estadoCivil";

const UseEditarPostulante = () => {
    const [estadoPostulanteEditar, setEstadoPostulante] = useState<IEstadoPostulante[]>([]);
    const [estadoCivilEditar, setEstadoCivil] = useState<IEstadoCivil[]>([]);
    const [editar, setEditar] = useState<IPostulante>(initialStatePostulante);

    const apEditarPostulante = async (id: number) => {
        try {
            const { data } = await EditarPostulanteService(id);
            if (data.status == 1) {
                console.log('data entrante ', data.data.postulante);
                setEstadoPostulante(data.data.estadoPostulantes);
                setEstadoCivil(data.data.estadoCiviles);
                setEditar({
                    ...data.data.postulante,
                    fecha_nacimiento: dayjs(data.data.postulante.fecha_nacimiento)
                });

                return !!data.status;
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
                return !!data.status;
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
            return false
        }
    }
    return {
        estadoCivilEditar,
        estadoPostulanteEditar,
        editar,
        apEditarPostulante
    }
}
export default UseEditarPostulante;