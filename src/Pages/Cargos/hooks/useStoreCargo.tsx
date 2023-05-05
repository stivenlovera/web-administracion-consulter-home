import { enqueueSnackbar } from "notistack";
import { ICargo } from "../../../Services/Interface/cargo";
import { StoreCargoService } from "../../../Services/cargos";

const UseStoreCargo = (Cargo: ICargo) => {

    const apiStoreCargo = async () => {
        let status = false;
        try {
            const { data } = await StoreCargoService(Cargo);
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
        apiStoreCargo
    }
}
export default UseStoreCargo;