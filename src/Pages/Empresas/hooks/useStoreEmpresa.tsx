import { enqueueSnackbar } from "notistack";
import { IEmpresa } from "../../../Services/Interface/empresas";
import { StoreEmpresaService } from "../../../Services/empresas";

const UseStoreEmpresa = (empresa: IEmpresa) => {

    const apiStoreEmpresa = async () => {
        let status = false;
        try {
            const { data } = await StoreEmpresaService(empresa);
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
        apiStoreEmpresa
    }
}
export default UseStoreEmpresa;