import { enqueueSnackbar } from "notistack";
import { useContext, useState } from "react";
import { ObtenerListEmpresaService } from "../../../Services/empresas";
import { IEmpresa } from "../../../Services/Interface/empresas";
import { ContextUpdateDateTable } from "../../../Context/Context";

const UseListEmpresa = () => {
    const [rows, setRows] = useState<IEmpresa[]>([]);
    const { dataTable, setDatatable } = useContext(ContextUpdateDateTable);
    
    const apiLisEmpresa = async () => {
        try {
            const { data } = await ObtenerListEmpresaService();
            if (data.status == 1) {
                setDatatable(true);
                setRows(data.data.empresas);
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
        }
    }
    return {
        rows,
        apiLisEmpresa
    }
}
export default UseListEmpresa;