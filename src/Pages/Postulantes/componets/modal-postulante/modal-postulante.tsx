import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, useMediaQuery, useTheme } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Fragment, useContext, useEffect, useState } from 'react';
import UseStorePostulante from './hooks/useStorePostulante';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import useUpdatePostulante from './hooks/useUpdatePostulante';
import { IPostulante } from '../../../../Services/Interface/postulantes';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { IEstadoCivil } from '../../../../Services/Interface/estadoCivil';
import { IEstadoPostulante } from '../../../../Services/Interface/estadoPostulante';
import { initialStatePostulante } from './utils/initialPostulantes';

interface ModalProps {
    openModal: boolean;
    editar: boolean;
    id?: number;
    data: {
        postulante: IPostulante,
        estadoCivil: IEstadoCivil[],
        estadoPostulante: IEstadoPostulante[]
    }
    onClose: () => void;
}
const ModalEmpresa = ({ openModal, onClose, editar, data, id, }: ModalProps) => {
    const { postulante, estadoCivil, estadoPostulante } = data;

    const [selectEstadoCivil, setSelectEstadoCivil] = useState('');
    const [selectEstadoPostulante, setSelectEstadoPostulante] = useState('');

    const handleChangeEstadoCivil = (event: SelectChangeEvent) => {
        setFieldValue('estadoCivilId', event.target.value);
        setSelectEstadoCivil(event.target.value);
    };

    const handleChangeEstadoPostulante = (event: SelectChangeEvent) => {
        setFieldValue('estadoPostulanteId', event.target.value);
        setSelectEstadoPostulante(event.target.value);
    };

    const { dataTable, setDatatable } = useContext(ContextUpdateDateTable);
    const theme = useTheme();
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('md');

    const {
        values,
        touched,
        handleSubmit,
        handleChange,
        errors,
        setValues,
        setFieldValue,
        resetForm
    } = useFormik({
        initialValues: initialStatePostulante,
        onSubmit: async (value: IPostulante) => {
            console.log('fecha ', values)
            console.log('editar ', editar)
            if (editar) {
                const update = await apiUpdatePostulante();
                setDatatable(true);
                onClose();
                resetForm();

            } else {
                const store = await apiStorePostulante();
                setDatatable(true);
                onClose();
                resetForm();
            }
        },
        validationSchema: Yup.object({
            fechaIngreso: Yup.string().nullable(),
            ci: Yup.string().required('CI es requerido!'),
            postulante_id: Yup.number().nullable(),
            nombre: Yup.string().required('Nombre es requerido!'),
            apellidos: Yup.string().required('Apellidos es requerido!'),
            dirrecion: Yup.string().required('Domicilio es requerido!'),
            telefono: Yup.string().required('Telefono es requerido!'),
            fecha_nacimiento: Yup.string().required('Fecha nacimiento es requerido!'),
            email: Yup.string().email('Formato incorrecto').required('Email es requerido'),
            expectativaSalarial: Yup.number().required('Expectativa salarial es requerido!'),
            estadoCivilId: Yup.number().min(1, 'Seleccione una opcion').required('Estado civil es requerido!'),
            numeroHijos: Yup.string().nullable(),
            edades: Yup.string().nullable(),
            profesion: Yup.string().required('Profesion es requerido!'),
            estadoPostulanteId: Yup.number().min(1, 'Seleccione una opcion').required('Estado es requerido!'),
        })
    });

    const { apiStorePostulante } = UseStorePostulante(values);
    const { apiUpdatePostulante } = useUpdatePostulante(values);

    useEffect(() => {
        setSelectEstadoCivil(postulante.estadoCivilId == 0 ? '' : postulante.estadoCivilId.toString());
        setSelectEstadoPostulante(postulante.estadoPostulanteId == 0 ? '' : postulante.estadoPostulanteId.toString());
        setValues(postulante)
    }, [postulante])

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
                    {editar ? 'Editar Postulante' : 'Añadir Postulante'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">Estatus</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={selectEstadoPostulante}
                                    //defaultValue={selectEstadoPostulante}
                                    onChange={handleChangeEstadoPostulante}
                                    label="Estado"
                                    error={Boolean(touched.estadoPostulanteId && errors.estadoPostulanteId)}
                                >
                                    {
                                        estadoPostulante.map((estado, i) => {
                                            return (<MenuItem key={i} value={estado.estadoPostulante_id}>{estado.nombreEstadoPostulante}</MenuItem>);
                                        })
                                    }
                                </Select>
                                <FormHelperText
                                    error={Boolean(touched.estadoPostulanteId && errors.estadoPostulanteId)}
                                >
                                    {touched.estadoPostulanteId && errors.estadoPostulanteId}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size='small'
                                name="ci"
                                label="Fecha Ingreso"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(touched.fechaIngreso && errors.fechaIngreso)}
                                helperText={touched.fechaIngreso && errors.fechaIngreso}
                                value={values.fechaIngreso}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size='small'
                                name="ci"
                                label="CI"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(touched.ci && errors.ci)}
                                helperText={touched.ci && errors.ci}
                                value={values.ci}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    label="Selecione fecha Nacimiento"
                                    value={values.fecha_nacimiento}
                                    format='YYYY-MM-DD'
                                    onChange={(newValue) => {
                                        setFieldValue('fecha_nacimiento', newValue)
                                    }}
                                    slotProps={{
                                        textField: {
                                            variant: 'standard',
                                            fullWidth,
                                            size: 'small',
                                            helperText: touched.fecha_nacimiento && errors.fecha_nacimiento ? 'Fecha nacimiento es requerido' : '',
                                            error: Boolean(touched.fecha_nacimiento && errors.fecha_nacimiento)
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                size='small'
                                name="nombre"
                                label="Nombres"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(touched.nombre && errors.nombre)}
                                helperText={touched.nombre && errors.nombre}
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
                                onChange={handleChange}
                                error={Boolean(touched.apellidos && errors.apellidos)}
                                helperText={touched.apellidos && errors.apellidos}
                                value={values.apellidos}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                size='small'
                                name="dirrecion"
                                label="Domilicio"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(touched.dirrecion && errors.dirrecion)}
                                helperText={touched.dirrecion && errors.dirrecion}
                                value={values.dirrecion}
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
                                onChange={handleChange}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                                value={values.email}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size='small'
                                name="telefono"
                                label="Telefono"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(touched.telefono && errors.telefono)}
                                helperText={touched.telefono && errors.telefono}
                                value={values.telefono}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">Estado civil</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={selectEstadoCivil}
                                    //defaultValue={selectEstadoCivil}
                                    onChange={handleChangeEstadoCivil}
                                    label="Age"
                                    error={Boolean(touched.estadoCivilId && errors.estadoCivilId)}
                                >
                                    {estadoCivil.map((estado, i) => {
                                        return (<MenuItem key={i} value={estado.estadoCivil_id}>{estado.nombreEstadoCivil}</MenuItem>)
                                    })}
                                </Select>
                                <FormHelperText
                                    error={Boolean(touched.estadoCivilId && errors.estadoCivilId)}
                                >
                                    {touched.estadoCivilId && errors.estadoCivilId}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size='small'
                                name="numeroHijos"
                                label="Numero de hijos"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(touched.numeroHijos && errors.numeroHijos)}
                                helperText={touched.numeroHijos && errors.numeroHijos}
                                value={values.numeroHijos}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size='small'
                                name="edades"
                                label="Edades"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(touched.edades && errors.edades)}
                                helperText={touched.edades && errors.edades}
                                value={values.edades}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                size='small'
                                name="profesion"
                                label="Profesion"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(touched.profesion && errors.profesion)}
                                helperText={touched.profesion && errors.profesion}
                                value={values.profesion}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                size='small'
                                name="expectativaSalarial"
                                label="Expectativa salarial (bruto)"
                                type='number'
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(touched.expectativaSalarial && errors.expectativaSalarial)}
                                helperText={touched.expectativaSalarial && errors.expectativaSalarial}
                                value={values.expectativaSalarial}
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