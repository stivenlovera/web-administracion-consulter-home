import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, useMediaQuery, useTheme } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import { IEvaluador } from '../../../../Services/Interface/configEvaluador';
import UseStoreEvaluador from '../../hooks/useStoreEvaluador';
import UseUpdateEvaluador from '../../hooks/useUpdateEvaluador';
import { ICargo } from '../../../../Services/Interface/cargo';
import { ITest } from '../../../../Services/Interface/test';

const initialState: IEvaluador = {
    cargo_id: 0,
    evaluador_id: 0,
    nombreCargo: '',
    nombreEvaluador: '',
    tests: []
}
interface ModalProps {
    openModal: boolean;
    tipo: string;
    id?: number;
    cargos: ICargo[];
    tests: ITest[];
    data: IEvaluador;
    onClose: () => void;
}
const ModalEvaluador = ({ openModal, onClose, tipo, data, id,cargos,tests }: ModalProps) => {
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
        resetForm,
        setFieldValue
        
    } = useFormik({
        initialValues: initialState,
        onSubmit: async (value: IEvaluador) => {
           
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
            nombreEvaluador: Yup.string().required('Nombre es requerido!'),
            cargo_id: Yup.string().required('Cargo es requerido!'),
            nombreCargo: Yup.string().nullable(),
        })
    });


    const { apiStoreEvaluador } = UseStoreEvaluador(values);
    const { apiUpdateEvaluador } = UseUpdateEvaluador(values);
    
    useEffect(() => {
        alert('en desarrollo')
        console.log('acutlaizacion', data)
        console.log(tests, cargos)
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
            <form onSubmit={(e)=>{console.log(errors); handleSubmit(e)}  }>
                <DialogTitle id="responsive-dialog-title">
                    {tipo == 'nuevo' ? 'Añadir evaluador' : 'Editar evaluador'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                size='small'
                                name="nombreEvaluador"
                                label="Nombre de evaluacion"
                                fullWidth
                                autoComplete="given-name"
                                variant="standard"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                helperText={errors.nombreEvaluador}
                                error={!!errors.nombreEvaluador}
                                value={values.nombreEvaluador}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                size='small'
                                fullWidth
                                options={cargos}
                                getOptionLabel={(option: ICargo) => option.nombreCargo}
                                id="disable-close-on-select"
                                onChange={(event, value) => {
                                    console.log(value);
                                    setFieldValue('cargo_id',value?.cargo_id)
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Selecione Empresa" variant="standard" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                size='small'
                                fullWidth
                                options={cargos==undefined  ? [] : cargos}
                                getOptionLabel={(option: ICargo) => option.nombreCargo}
                                id="disable-close-on-select"
                                onChange={(event, value) => {
                                    console.log(value);
                                    setFieldValue('cargo_id',value?.cargo_id)
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Selecione cargo" variant="standard" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Autocomplete
                                size='small'
                                fullWidth
                                options={tests==undefined  ? [] : tests}
                                multiple
                                getOptionLabel={(option: ITest) => option.nombreTest}
                                id="disable-close-on-select"
                                onChange={(event, value) => {
                                    console.log(value)
                                    setFieldValue('tests',value)
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Selecione test" variant="standard" />
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