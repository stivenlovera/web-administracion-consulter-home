import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, useMediaQuery, useTheme } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import UseStorePostulante from '../../hooks/useStorePostulante';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import useUpdatePostulante from '../../hooks/useUpdatePostulante';
import { IPostulante } from '../../../../Services/Interface/postulantes';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';


const initialState: IPostulante = {
    ci: '',
    apellidos: '',
    dirrecion: '',
    email: '',
    postulante_id: 0,
    fecha_nacimiento: dayjs(),
    nombre: '',
    telefono: ''
}
interface ModalProps {
    openModal: boolean;
    tipo: string;
    id?: number;
    data: IPostulante;
    onClose: () => void;
}
const ModalEmpresa = ({ openModal, onClose, tipo, data, id }: ModalProps) => {
    const { dataTable, setDatatable } = useContext(ContextUpdateDateTable);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const {
        isValid,
        values,
        handleSubmit,
        handleBlur,
        handleChange,
        errors,
        setValues,
        setFieldValue,
        resetForm
    } = useFormik({
        initialValues: initialState,
        onSubmit: async (value: IPostulante) => {
            switch (tipo) {
                case 'nuevo':
                    const store = await apiStorePostulante();
                    if (store) {
                        setDatatable(true);
                        onClose();
                        resetForm();
                    }
                    else {
                    }
                    break;
                case 'editar':
                    const update = await apiUpdatePostulante();
                    if (update) {
                        setDatatable(true);
                        onClose();
                        resetForm();
                    }
                    else {
                    }
                    break;
                default:
                    break;
            }

        },
        validationSchema: Yup.object({
            ci: Yup.string().required('CI es requerido!'),
            postulante_id: Yup.number().nullable(),
            nombre: Yup.string().required('Nombre es requerido!'),
            apellidos: Yup.string().required('Apellidos es requerido!'),
            dirrecion: Yup.string().required('Dirrecion es requerido!'),
            telefono: Yup.string().required('Telefono es requerido!'),
            fecha_nacimiento: Yup.string().required('Fecha nacimiento es requerido!'),
            email: Yup.string().email('Formato incorrecto').required('Email es requerido')
        })
    });


    const { apiStorePostulante } = UseStorePostulante(values);
    const { apiUpdatePostulante } = useUpdatePostulante(values);

    const [value, setValue] = useState<Dayjs | null>(dayjs());

    useEffect(() => {
        console.log('acutlaizacion', data)
        setValues(data)

        return () => {

        }
    }, [openModal])

    return (
        <Dialog
            open={openModal}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle id="responsive-dialog-title">
                    {tipo == 'nuevo' ? 'Añadir Postulante' : 'Editar Postulante'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                size='small'
                                name="ci"
                                label="CI"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={errors.ci}
                                error={!!errors.ci}
                                value={values.ci}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                size='small'
                                name="nombre"
                                label="Nombres"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={errors.nombre}
                                error={!!errors.nombre}
                                value={values.nombre}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                size='small'
                                name="apellidos"
                                label="Apellidos"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={errors.apellidos}
                                error={!!errors.apellidos}
                                value={values.apellidos}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                size='small'
                                name="dirrecion"
                                label="Dirrecion"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={errors.dirrecion}
                                error={!!errors.dirrecion}
                                value={values.dirrecion}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer components={['DatePicker', 'DatePicker']} >
                                    <DatePicker
                                        label="Selecione fecha Nacimiento"
                                        value={values.fecha_nacimiento}
                                        format='YYYY-MM-DD'
                                        onChange={(newValue) => {
                                            setFieldValue('fecha_nacimiento', newValue)
                                        }}
                                        slotProps={{ textField: { size: 'small' } }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size='small'
                                name="telefono"
                                label="Telefono"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={errors.telefono}
                                error={!!errors.telefono}
                                value={values.telefono}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                size='small'
                                name="email"
                                label="Email"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={errors.email}
                                error={!!errors.email}
                                value={values.email}
                            />
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
                        color='success'
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    )
}

export default ModalEmpresa;