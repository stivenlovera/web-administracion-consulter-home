import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { IEvaluacion, IFormEvaluacion } from "../../../Services/Interface/configEvaluador";
import { CreateEvaluadorService } from "../../../Services/evaluador";
import { ICargo } from "../../../Services/Interface/cargo";
import { ITest } from "../../../Services/Interface/test";
import moment from 'moment';
import { IPostulante } from "../../../Services/Interface/postulantes";
import { IEmpresa } from "../../../Services/Interface/empresas";
import { IEstado } from "../../../Services/Interface/estado";

const UseCreateEvaluador = () => {
    const [create, setCreate] = useState<IFormEvaluacion>({
        cargo_id: 0,
        evaluacion_id: 0,
        nota: '',
        estado_id: 0,
        dia: 0,
        nombreCargo: '',
        nombreEvaluacion: '',
        fechaCreacion: moment().format('YYYY-MM-DD'),
        tests: [],
        empresa_id:0,
        postulantes:[]
    });

    const [cargos, setCargos] = useState<ICargo[]>([]);
    const [tests, setTests] = useState<ITest[]>([]);
    const [postulantes, setPostulantes] = useState<IPostulante[]>([]);
    const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
    const [estados, setEstados] = useState<IEstado[]>([]);

    const apiCreateEvaluador = async () => {
        let status = false;
        try {
            const { data } = await CreateEvaluadorService();
            if (data.status == 1) {
                console.log('data create ', data.data, data.data)
                status = true;
                setCargos(data.data.cargos);
                setTests(data.data.tests);
                setEmpresas(data.data.empresas);
                setPostulantes(data.data.postulantes);
                setEstados(data.data.estados);
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
        }
        return status;
    }
    return {
        estados,
        create,
        cargos,
        tests,
        postulantes,
        empresas,
        apiCreateEvaluador
    }
}
export default UseCreateEvaluador;