import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { EditarEvaluadorService } from "../../../Services/evaluador";
import { IEvaluacion, IFormEvaluacion } from "../../../Services/Interface/configEvaluador";
import moment from 'moment';
import { ICargo } from "../../../Services/Interface/cargo";
import { ITest } from "../../../Services/Interface/test";
import { IPostulante } from "../../../Services/Interface/postulantes";
import { IEmpresa } from "../../../Services/Interface/empresas";
import { IEstado } from "../../../Services/Interface/estado";

const UseEditarEvaluador = () => {
    const [editar, setEditar] = useState<IFormEvaluacion>({
        cargo_id: 0,
        evaluacion_id: 0,
        nota: '',
        estado_id: 0,
        dia: 0,
        nombreCargo: '',
        nombreEvaluacion: '',
        fechaCreacion: moment().format('YYYY-MM-DD'),
        tests: [],
        empresa_id: 0,
        postulantes: []
    });
    const [cargosEdit, setCargosEdit] = useState<ICargo[]>([]);
    const [testsEdit, setTestsEdit] = useState<ITest[]>([]);
    const [postulantesEdit, setPostulantesEdit] = useState<IPostulante[]>([]);
    const [empresasEdit, setEmpresasEdit] = useState<IEmpresa[]>([]);
    const [estadosEdit, setEstadosEdit] = useState<IEstado[]>([]);

    const apEditarEvaluador = async (id: number) => {
        let status = false;
        try {
            const { data } = await EditarEvaluadorService(id);
            if (data.status == 1) {
                console.log('data entrante ', data.data.evaluacion)
                status = true;
                setEditar(data.data.evaluacion);
                setCargosEdit(data.data.cargos);
                setTestsEdit(data.data.tests);
                setEmpresasEdit(data.data.empresas);
                setPostulantesEdit(data.data.postulantes);
                setEstadosEdit(data.data.estados);
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
        }
        return status;
    }
    return {
        cargosEdit,
        testsEdit,
        postulantesEdit,
        empresasEdit,
        estadosEdit,
        editar,
        apEditarEvaluador
    }
}
export default UseEditarEvaluador;