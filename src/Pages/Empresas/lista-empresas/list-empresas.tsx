import { CBreadcrumbs } from '../../../Components/CBreadcrumbs/CBreadcrumbs';
import { DataTableEmpresas } from '../components/data-table-empresas/data-table-empresas';
import BusinessIcon from '@mui/icons-material/Business';

const ListEmpresas = () => {
    return (
        <>
            <CBreadcrumbs icon={<BusinessIcon />} nombreRoute="Empresas" nombresRoutes={[]} route="#" routes={[]} />
            <DataTableEmpresas />
        </>
    )
}

export default ListEmpresas;
