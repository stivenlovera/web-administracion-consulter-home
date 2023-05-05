import { enqueueSnackbar } from "notistack";
import { useContext, useState } from "react";
import { IEvaluador } from "../../../Services/Interface/configEvaluador";
import { ContextUpdateDateTable } from "../../../Context/Context";
import { ObtenerListEvaluadorService } from "../../../Services/evaluador";

const UseListEvaluador = () => {
    const [rows, setRows] = useState<IEvaluador[]>([]);
    const { dataTable, setDatatable } = useContext(ContextUpdateDateTable);
    
    const apiLisEvaluador = async () => {
        try {
            const { data } = await ObtenerListEvaluadorService();
            if (data.status == 1) {
                setDatatable(true);
                setRows(data.data.evaluadores);
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
        }
    }
    return {
        rows,
        apiLisEvaluador
    }
}
export default UseListEvaluador;