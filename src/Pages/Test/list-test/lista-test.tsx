import { CBreadcrumbs } from '../../../Components/CBreadcrumbs/CBreadcrumbs'
import { DataTableEmpresas } from '../../Empresas/components/data-table-empresas/data-table-empresas'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Constructor from '../components/constructor/constructor';
import { Grid } from '@mui/material';
const ListaTest = () => {
    return (
        <>
            <CBreadcrumbs icon={<AutoStoriesIcon />} nombreRoute="Test" nombresRoutes={[]} route="#" routes={[]} />
            <Grid container spacing={2}>
                <Grid item xl={6} md={6}>
                    <Constructor></Constructor>
                </Grid>
                <Grid item xl={6} md={6} >
                    <Constructor></Constructor>
                </Grid>
            </Grid>

        </>
    )
}
export default ListaTest;
