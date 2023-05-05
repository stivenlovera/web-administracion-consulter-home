import { enqueueSnackbar } from "notistack";
import { StorePostulanteService } from "../../../Services/postulante";
import { IPostulante } from "../../../Services/Interface/postulantes";

const UseStorePostulante = (postulante: IPostulante) => {

    const apiStorePostulante = async () => {
        let status = false;
        try {
            const { data } = await StorePostulanteService(postulante);
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
        apiStorePostulante
    }
}
export default UseStorePostulante;