import React from 'react'
import { CBreadcrumbs } from '../../Components/CBreadcrumbs/CBreadcrumbs'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
const ListaPlantillas = () => {
    return (
        <>
            <CBreadcrumbs icon={<AutoStoriesIcon />} nombreRoute="Lista Plantillas" nombresRoutes={[]} route="#" routes={[]} />
        </>
    )
}

export default ListaPlantillas
