import { Box, Button, Card, CardContent, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import SimpleListMenu from '../tipoRespuesta/menu';
import AddIcon from '@mui/icons-material/Add';
import * as Yup from "yup";
import { FieldArray, Form, FormikProvider, useFormik } from 'formik';
import { initialStatePregunta } from '../utils/initialState';
import { IRespuesta } from '../../../../Services/Interface/pregunta';
import Abierta from '../respuestas/abierta';
import SelecionMultiple from '../respuestas/seleccion-multiple';
import SelecionUnica from '../respuestas/seleccion-unica';

const Constructor = () => {
  const validationSchema = Yup.object().shape({
    pregunta_id: Yup.number(),
    pregunta_nombre: Yup.string().max(3, "debe ser mayor a 3 caracteres"),
    respuestas: Yup.array()
      .of(Yup.object().shape({
        respuesta_id: Yup.string().max(3, "debe ser mayor a 3 caracteres"),
        tipo_respuesta_id: Yup.number(),
        respuesta_fija: Yup.string().max(3, "debe ser mayor a 3 caracteres"),
        recurso: Yup.string().max(3, "debe ser mayor a 3 caracteres"),
      }))
  });
  const formPregunta = useFormik({
    initialValues: initialStatePregunta,
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

  const [respuestas, setRespuestas] = useState<string[]>([]);
  const hadlerAddRespuesta = () => {
    console.log(values)
    const nuevoRespuesta: IRespuesta = {
      recurso: '',
      respuesta_fija: '',
      respuesta_id: 0,
      tipo_respuesta_id: 0
    }
    values.resultado.push(nuevoRespuesta);
    setValues({ ...values })
  }
  //metodos
  const hadlerDeleteRespuesta = (index: number) => {
    console.log(index)
    delete values.resultado[index];
    setValues({ ...values })
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormikProvider value={formPregunta}  >
          <Form autoComplete="off" >
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Crea una pregunta
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      required
                      fullWidth
                      label="Describa su pregunta"
                      variant="filled"
                      size='small'
                    />
                  </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                      <SimpleListMenu />
                      <div>
                        <Button
                          variant="contained"
                          size='small'
                          startIcon={<AddIcon />}
                          onClick={hadlerAddRespuesta}
                        >
                          Añadir respuesta
                        </Button>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <FieldArray
                      name="atributos"
                      render={arrayRespuesta => {
                        const atributos = values.resultado;
                        return (
                          <Grid container spacing={2}>
                            <Grid item sm={12} xs={12}>
                              {atributos && atributos.length > 0 ? (
                                atributos.map((atributo, index) => {
                                  const valor: number = 2;
                                  switch (valor) {
                                    case 1:
                                      return (
                                        <Abierta
                                          key={index}
                                          index={index}
                                          descripcionRespuesta='Describa una respuesta'
                                          onDelete={hadlerDeleteRespuesta} />
                                      )
                                    case 2:
                                      return (
                                        <SelecionMultiple
                                          key={index}
                                          index={index}
                                          descripcionRespuesta='Describa cada seleccion'
                                          onDelete={hadlerDeleteRespuesta} />
                                      )
                                    case 3:
                                      return (
                                        <SelecionUnica
                                          key={index}
                                          index={index}
                                          descripcionRespuesta='Describa una respuesta'
                                          onDelete={hadlerDeleteRespuesta} />
                                      )
                                  }
                                })) : null
                              }
                            </Grid>
                          </Grid>
                        )
                      }}
                    />
                    {/*  {
                      respuestas.map((respuesta, i) => {
                        switch (i) {
                          case 0:
                            return (
                              <Paper key={i} elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'grey.200' }}>
                                <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Describa repuesta {respuesta}
                                  </Typography>
                                  <Button variant="contained" color='error' size='small' startIcon={<DeleteIcon />}>
                                    Eliminar
                                  </Button>
                                </Box>
                                <br />

                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={12}>
                                    <TextField
                                      required
                                      fullWidth
                                      label="Respuesta abierta"
                                      variant="filled"
                                      size='small'
                                    />
                                  </Grid>
                                </Grid>
                              </Paper>
                            );
                          case 1:
                            return (
                              <Paper key={i} elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'grey.200' }}>
                                <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Seleccion unica {respuesta}
                                  </Typography>
                                  <Button variant="contained" color='error' size='small' startIcon={<DeleteIcon />}>
                                    Eliminar
                                  </Button>
                                </Box>
                                <br />

                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={12}>
                                    <TextField
                                      required
                                      fullWidth
                                      label="Respuesta abierta"
                                      variant="filled"
                                      size='small'
                                    />
                                  </Grid>
                                </Grid>
                              </Paper>
                            );
                          case 2:
                            return (
                              <Paper key={i} elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'grey.200' }}>
                                <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Seleccion multiple{respuesta}
                                  </Typography>
                                  <Button variant="contained" color='error' size='small' startIcon={<DeleteIcon />}>
                                    Eliminar
                                  </Button>
                                </Box>
                                <br />

                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={12}>
                                    <TextField
                                      required
                                      fullWidth
                                      label="Respuesta abierta"
                                      variant="filled"
                                      size='small'
                                    />
                                  </Grid>
                                </Grid>
                              </Paper>
                            );
                          case 3:
                            return (
                              <Paper key={i} elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'grey.200' }}>
                                <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Suba un imagen{respuesta}
                                  </Typography>
                                  <Button variant="contained" color='error' size='small' startIcon={<DeleteIcon />}>
                                    Eliminar
                                  </Button>
                                </Box>
                                <br />

                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={12}>
                                    <TextField
                                      required
                                      fullWidth
                                      label="Respuesta abierta"
                                      variant="filled"
                                      size='small'
                                    />
                                  </Grid>
                                </Grid>
                              </Paper>
                            );
                          case 4:
                            return (
                              <Paper key={i} elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'grey.200' }}>
                                <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    ordenar imagenes {respuesta}
                                  </Typography>
                                  <Button variant="contained" color='error' size='small' startIcon={<DeleteIcon />}>
                                    Eliminar
                                  </Button>
                                </Box>
                                <br />

                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={12}>
                                    <TextField
                                      required
                                      fullWidth
                                      label="Respuesta abierta"
                                      variant="filled"
                                      size='small'
                                    />
                                  </Grid>
                                </Grid>
                              </Paper>
                            );
                          default:
                            break;
                        }

                      })
                    } */}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Form>
        </FormikProvider>
      </Grid>
    </Grid >
  )
}

export default Constructor
