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
                    <Paper elevation={0} sx={{ p: 1, bgcolor: 'grey.200' }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Postulante
                        </Typography>
                        {/* <Grid container >
                            <Grid item xs={12} sm={6} style={{ margin: 0, padding: 0 }}>
                                <p style={{ fontSize: 14, margin: 0, padding: 1 }}>
                                    <strong>
                                        Nombre completo:
                                    </strong>
                                    {' '} dsadasdasd
                                </p>
                            </Grid>
                            <Grid item xs={6} sm={6} style={{ margin: 0, padding: 0 }}>
                                <p style={{ fontSize: 14, margin: 0, padding: 1 }}>
                                    <strong>
                                        Cargo:
                                    </strong>
                                    {' '} dsadasdasd
                                </p>
                            </Grid>
                        </Grid> */}
                    </Paper>
                </Grid>

                <Grid item xl={12} md={12} >
                    <DataTablePostulanteEvaluacionResultado evaluacionId={parseInt(evaluacionId!)} postulanteId={parseInt(postulanteId!)} />
                </Grid>
            </Grid>
        </>
    )
}

export default Resultado
