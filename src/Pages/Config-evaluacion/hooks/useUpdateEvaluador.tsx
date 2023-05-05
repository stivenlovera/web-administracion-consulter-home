import { enqueueSnackbar } from "notistack";
import { IEvaluador } from "../../../Services/Interface/configEvaluador";
import { UpdateEvaluadorService } from "../../../Services/evaluador";
const UseUpdateEvaluador = (empresa: IEvaluador) => {

    const apiUpdateEvaluador = async () => {
        let status = false;
        try {
            const { data } = await UpdateEvaluadorService(empresa);
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
        apiUpdateEvaluador
    }
}
export default UseUpdateEvaluador;