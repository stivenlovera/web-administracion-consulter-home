import React from 'react'
import { CBreadcrumbs } from '../../../Components/CBreadcrumbs/CBreadcrumbs'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import FeedIcon from '@mui/icons-material/Feed';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Chip, Grid, Paper, Typography } from '@mui/material';
import { useParams } from "react-router-dom";
import { DataTablePostulanteEvaluacionResultado } from './components/datatable-resultados/data-table-resultados';
const Resultado = () => {
    const { evaluacionId, postulanteId } = useParams();
    return (
        <>
            <CBreadcrumbs icon={<ContentPasteSearchIcon />} nombreRoute="Lista resultados" nombresRoutes={['Lista evaluaciones']} route="/lista-evaluaciones" routes={['#']} />
            <Grid container spacing={2}>
                <Grid item xl={12} md={12} >
                    <DataTablePostulanteEvaluacionResultado evaluacionId={parseInt(evaluacionId!)} postulanteId={parseInt(postulanteId!)} />
                </Grid>
            </Grid>
        </>
    )
}
export default Resultado
