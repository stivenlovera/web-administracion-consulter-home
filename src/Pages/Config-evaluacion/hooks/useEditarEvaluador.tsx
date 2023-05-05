import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { EditarEvaluadorService } from "../../../Services/evaluador";
import { IEvaluador } from "../../../Services/Interface/configEvaluador";

const UseEditarEvaluador = () => {
    const [editar, setEditar] = useState<IEvaluador>({
        cargo_id: 0,
        evaluador_id: 0,
        nombreCargo: '',
        nombreEvaluador: '',
        tests: []
    });

    const apEditarEvaluador = async (id: number) => {
        let status = false;
        try {
            const { data } = await EditarEvaluadorService(id);
            if (data.status == 1) {
                console.log('data entrante ', data.data.evaluador)
                status = true;
                setEditar(data.data.evaluador);
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
        apEditarEvaluador
    }
}
export default UseEditarEvaluador;