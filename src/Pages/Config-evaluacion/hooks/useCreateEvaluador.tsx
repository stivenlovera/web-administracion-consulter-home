import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { IEvaluador } from "../../../Services/Interface/configEvaluador";
import { CreateEvaluadorService } from "../../../Services/evaluador";
import { ICargo } from "../../../Services/Interface/cargo";
import { ITest } from "../../../Services/Interface/test";

const UseCreateEvaluador = () => {
    const [create, setCreate] = useState<IEvaluador>({
        cargo_id: 0,
        evaluador_id: 0,
        nombreCargo: '',
        nombreEvaluador: '',
        tests: []
    });
    const [cargos, setCargos] = useState<ICargo[]>([]);
    const [tests, setTests] = useState<ITest[]>([]);
    const apiCreateEvaluador = async () => {
        let status = false;
        try {
            const { data } = await CreateEvaluadorService();
            if (data.status == 1) {
                console.log('data entrante ', data.data,data.data)
                status = true;
                setCargos(data.data.cargos);
                setTests(data.data.tests);
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
        }
        return status;
    }
    return {
        create,
        cargos,
        tests,
        apiCreateEvaluador
    }
}
export default UseCreateEvaluador;