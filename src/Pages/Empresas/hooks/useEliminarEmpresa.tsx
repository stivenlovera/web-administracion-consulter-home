import { enqueueSnackbar } from "notistack";
import { DeleteEmpresaService, ObtenerListEmpresaService } from "../../../Services/empresas";

const UseDeleteEmpresa = (id:number) => {
    const apiDeleteEmpresa = async () => {
        let status = false;
        try {
            const { data } = await DeleteEmpresaService(id);
            if (data.status == 1) {
                status=true;
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
        apiDeleteEmpresa
    }
}
export default UseDeleteEmpresa;