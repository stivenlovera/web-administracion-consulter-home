import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { EditarEmpresaService } from "../../../Services/empresas";
import { IEmpresa } from "../../../Services/Interface/empresas";

const UseEditarEmpresa = () => {
    const [editar, setEditar] = useState<IEmpresa>({
        dirrecion: '',
        empresa_id: 0,
        nombreEmpresa: '',
        nombreRespresentante: '',
        telefono: ''
    });

    const apEditarEmpresa = async (id: number) => {
        let status = false;
        try {
            const { data } = await EditarEmpresaService(id);
            if (data.status == 1) {
                console.log('data entrante ', data.data.empresa)
                status = true;
                setEditar(data.data.empresa);
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
        apEditarEmpresa
    }
}
export default UseEditarEmpresa;