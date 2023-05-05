import { enqueueSnackbar } from "notistack";
import { IPostulante } from "../../../Services/Interface/postulantes";
import { UpdatePostulanteService } from "../../../Services/postulante";
const UseUpdatePostulante = (postulante: IPostulante) => {

    const apiUpdatePostulante = async () => {
        let status = false;
        try {
            const { data } = await UpdatePostulanteService(postulante);
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
        apiUpdatePostulante
    }
}
export default UseUpdatePostulante;