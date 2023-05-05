import { Breadcrumbs, Typography } from '@mui/material';
import { DataTableConfigEvaluador } from '../components/data-table-config-evaluador/data-table-config-evaluador';
import { CBreadcrumbs } from '../../../Components/CBreadcrumbs/CBreadcrumbs';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const ListConfigEvaluador = () => {
    return (
        <>
            <CBreadcrumbs icon={<PendingActionsIcon />} nombreRoute="Evaluaciones" nombresRoutes={[]} route="#" routes={[]} />
            <DataTableConfigEvaluador />
        </>
    )
}

export default ListConfigEvaluador;