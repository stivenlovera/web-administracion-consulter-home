import React from 'react'
import { IPlantilla } from '../../../../Services/Interface/plantilla'
import { enqueueSnackbar } from 'notistack'
import { listPregunta, storePregunta, editarPregunta, updatePregunta, deletePregunta } from '../../../../Services/servicio'

interface propsUsePlantilla {
    values?: IPlantilla
}
const usePlantilla = () => {
    const List = async () => {
        try {
            const { data, status } = await listPregunta()
            if (data.status == 1) {
                enqueueSnackbar(data.message, { variant: 'success' });
                return data.data;
            }
        } catch (error) {
            enqueueSnackbar('Error', { variant: 'success' });
        }
        return []
    }
    const Store = async ({ values }: propsUsePlantilla) => {
        try {
            const { data, status } = await storePregunta(values)
            if (data.status == 1) {
                enqueueSnackbar(data.message, { variant: 'success' });
                return data.data;
            }

        } catch (error) {
            enqueueSnackbar('Error', { variant: 'success' });
        }
        return []
    }
    const Edit = async (id: number, initialState: IPlantilla) => {
        try {
            const { data, status } = await editarPregunta(id)
            if (data.status == 1) {
                //enqueueSnackbar(data.message, { variant: 'success' });
                return data.data;
            }else{
                return initialState
            }
        } catch (error) {
            enqueueSnackbar('ocurrio un error', { variant: 'success' });
            return initialState
        }
    }
    const Update = async ({ values }: propsUsePlantilla) => {
        try {
            const { data, status } = await updatePregunta(values)
            if (data.status == 1) {
                enqueueSnackbar(data.message, { variant: 'success' });
            }
            return null
        } catch (error) {
            enqueueSnackbar('Error', { variant: 'success' });
            return null
        }
    }
    const Delete = async (id: number) => {
        try {
            const { data, status } = await deletePregunta(id)
            if (data.status == 1) {
                enqueueSnackbar(data.message, { variant: 'success' });
            }
            return null
        } catch (error) {
            enqueueSnackbar('Error', { variant: 'success' });
            return null
        }
    }
    return {
        List,
        Store,
        Edit,
        Update,
    }
}

export default usePlantilla
