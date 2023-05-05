import React from 'react'
import { DataTablePostulante } from '../componets/data-table-postulante/data-table-postulante';
import { CBreadcrumbs } from '../../../Components/CBreadcrumbs/CBreadcrumbs';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';

const ListPostulantes = () => {
    return (
        <>
            <CBreadcrumbs icon={<SwitchAccountIcon />} nombreRoute="Postulantes" nombresRoutes={[]} route="#" routes={[]} />
            <DataTablePostulante />
        </>
    )
}

export default ListPostulantes;
