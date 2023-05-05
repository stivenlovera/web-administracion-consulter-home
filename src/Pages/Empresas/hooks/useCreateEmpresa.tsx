import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { IEmpresa } from "../../../Services/Interface/empresas";

const UseCreateEmpresa = () => {
    const [create, setCreate] = useState<IEmpresa>({
        dirrecion: '',
        empresa_id: 0,
        nombreEmpresa: '',
        nombreRespresentante: '',
        telefono: ''
    });

    const apiCreateEmpresa = async () => {

    }
    return {
        create,
        apiCreateEmpresa
    }
}
export default UseCreateEmpresa;