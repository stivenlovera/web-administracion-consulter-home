import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { IPostulante } from "../../../../../Services/Interface/postulantes";
import { CreatePostulanteService } from "../../../../../Services/postulante";
import { IEstadoCivil } from "../../../../../Services/Interface/estadoCivil";
import { IEstadoPostulante } from "../../../../../Services/Interface/estadoPostulante";
import { initialStatePostulante } from "../utils/initialPostulantes";
import moment from "moment";

const UseCreatePostulantes = () => {
    const [estadoPostulanteCreate, setEstadoPostulante] = useState<IEstadoPostulante[]>([]);
    const [estadoCivilCreate, setEstadoCivil] = useState<IEstadoCivil[]>([]);
    const [create, setCreate] = useState<IPostulante>(initialStatePostulante);

    const apiCreatePostulantes = async (): Promise<boolean> => {
        try {
            const { data } = await CreatePostulanteService();
            if (data.status == 1) {
                setCreate({ ...initialStatePostulante, fechaIngreso: moment().format('yyyy-MM-DD') })
                setEstadoPostulante(data.data.estadoPostulantes);
                setEstadoCivil(data.data.estadoCiviles);
                return !!data.status;
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
                return !!data.status;
            }
        } catch (error) {
            return false
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
        }
    }
    return {
        create,
        estadoPostulanteCreate,
        estadoCivilCreate,
        apiCreatePostulantes
    }
}
export default UseCreatePostulantes;