import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Grid, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IEmpresa } from '../../../../Services/Interface/empresas';
import { useContext, useEffect, useState } from 'react';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import { IPostulante } from '../../../../Services/Interface/postulantes';
import dayjs from 'dayjs';
import { DataTablePostulanteEvaluacion } from '../data-table-postulante-evaluacion/data-table-postulante-evaluacion';
import { initialStatePostulante } from '../../../Postulantes/componets/modal-postulante/utils/initialPostulantes';
import { IEvaluacionPreview } from '../../../../Services/Interface/evaluacionPostulante';
import { enqueueSnackbar } from 'notistack';
import useDataGridPostulanteEvaluacion from '../data-table-postulante-evaluacion/hooks/useDataGridPostulanteEvaluacion';


interface ModalProps {
    openModal: boolean;
    id: number;
    onClose: () => void;
}
const ModalEvaluacionPostulante = ({ openModal, onClose, id }: ModalProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

    /*Diseño modal */
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('xl');

    const {
        isValid,
        values,
        handleSubmit,
        handleBlur,
        handleChange,
        errors,
        setValues,
        resetForm
    } = useFormik({
        initialValues: initialStatePostulante,
        onSubmit: async (value: IPostulante) => {
            onClose();
            resetForm();
        }
    });

    const { preview, apiLisEvaluacionPostulantePreview } = useDataGridPostulanteEvaluacion();

    useEffect(() => {
       if (openModal==true) {
        apiLisEvaluacionPostulantePreview(id);
       }
    }, [openModal])

    return (
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openModal}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle id="responsive-dialog-title">
                    Postulantes a evaluar
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xl={6} lg={6} md={12} sm={12}>
                            <Paper elevation={0} sx={{ p: 1, bgcolor: 'grey.200' }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Tests
                                </Typography>
                                <Grid container >
                                    {
                                        preview.test.map((test) => {
                                            return (
                                                <Grid item xs={6} sm={6} style={{ margin: 0, padding: 0 }}>
                                                    <Typography variant='body2'>{test.nombreTest}</Typography>
                                                </Grid>
                                            );
                                        })
                                    }
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xl={6} lg={6} md={12} sm={12}>
                            <Paper elevation={0} sx={{ p: 1, bgcolor: 'grey.200' }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Evaluacion
                                </Typography>
                                <Grid container >
                                    <Grid item xs={6} sm={6} style={{ margin: 0, padding: 0 }}>
                                        <Typography variant='subtitle1'>{preview.evaluacion.nombreEvaluacion}</Typography>
                                    </Grid>

                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <DataTablePostulanteEvaluacion id={id} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ textTransform: "none" }}
                        variant="contained"
                        size='small'
                        type='button'
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    )
}

export default ModalEvaluacionPostulante;
