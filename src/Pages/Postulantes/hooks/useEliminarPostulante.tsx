import { enqueueSnackbar } from "notistack";
import { DeletePostulanteService } from "../../../Services/postulante";

const UseDeletePostulante = (id:number) => {
    const apiDeletePostulante = async () => {
        let status = false;
        try {
            const { data } = await DeletePostulanteService(id);
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
        apiDeletePostulante
    }
}
export default UseDeletePostulante;