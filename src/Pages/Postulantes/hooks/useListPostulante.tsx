import { enqueueSnackbar } from "notistack";
import { useContext, useState } from "react";
import { GetPostulantesService } from "../../../Services/postulante";
import { IEmpresa } from "../../../Services/Interface/empresas";
import { ContextUpdateDateTable } from "../../../Context/Context";
import { IPostulante } from "../../../Services/Interface/postulantes";

const UseListPostulante = () => {
    const [rows, setRows] = useState<IPostulante[]>([]);
    const { dataTable, setDatatable } = useContext(ContextUpdateDateTable);
    
    const apiListPostulante = async () => {
        try {
            const { data } = await GetPostulantesService();
            if (data.status == 1) {
                setDatatable(true);
                setRows(data.data.postulantes);
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
        }
    }
    return {
        rows,
        apiListPostulante
    }
}
export default UseListPostulante;