import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IEmpresa } from '../../../../Services/Interface/empresas';
import { useContext, useEffect, useState } from 'react';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import { IPostulante } from '../../../../Services/Interface/postulantes';
import dayjs from 'dayjs';
import { DataTablePostulanteEvaluacion } from '../data-table-postulante-evaluacion/data-table-postulante-evaluacion';
import { initialStatePostulante } from '../../../Postulantes/componets/modal-postulante/utils/initialPostulantes';


interface ModalProps {
    openModal: boolean;
    id: number;
    onClose: () => void;
}
const ModalEvaluacionPostulante = ({ openModal, onClose, id }: ModalProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    /*Diseño modal */
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('md');

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

    useEffect(() => {
        return () => {
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
                    <Button
                        sx={{ textTransform: "none" }}
                        variant="contained"
                        size='small'
                        type='submit'
                        color='error'
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    )
}

export default ModalEvaluacionPostulante;
