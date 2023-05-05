import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { IEmpresa } from "../../../Services/Interface/empresas";
import { IPostulante } from "../../../Services/Interface/postulantes";
import dayjs from "dayjs";

const UseCreatePostulantes = () => {
    const [create, setCreate] = useState<IPostulante>({
        ci:'',
        apellidos: '',
        dirrecion: '',
        email: '',
        postulante_id: 0,
        fecha_nacimiento: dayjs(),
        nombre: '',
        telefono: ''
    });

    const apiCreatePostulantes = async () => {

    }
    return {
        create,
        apiCreatePostulantes
    }
}
export default UseCreatePostulantes;