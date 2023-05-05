import { createContext, useContext } from "react";

export type UpdateDateTable = {
    dataTable: boolean
    setDatatable: (c: boolean) => void
}
export const ContextUpdateDateTable = createContext<UpdateDateTable>({
    dataTable: false, // set a default value
    setDatatable: () => { },
})
export const useGlobalContext = () => useContext(ContextUpdateDateTable);
