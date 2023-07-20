import { createContext, useContext } from "react";
import { initialStatePlantilla } from "../Pages/Plantillas/components/utils/initialState";
import { IPlantilla } from "../Services/Interface/plantilla";

export type UpdateRespuesta = {
    plantilla: IPlantilla
    setPlantilla: (pregunta: IPlantilla) =>  void
}
export const ContextRespuesta = createContext<UpdateRespuesta>({
    plantilla: initialStatePlantilla, // set a default value
    setPlantilla: () => { },
})
export const useRespuesta = () => useContext(ContextRespuesta);
