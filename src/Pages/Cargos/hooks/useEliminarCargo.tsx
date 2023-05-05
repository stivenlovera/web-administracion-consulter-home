import { enqueueSnackbar } from "notistack";
import { DeleteCargoService, ObtenerListCargoService } from "../../../Services/cargos";

const UseDeleteCargo = (id:number) => {
    const apiDeleteCargo = async () => {
        let status = false;
        try {
            const { data } = await DeleteCargoService(id);
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
        apiDeleteCargo
    }
}
export default UseDeleteCargo;