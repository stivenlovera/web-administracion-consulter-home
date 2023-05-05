import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { IEmpresa } from "../../../Services/Interface/empresas";
import { ICargo } from "../../../Services/Interface/cargo";

const UseCreateCargo = () => {
    const [create, setCreate] = useState<ICargo>({
       cargo_id:0,
       nombreCargo:''
    });

    const apiCreateCargo = async () => {

    }
    return {
        create,
        apiCreateCargo
    }
}
export default UseCreateCargo;