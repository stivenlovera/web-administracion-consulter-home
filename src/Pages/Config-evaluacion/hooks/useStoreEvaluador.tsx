import { enqueueSnackbar } from "notistack";
import { StoreEvaluadorService } from "../../../Services/evaluador";
import { IEvaluador } from "../../../Services/Interface/configEvaluador";

const UseStoreEvaluador = (evaluador: IEvaluador) => {
    const apiStoreEvaluador = async () => {
        let status = false;
        try {
            const { data } = await StoreEvaluadorService(evaluador);
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
        apiStoreEvaluador
    }
}
export default UseStoreEvaluador;