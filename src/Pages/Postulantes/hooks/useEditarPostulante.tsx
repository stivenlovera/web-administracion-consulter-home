import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { EditarPostulanteService } from "../../../Services/postulante";
import { IPostulante } from "../../../Services/Interface/postulantes";
import dayjs from "dayjs";

const UseEditarPostulante = () => {
    const [editar, setEditar] = useState<IPostulante>({
        ci:'',
        apellidos: '',
        dirrecion: '',
        email: '',
        postulante_id: 0,
        fecha_nacimiento: dayjs(),
        nombre: '',
        telefono: ''
    });

    const apEditarPostulante = async (id: number) => {
        let status = false;
        try {
            const { data } = await EditarPostulanteService(id);
            if (data.status == 1) {
                console.log('data entrante ', data.data.postulante)
                status = true;
                setEditar(data.data.postulante);
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
        }
        return status;
    }
    return {
        editar,
        apEditarPostulante
    }
}
export default UseEditarPostulante;