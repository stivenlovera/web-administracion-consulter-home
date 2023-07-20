import React from 'react'
import { IPlantilla } from '../../../../Services/Interface/plantilla'
import { enqueueSnackbar } from 'notistack'
import { listPregunta, storePregunta } from '../../../../Services/servicio'

interface propsUsePlantilla {
    values?: IPlantilla
}
const usePlantilla = ({ values }: propsUsePlantilla) => {
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
    const Store = async () => {
        try {
            const { data, status } = await storePregunta(values)
            if (data.status == 1) {
                enqueueSnackbar(data.message, { variant: 'success' });

            }

        } catch (error) {
            enqueueSnackbar('Error', { variant: 'success' });
        }

    }
    const Edit = async () => {
        try {
            const { data, status } = await storePregunta(values)
            if (data.status == 1) {
                enqueueSnackbar(data.message, { variant: 'success' });
                return data.data;
            }
            return values
        } catch (error) {
            enqueueSnackbar('Error', { variant: 'success' });
            return values
        }
        return values
    }
    const Update = async () => {
        try {
            const { data, status } = await storePregunta(values)
            if (data.status == 1) {
                enqueueSnackbar(data.message, { variant: 'success' });
            }
        } catch (error) {
            enqueueSnackbar('Error', { variant: 'success' });
        }
    }
    const Delete = async () => {
        try {
            const { data, status } = await storePregunta(values)
            if (data.status == 1) {
                enqueueSnackbar(data.message, { variant: 'success' });
            }
        } catch (error) {
            enqueueSnackbar('Error', { variant: 'success' });
        }
    }
    return {
        List,
        Store,
        Edit
    }
}

export default usePlantilla
