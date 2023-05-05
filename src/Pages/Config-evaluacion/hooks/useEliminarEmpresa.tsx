import { enqueueSnackbar } from "notistack";
import { DeleteEvaluadorService } from "../../../Services/evaluador";

const UseDeleteEvaluador = (id:number) => {
    const apiDeleteEvaluador = async () => {
        let status = false;
        try {
            const { data } = await DeleteEvaluadorService(id);
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
        apiDeleteEvaluador
    }
}
export default UseDeleteEvaluador;