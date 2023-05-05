import { DataTableCargos } from '../components/data-table-cargo/data-table-cargos';
import { CBreadcrumbs } from '../../../Components/CBreadcrumbs/CBreadcrumbs';
import SignpostIcon from '@mui/icons-material/Signpost';
const ListCargos = () => {
    return (
        <>
            <CBreadcrumbs icon={<SignpostIcon />} nombreRoute="Cargo" nombresRoutes={[]} route="#" routes={[]} />
            <DataTableCargos />
        </>
    )
}

export default ListCargos;
