import axios from "axios";
import { IResponseEmpresa, IResponseInsertEmpresa, IEmpresa, IResponseEditarEmpresa } from "./Interface/empresas";

export async function ObtenerListEmpresaService() {
    return await axios.get<IResponseEmpresa>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/empresa`);
}
export async function StoreEmpresaService(empresa: IEmpresa) {
    return await axios.post<IResponseInsertEmpresa>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/empresa`, empresa);
}
export async function EditarEmpresaService(empresaId: number) {
    return await axios.get<IResponseEditarEmpresa>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/empresa/editar/${empresaId}`);
}
export async function UpdateEmpresaService(empresa: IEmpresa) {
    return await axios.put<IResponseInsertEmpresa>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/empresa/${empresa.empresa_id}`, empresa);
}
export async function DeleteEmpresaService(empresaId: number) {
    return await axios.delete<IResponseInsertEmpresa>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/empresa/${empresaId}`);
}
