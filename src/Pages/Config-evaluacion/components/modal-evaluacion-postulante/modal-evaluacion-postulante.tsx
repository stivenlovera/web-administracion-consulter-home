import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Grid, Paper, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { IPostulante } from '../../../../Services/Interface/postulantes';
import { DataTablePostulanteEvaluacion } from '../data-table-postulante-evaluacion/data-table-postulante-evaluacion';
import { initialStatePostulante } from '../../../Postulantes/componets/modal-postulante/utils/initialPostulantes';
import useDataGridPostulanteEvaluacion from '../data-table-postulante-evaluacion/hooks/useDataGridPostulanteEvaluacion';
import moment from 'moment';

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
        console.log(preview)
        if (openModal == true) {
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
                    <Grid container spacing={1}>
                        <Grid item xl={6} lg={6} md={12} sm={12}>
                            <Paper elevation={0} sx={{ p: 1, bgcolor: 'grey.200' }}>
                                <p style={{ margin: 3, fontSize: 13 }}><strong> Evaluacion: </strong>
                                    {
                                        preview.evaluacion.nombreEvaluacion
                                    } </p>
                                <p style={{ margin: 3, fontSize: 13 }}><strong> Nota: </strong>
                                    {
                                        preview.evaluacion.nota
                                    } </p>
                                <p style={{ margin: 3, fontSize: 13 }}><strong> Fecha Inicio: </strong>
                                    {
                                        moment(preview.evaluacion.fechaInicio).format('DD/MM/yyyy HH:mm a')
                                    } </p>

                                <p style={{ margin: 3, fontSize: 13 }}><strong> Fecha Fin: </strong>
                                    {
                                        moment(preview.evaluacion.fechaFin).format('DD/MM/yyyy HH:mm a')
                                    } </p>


                            </Paper>
                        </Grid>
                        <Grid item xl={6} lg={6} md={12} sm={12}>
                            <Paper elevation={0} sx={{ p: 1, bgcolor: 'grey.200' }}>
                                <p style={{ margin: 3, fontSize: 13 }}><strong> Estado: </strong>
                                    {
                                        preview.estado.nombreEstado
                                    } </p>
                                <p style={{ margin: 3, fontSize: 13 }}><strong> Empresa: </strong>
                                    {
                                        preview.empresa.nombreEmpresa
                                    } </p>
                                <p style={{ margin: 3, fontSize: 13 }}><strong> Cargo: </strong>
                                    {
                                        preview.cargo.nombreCargo
                                    } </p>
                                <p style={{ margin: 3, fontSize: 13 }}><strong> Test: </strong>
                                    {
                                        preview.test.map(x => { return ` ${x.nombreTest}`} ).toString()
                                    } </p>
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
