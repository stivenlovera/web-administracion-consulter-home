import { enqueueSnackbar } from "notistack";
import { GetGetListResultService } from "../../../Services/resultados-test";


const UseResultado = () => {
    const apiList = async (evaluacionId: number, postulanteId: number) => {
        try {
            const { data } = await GetGetListResultService(evaluacionId, postulanteId);
            if (data.status == 1) {
                return {
                    status: !!data.status,
                    data: data.data
                };
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
                return {
                    status: !!data.status,
                    data: null
                };
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
            return {
                status: false,
                data: null
            };
        }
    }
    const apiPreviewResultado = async (evaluacionId: number, postulanteId: number) => {
        try {
            const { data } = await GetGetListResultService(evaluacionId, postulanteId);
            if (data.status == 1) {
                return {
                    status: !!data.status,
                    data: data.data
                };
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
                return {
                    status: !!data.status,
                    data: null
                };
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
            return {
                status: false,
                data: null
            };
        }
    }
    return {
        apiList,
        apiPreviewResultado
    }
}
export default UseResultado;