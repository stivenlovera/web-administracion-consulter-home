import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { UpdateCargoService   } from "../../../Services/cargos";
import { ICargo } from "../../../Services/Interface/cargo";
const UseUpdateCargo = (Cargo: ICargo) => {

    const apiUpdateCargo = async () => {
        let status = false;
        try {
            const { data } = await UpdateCargoService(Cargo);
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
        apiUpdateCargo
    }
}
export default UseUpdateCargo;