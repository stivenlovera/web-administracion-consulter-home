import React from 'react'
import { CBreadcrumbs } from '../../Components/CBreadcrumbs/CBreadcrumbs'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { DataTablePlantillas } from './components/dataTable-plantillas';

const ListaPreguntas = () => {
    return (
        <>
            <CBreadcrumbs icon={<QuestionAnswerIcon />} nombreRoute="Lista Preguntas" nombresRoutes={[]} route="#" routes={[]} />
            <DataTablePlantillas />
        </>
    )
}

export default ListaPreguntas
