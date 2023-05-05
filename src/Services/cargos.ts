import axios from "axios";
import { IResponseCargo, IResponseInsertCargo, ICargo, IResponseEditarCargo } from "./Interface/cargo";

export async function ObtenerListCargoService() {
    return await axios.get<IResponseCargo>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/cargo`);
}
export async function StoreCargoService(Cargo: ICargo) {
    return await axios.post<IResponseInsertCargo>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/cargo`, Cargo);
}
export async function EditarCargoService(CargoId: number) {
    return await axios.get<IResponseEditarCargo>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/cargo/editar/${CargoId}`);
}
export async function UpdateCargoService(Cargo: ICargo) {
    return await axios.put<IResponseInsertCargo>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/cargo/${Cargo.cargo_id}`, Cargo);
}
export async function DeleteCargoService(CargoId: number) {
    return await axios.delete<IResponseInsertCargo>(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/cargo/${CargoId}`);
}
