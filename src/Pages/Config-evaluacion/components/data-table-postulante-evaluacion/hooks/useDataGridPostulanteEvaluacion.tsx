import { enqueueSnackbar } from "notistack";
import { useContext, useState } from "react";
import { GetGetListEvaluacionPreviewService, ObtenerListEvaluacionPostulanteService } from "../../../../../Services/evaluacionPostulante";
import { IEvaluacionPostulante, IEvaluacionPreview } from "../../../../../Services/Interface/evaluacionPostulante";
import { ContextUpdateDateTable } from "../../../../../Context/Context";

const useDataGridPostulanteEvaluacion = () => {
    const [rows, setRows] = useState<IEvaluacionPostulante[]>([]);
    const { dataTable, setDatatable } = useContext(ContextUpdateDateTable);
    const [preview, setPreview] = useState<IEvaluacionPreview>({
        evaluacion: {
            cargo_id: 0,
            dia: 0,
            estadoId: 0,
            evaluacion_id: 0,
            fechaCreacion: '',
            nombreCargo: '',
            nombreEvaluacion: '',
            nota: '',
            tests: []
        },
        test: []
    })
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
    const apiLisEvaluacionPostulantePreview = async (evaluacionPostulanteId: number) => {
        try {
            const { data } = await GetGetListEvaluacionPreviewService(evaluacionPostulanteId);
            console.log(data)
            if (data.status == 1) {
                setPreview(data.data);
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
        }
    }
    return {
        rows,
        preview,
        apiLisEvaluacionPostulantePreview,
        apiLisEvaluacionPostulante
    }
}
export default useDataGridPostulanteEvaluacion;