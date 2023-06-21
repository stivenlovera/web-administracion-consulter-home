import { enqueueSnackbar } from "notistack";
import { useContext, useState } from "react";
import { ObtenerListEvaluacionPostulanteService } from "../../../../../Services/evaluacionPostulante";
import { IEvaluacionPostulante } from "../../../../../Services/Interface/evaluacionPostulante";
import { ContextUpdateDateTable } from "../../../../../Context/Context";

const useDataGridPostulanteEvaluacion = () => {
    const [rows, setRows] = useState<IEvaluacionPostulante[]>([]);
    const { dataTable, setDatatable } = useContext(ContextUpdateDateTable);

    const apiLisEvaluacionPostulante = async (evaluacionPostulanteId: number) => {
        try {
            const { data } = await ObtenerListEvaluacionPostulanteService(evaluacionPostulanteId);
            console.log(data)
            if (data.status == 1) {
                setDatatable(true);
                setRows(data.data.evaluacionPostulante);
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
        }
    }
    return {
        rows,
        apiLisEvaluacionPostulante
    }
}
export default useDataGridPostulanteEvaluacion;