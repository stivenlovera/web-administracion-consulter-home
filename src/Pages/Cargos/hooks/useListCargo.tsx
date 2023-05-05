import { enqueueSnackbar } from "notistack";
import { useContext, useState } from "react";
import { ObtenerListCargoService } from "../../../Services/cargos";
import { ICargo } from "../../../Services/Interface/cargo";
import { ContextUpdateDateTable } from "../../../Context/Context";

const UseListCargo = () => {
    const [rows, setRows] = useState<ICargo[]>([]);
    const { dataTable, setDatatable } = useContext(ContextUpdateDateTable);
    
    const apiLisCargo = async () => {
        try {
            const { data } = await ObtenerListCargoService();
            if (data.status == 1) {
                setDatatable(true);
                setRows(data.data.cargos);
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
        }
    }
    return {
        rows,
        apiLisCargo
    }
}
export default UseListCargo;