import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import { IEvaluacion, IFormEvaluacion } from '../../../../Services/Interface/configEvaluador';
import UseStoreEvaluador from '../../hooks/useStoreEvaluador';
import UseUpdateEvaluador from '../../hooks/useUpdateEvaluador';
import { ICargo } from '../../../../Services/Interface/cargo';
import { ITest } from '../../../../Services/Interface/test';
import { IEmpresa } from '../../../../Services/Interface/empresas';
import { IPostulante } from '../../../../Services/Interface/postulantes';
import { IEstado } from '../../../../Services/Interface/estado';

const initialState: IFormEvaluacion = {
    cargo_id: 0,
    evaluacion_id: 0,
    nota: '',
    dia: 0,
    estado_id: 0,
    nombreCargo: '',
    nombreEvaluacion: '',
    fechaCreacion: '',
    empresa_id: 0,
    postulantes: [],
    tests: [],
}
interface ModalProps {
    openModal: boolean;
    tipo: string;
    id?: number;
    cargos: ICargo[];
    tests: ITest[];
    empresas: IEmpresa[];
    postulantes: IPostulante[];
    data: IFormEvaluacion;
    estados: IEstado[];
    onClose: () => void;
}
const ModalEvaluador = ({ openModal, onClose, tipo, data, id, cargos, tests, empresas, postulantes, estados }: ModalProps) => {
    const { dataTable, setDatatable } = useContext(ContextUpdateDateTable);

    /*Diseño modal */
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('md');

    const [estado, setEstado] = useState('');
    const [cargoSelect, setCargoSelect] = useState<ICargo | null>();
    const [empresaSelect, setEmpresaSelect] = useState<IEmpresa | null>();
    const [testSelect, setTestSelect] = useState<ITest[]>([]);
    const [postulanteSelect, setPostulanteSelect] = useState<IPostulante[]>([]);

    const handleChangeEstado = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setFieldValue('estado_id', event.target.value);
        setEstado(event.target.value);
    };

    const {
        isValid,
        touched,
        values,
        handleSubmit,
        handleBlur,
        handleChange,
        errors,
        setValues,
        resetForm,
        setFieldValue
    } = useFormik({
        initialValues: initialState,
        onSubmit: async (value: IFormEvaluacion) => {
            console.log(value)
            switch (tipo) {
                case 'nuevo':
                    const store = await apiStoreEvaluador();
                    if (store) {
                        setDatatable(true);
                        onClose();
                        resetForm();
                    }
                    else {
                    }
                    break;
                case 'editar':
                    const update = await apiUpdateEvaluador();
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
            evaluador_id: Yup.number().nullable(),
            nombreEvaluacion: Yup.string().required('Nombre es requerido!'),
            nombreCargo: Yup.string().nullable(),
            fechaCreacion: Yup.string().required('Fecha requerida!'),
            nota: Yup.string().nullable(),
            dia: Yup.number().typeError('Debe ser un numero').required('Cantidad de dias es requerido!').min(1, 'Debe ser mayor a 0'),
            estado_id: Yup.number().typeError('Debe ser un numero').required('Selecione un estado').min(1, 'Selecione un estado'),
            cargo_id: Yup.number().typeError('Debe ser un numero').required('Selecione un cargo').min(1, 'Selecione un cargo'),
            empresa_id: Yup.number().typeError('Debe ser un numero').required('Selecione una empresa').min(1, 'Selecione una empresa'),
            postulantes: Yup.array().min(1, 'Debe añadirse almenos un postulantes').required('Selecione postulantes'),
            tests: Yup.array().min(1, 'Debe añadirse almenos un test').required('Selecione test')
        })
    });

    const { apiStoreEvaluador } = UseStoreEvaluador(values);
    const { apiUpdateEvaluador } = UseUpdateEvaluador(values);

    const filterPostulantes = () => {
        let resultadoPostulantes: IPostulante[] = [];
        postulantes.map((p) => {
            data.postulantes.map(x => {
                if (p.postulante_id == x) {
                    resultadoPostulantes.push(p);
                }
            })
        });
        if (resultadoPostulantes.length < 0) {
            return undefined;
        }
        return resultadoPostulantes;
    }
    const filterTest = () => {
        let resultadoTests: ITest[] = [];
        tests.map((t) => {
            data.tests.map(x => {
                if (t.test_id == x) {
                    resultadoTests.push(t);
                }
            })
        });
        if (resultadoTests.length < 0) {
            return undefined;
        }
        return resultadoTests;
    }

    const filterEmpresa = () => {
        var empresa = empresas.find((e) => { return e.empresa_id === data.empresa_id });
        if (empresa == undefined) {
            return null;
        } else {
            console.log('select', empresa)
            return empresa;
        }
    }
    const filterCargo = () => {
        var cargo = cargos.find((c) => { return c.cargo_id === data.cargo_id });
        if (cargo == undefined) {
            return null;
        } else {
            return cargo;
        }
    }
    useEffect(() => {
        setValues(data);
        setEstado(data.estado_id.toString() == '0' ? '' : data.estado_id.toString());
        console.log('initial data', data)
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
            <form onSubmit={(e) => { console.log(errors); console.log(values); handleSubmit(e) }}>
                <DialogTitle id="responsive-dialog-title">
                    {tipo == 'nuevo' ? 'Añadir evaluacion' : 'Editar evaluacion'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                size='small'
                                name="nombreEvaluacion"
                                label="Nombre de evaluacion"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(touched.nombreEvaluacion && errors.nombreEvaluacion)}
                                helperText={touched.nombreEvaluacion && errors.nombreEvaluacion}
                                value={values.nombreEvaluacion}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                size='small'
                                name="nota"
                                label="Nota"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(touched.nota && errors.nota)}
                                helperText={touched.nota && errors.nota}
                                value={values.nota}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                size='small'
                                name="fechaCreacion"
                                label="Fecha creacion"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(touched.fechaCreacion && errors.fechaCreacion)}
                                helperText={touched.fechaCreacion && errors.fechaCreacion}
                                value={values.fechaCreacion}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="demo-simple-select-standard-label">Seleccionar estado</InputLabel>
                                <Select
                                    value={estado}
                                    name='estado_id'
                                    onChange={handleChangeEstado}
                                    //displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    input={<Input name="Creado" id="1" />}
                                    error={Boolean(touched.estado_id && errors.estado_id)}
                                >
                                    {
                                        estados.map((e, i) => {
                                            return (<MenuItem key={i} value={e.estado_id}>{e.nombreEstado}</MenuItem>)
                                        })
                                    }
                                </Select>
                                <FormHelperText
                                    error={Boolean(touched.estado_id && errors.estado_id)}
                                >
                                    {touched.estado_id && errors.estado_id}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                size='small'
                                name="dia"
                                label="Dias de duracion"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                error={Boolean(touched.dia && errors.dia)}
                                helperText={touched.dia && errors.dia}
                                value={values.dia}
                                type='number'
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {/* <Grid container spacing={3} >
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='caption' sx={{ p: 0 }}>Total postualntes</Typography>
                                    <Typography variant='body1'> 50 registrados</Typography>

                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='caption' sx={{ p: 0 }}>Estado</Typography>
                                    <Typography variant='body1'>Creado</Typography>

                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Typography variant='caption' sx={{ p: 0 }}>Periodo de duracion</Typography>
                                    <Typography variant='body1'> 2023-05-01 al 2023-05-03</Typography>
                                </Grid>
                            </Grid> */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                size='small'
                                fullWidth
                                defaultValue={filterEmpresa()}
                                options={empresas}
                                getOptionLabel={(option: IEmpresa) => option.nombreEmpresa}
                                onChange={(event, value) => {
                                    console.log(value);
                                    setEmpresaSelect(value);
                                    setFieldValue('empresa_id', value?.empresa_id);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Selecione Empresa"
                                        variant="standard"
                                        error={Boolean(touched.empresa_id && errors.empresa_id)}
                                        helperText={touched.empresa_id && errors.empresa_id}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                size='small'
                                fullWidth
                                defaultValue={filterCargo()}
                                options={cargos == undefined ? [] : cargos}
                                getOptionLabel={(option: ICargo) => option.nombreCargo}
                                onChange={(event, value) => {
                                    console.log(value);
                                    setCargoSelect(value);
                                    setFieldValue('cargo_id', value?.cargo_id)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Selecione cargo"
                                        variant="standard"
                                        error={Boolean(touched.cargo_id && errors.cargo_id)}
                                        helperText={touched.cargo_id && errors.cargo_id}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Autocomplete
                                size='small'
                                fullWidth
                                multiple
                                //value={testSelect}
                                defaultValue={filterTest()}
                                options={tests == undefined ? [] : tests}
                                getOptionLabel={(option: ITest) => option.nombreTest}
                                onChange={(event, value) => {
                                    console.log(value)
                                    const testIds = value.map(p => p.test_id);
                                    console.log(testIds)
                                    setTestSelect(value);
                                    setFieldValue('tests', testIds)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Selecione test"
                                        variant="standard"
                                        error={Boolean(touched.tests && errors.tests)}
                                        helperText={touched.tests && errors.tests}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Autocomplete
                                size='small'
                                fullWidth
                                options={postulantes == undefined ? [] : postulantes}
                                multiple
                                defaultValue={filterPostulantes()}
                                //value={postulanteSelect}
                                getOptionLabel={(option: IPostulante) => option.nombre}
                                onChange={(event, value) => {
                                    console.log(value)
                                    const postulanteIds = value.map(p => p.postulante_id);
                                    console.log(postulanteIds)
                                    setPostulanteSelect(value);
                                    setFieldValue('postulantes', postulanteIds)
                                }}
                                //isOptionEqualToValue={(option, value) => value === undefined || option?.postulante_id?.toString() === (value?.postulante_id ?? value)?.toString()}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        //value={values.modeloId}
                                        label="Selecione Postulantes"
                                        variant="standard"
                                        error={Boolean(touched.postulantes && errors.postulantes)}
                                        helperText={touched.postulantes && errors.postulantes}
                                    />
                                )}
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

export default ModalEvaluador;