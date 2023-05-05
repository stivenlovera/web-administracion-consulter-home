import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { ObtenerListEmpresaService, UpdateEmpresaService   } from "../../../Services/empresas";
import { IEmpresa } from "../../../Services/Interface/empresas";
const UseUpdateEmpresa = (empresa: IEmpresa) => {

    const apiUpdateEmpresa = async () => {
        let status = false;
        try {
            const { data } = await UpdateEmpresaService(empresa);
            if (data.status == 1) {
                status = true;
                enqueueSnackbar(data.message, { variant: 'success' });
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
        }
        return status;
    }
    return {
        apiUpdateEmpresa
    }
}
export default UseUpdateEmpresa;