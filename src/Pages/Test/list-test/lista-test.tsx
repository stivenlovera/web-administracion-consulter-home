import { CBreadcrumbs } from '../../../Components/CBreadcrumbs/CBreadcrumbs'
import { DataTableEmpresas } from '../../Empresas/components/data-table-empresas/data-table-empresas'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
const ListaTest = () => {
    return (
        <>
            <CBreadcrumbs icon={<AutoStoriesIcon />} nombreRoute="Test" nombresRoutes={[]} route="#" routes={[]} />
            {/* <DataTableEmpresas /> */}
        </>
    )
}
export default ListaTest;
