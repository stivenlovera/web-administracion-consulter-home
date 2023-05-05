import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { EditarCargoService } from "../../../Services/cargos";
import { ICargo } from "../../../Services/Interface/cargo";

const UseEditarCargo = () => {
    const [editar, setEditar] = useState<ICargo>({
        cargo_id: 0,
        nombreCargo: ''
    });

    const apEditarCargo = async (id: number) => {
        let status = false;
        try {
            const { data } = await EditarCargoService(id);
            if (data.status == 1) {
                status = true;
                setEditar(data.data.cargo);
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
        }
        return status;
    }
    return {
        editar,
        apEditarCargo
    }
}
export default UseEditarCargo;