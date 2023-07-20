import { Button, Card, CardActions, CardContent, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { FieldArray, Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import { initialStatePlantilla } from '../../utils/initialStates';
import { IPlantilla } from '../../../../Services/Interface/plantilla';
import { IPregunta } from '../../../../Services/Interface/pregunta';
import ListPreguntas from './lis-pregunta';

const ConstructorPlantilla = () => {
    const validationSchema = Yup.object().shape({
        plantilla_id: Yup.number(),
        plantilla_nombre: Yup.string(),
        plantilla_descripcion: Yup.string(),
        tiempo_respuesta: Yup.number(),
        preguntas: Yup.array()
            .of(Yup.object().shape({
                pregunta_id: Yup.number()
            }))
    });
    const formPregunta = useFormik({
        initialValues: initialStatePlantilla,
        validationSchema,
        onSubmit: async (values) => {

        }
    });
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        touched,
        setFieldValue,
        setValues,
        resetForm,
    } = formPregunta;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ListPreguntas />
            </Grid>
            <Grid item xs={12}>
                <FormikProvider value={formPregunta} >
                    <Form onSubmit={(e) => { console.log(errors); handleSubmit(e) }}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    CREA TEST
                                </Typography>
                                <br />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Titulo de test"
                                            variant="filled"
                                            size='small'
                                            name='pregunta_nombre'
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Nombre de test (no visible)"
                                            variant="filled"
                                            size='small'
                                            name='pregunta_nombre'
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>

                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FieldArray
                                            name="plantillas"
                                            render={arrayRespuesta => {
                                                const preguntas = values.preguntas;
                                                return (
                                                    <Grid container spacing={2}>
                                                        <Grid item sm={12} xs={12}>
                                                            {preguntas && preguntas.length > 0 ? (
                                                                preguntas.map((pregunta: IPregunta, index: number) => {
                                                                    return (
                                                                        <>
                                                                        </>
                                                                    );
                                                                })) : null
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                )
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color='success' type='submit' variant='contained'>Registrar</Button>
                            </CardActions>
                        </Card>
                    </Form>
                </FormikProvider>
            </Grid>
        </Grid >
    )
}

export default ConstructorPlantilla
