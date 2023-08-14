import { Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, FormControlLabel, Grid, Paper, Switch, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import SimpleListMenu from '../tipoRespuesta/menu';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Yup from "yup";
import { FieldArray, Form, FormikProvider, useFormik } from 'formik';
import { initialStatePlantilla } from '../utils/initialState';
import { IPregunta, IRespuesta } from '../../../../Services/Interface/pregunta';
import Abierta from '../respuestas/abierta';
import SelecionMultiple from '../respuestas/seleccion-multiple';
import SelecionUnica from '../respuestas/seleccion-unica';
import { ITipoPregunta } from '../../../../Services/Interface/tipoRespuesta';
import SubirArchivo from '../respuestas/subir-archivo';
import SelecionImagen from '../respuestas/selecion-imagen';
import { ContextRespuesta } from '../../../../Context/ContextRespuesta';
import { readUploadedFileAsText } from '../../../../Utils/FileBase64';
import usePlantilla from '../hook/usePlantilla';
import { useNavigate } from "react-router-dom";
import ImagenNoDisponible from '../../../../assests/imagenes/no-disponible.png'
import { IProcedimiento } from '../../../../Services/Interface/plantilla';
import { useParams } from 'react-router-dom';

const options: ITipoPregunta[] = [
  {
    tipo_pregunta_id: 1,
    tipo_pregunta_nombre: 'Respuesta abierta'
  },
  {
    tipo_pregunta_id: 2,
    tipo_pregunta_nombre: 'Selecion unica'
  },
  {
    tipo_pregunta_id: 3,
    tipo_pregunta_nombre: 'Selecion multiple'
  },
  {
    tipo_pregunta_id: 4,
    tipo_pregunta_nombre: 'Subir archivo'
  },
  {
    tipo_pregunta_id: 5,
    tipo_pregunta_nombre: 'Ordenar imagenes'
  },
  {
    tipo_pregunta_id: 6,
    tipo_pregunta_nombre: 'Roshard'
  },
  {
    tipo_pregunta_id: 7,
    tipo_pregunta_nombre: 'KUDEN'
  },
  {
    tipo_pregunta_id: 8,
    tipo_pregunta_nombre: 'MMPI'
  },
  {
    tipo_pregunta_id: 9,
    tipo_pregunta_nombre: 'EYSENCK'
  },
  {
    tipo_pregunta_id: 10,
    tipo_pregunta_nombre: 'EDWARDS'
  },
];

interface PropsConstructor {
  edit: boolean
}
const Constructor = ({ edit }: PropsConstructor) => {
  const navigate = useNavigate();
  const { id } = useParams();
  //STATE
  const { plantilla, setPlantilla } = useContext(ContextRespuesta);
  const [option, setOption] = useState<ITipoPregunta>({
    tipo_pregunta_id: 0,
    tipo_pregunta_nombre: ''
  });
  const validationSchema = Yup.object().shape({
    test_id: Yup.number(),
    tiempo_total: Yup.number().required('Defina tiempo en minutos'),
    tipo_preguntas_id: Yup.number(),
    nombreTest: Yup.string().required('Nombre de registro'),
    descripcion_test: Yup.string().required('Nombre de la plantilla'),
    procedimiento: Yup.string(),
    pasos: Yup.array().of(
      Yup.object().shape({
        procedimiento_id: Yup.number(),
        imagen: Yup.string(),
        descripcion: Yup.string()
      })
    ),
    preguntas: Yup.array().of(
      Yup.object().shape({
        pregunta_id: Yup.number(),
        pregunta_nombre: Yup.string(),
        imagen: Yup.string(),
        tiempo_total: Yup.number(),
        respuestas: Yup.array()
          .of(Yup.object().shape({
            respuesta_id: Yup.string(),
            procesar: Yup.string(),
            descripcion: Yup.string(),
            imagen: Yup.string(),
            valor: Yup.string()
          }))
      })
    )
  });
  const formPregunta = useFormik({
    initialValues: initialStatePlantilla,
    validationSchema,
    onSubmit: async (values) => {
      if (edit) {
        console.log('modificando', values)
        Update({ values })
        navigate("/test");
      } else {
        Store({ values })
        navigate("/test");
      }
    }
  });
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    setFieldValue,
    handleBlur,
    setValues,
    resetForm,
  } = formPregunta;

  const { Store, Update } = usePlantilla();

  const hadlerAddProcedimiento = () => {
    const nuevoPaso: IProcedimiento = {
      imagen: '',
      descripcion: '',
      procedimiento_id: 0
    }
    values.pasos.push(nuevoPaso);
    setValues({ ...values })
  }
  const hadlerAddRespuesta = (indexPregunta: number) => {
    const nuevoRespuesta: IRespuesta = {
      imagen: '',
      respuesta_id: 0,
      descripcion: '',
      procesar: '',
      valor: '0'
    }
    values.preguntas[indexPregunta].respuestas.push(nuevoRespuesta);
    setValues({ ...values })
  }
  const hadlerAddPregunta = () => {
    const nuevoPregunta: IPregunta = {
      imagen: '',
      pregunta_id: 0,
      pregunta_nombre: '',
      tiempo_total: 0,
      respuestas: [],
    }
    values.preguntas.push(nuevoPregunta);
    setValues({ ...values })
  }

  //METODOS
  const hadlerDeleteRespuesta = (indexPregunta: number, index: number) => {
    values.preguntas[indexPregunta].respuestas.splice(index, 1)
    setValues({ ...values })
  }
  const hadlerDeletePregunta = (index: number) => {
    values.preguntas.splice(index, 1)
    setValues({ ...values })
  }

  const hadlerSelectTipoRespuesta = (option: ITipoPregunta) => {
    console.log(option)
    values.tipo_preguntas_id = option.tipo_pregunta_id;
    values.preguntas = []
    setValues({ ...values });
    setOption(option)
  }
  const hadlerDeletePaso = (index: number) => {
    values.pasos.splice(index, 1)
    setValues({ ...values })
  }

  useEffect(() => {
    //
    setValues(plantilla)
   // setPlantilla(values)
  }, [plantilla])

  const sumarTiempos = () => {
    values.preguntas.map((pregunta: IPregunta) => {
      values.tiempo_total = pregunta.tiempo_total;
    })
    setFieldValue('tiempo_total', values.tiempo_total)
  }

  const onSetValorRespuesta = (name: string, indexPregunta: number) => {
    values.preguntas[indexPregunta].respuestas.map((respuesta: IRespuesta) => {
      return respuesta.valor = '0';
    });
    console.log('limpiando respuestas', values.preguntas[indexPregunta].respuestas)
    console.log('añadiendo respuesta', name)
    setValues(values);
    setFieldValue(name, '1');
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ margin: 0, padding: 0 }}>
        <Typography style={{ fontSize: 14 }} color="text.secondary">
          CONSTRUCTOR
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ minWidth: 275 }} >
          <FormikProvider value={formPregunta} >
            <Form onSubmit={(e) => { console.log(errors); handleSubmit(e) }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      label="Nombre de plantilla (no visible) "
                      variant="filled"
                      size='small'
                      name='nombreTest'
                      value={values.nombreTest}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.nombreTest}
                      error={!!errors.nombreTest}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      label="Titulo de plantilla"
                      variant="filled"
                      size='small'
                      name='descripcion_test'
                      value={values.descripcion_test}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.descripcion_test}
                      error={!!errors.descripcion_test}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Card sx={{ border: '0px solid #22A9DF', background: '#F7F7F7' }}>
                      <CardContent>
                        <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                DESCRIBE PASOS PARA DESARROLLAR EL TEST
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <TextField
                                fullWidth
                                label="Nombre del procedimiento"
                                variant="filled"
                                size='small'
                                name='procedimiento'
                                value={values.procedimiento}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                helperText={errors.procedimiento}
                                error={!!errors.procedimiento}
                              />
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <Button
                                variant="contained"
                                size='small'
                                style={{ margin: 'auto' }}
                                startIcon={<AddIcon />}
                                onClick={hadlerAddProcedimiento}
                              >
                                Añadir pasos
                              </Button>
                            </Grid>
                            <Grid item xs={12} md={12} >
                              <FieldArray
                                name="pasos"
                                render={arrayPasos => {
                                  const pasos = values.pasos;
                                  return (
                                    <>
                                      {pasos && pasos.length > 0 ? (
                                        pasos.map((paso: IProcedimiento, i: number) => {
                                          return (
                                            <Card sx={{ border: '0px solid #22A9DF', m: 1 }} key={i}>
                                              <CardContent>
                                                <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                                                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    {`${i + 1}. Paso`}
                                                  </Typography>
                                                  <Button
                                                    variant="contained"
                                                    color='error'
                                                    size='small'
                                                    startIcon={<DeleteIcon />} onClick={() => { hadlerDeletePaso(i) }}
                                                  >
                                                    Eliminar paso
                                                  </Button>
                                                </Box>
                                                <br />
                                                <Grid container spacing={2} sx={{ background: 'white' }}>
                                                  <Grid item xs={12} md={12}>
                                                    <TextField
                                                      fullWidth
                                                      label="Descripcion pasos a seguir"
                                                      variant="filled"
                                                      size='small'
                                                      name={`pasos[${i}].descripcion`}
                                                      value={values.pasos[i].descripcion}
                                                      onChange={handleChange}
                                                      onBlur={handleBlur}
                                                    />
                                                  </Grid>
                                                  <Grid item xs={12} md={12} >
                                                    <Typography sx={{ fontSize: 14 }} align='center' color="text.secondary" gutterBottom>
                                                      Imagen para paso
                                                    </Typography>
                                                    <label style={{ display: 'flex' }} htmlFor={`image-pasos-${i}`}>
                                                      <input
                                                        type="file"
                                                        accept="image/*"
                                                        id={`image-pasos-${i}`}
                                                        name={`pasos[${i}].imagen`}
                                                        onChange={async (e) => {
                                                          const converImagen = await readUploadedFileAsText(e);
                                                          console.log(converImagen)
                                                          setFieldValue(`pasos[${i}].imagen`, converImagen);
                                                          console.log(values.pasos[i])
                                                        }}
                                                        hidden
                                                      />
                                                      <CardMedia
                                                        style={{
                                                          maxWidth: '30%',
                                                          margin: 'auto'
                                                        }}
                                                        sx={{
                                                          backgroundColor: 'white',
                                                          '&:hover': {
                                                            backgroundColor: '#94EFFF',
                                                            opacity: [0.9, 0.8, 0.7],
                                                          },
                                                          cursor: 'pointer'
                                                        }}
                                                        component="img"
                                                        image={values.pasos[i].imagen == '' ? ImagenNoDisponible : values.pasos[i].imagen}
                                                        alt="Imagen"
                                                      />
                                                    </label>
                                                  </Grid>
                                                </Grid>
                                              </CardContent>
                                            </Card >
                                          )
                                        }
                                        )) : null
                                      }
                                    </>
                                  )
                                }}
                              />
                            </Grid >
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                      <SimpleListMenu onSelect={(e) => { hadlerSelectTipoRespuesta(e) }} options={options} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Button
                      variant="contained"
                      size='small'
                      style={{ margin: 'auto' }}
                      startIcon={<AddIcon />}
                      onClick={hadlerAddPregunta}
                    >
                      Añadir preguntas
                    </Button>
                  </Grid>

                  <FieldArray
                    name="preguntas"
                    render={arrayPreguntas => {
                      const preguntas = values.preguntas;
                      return (
                        <>
                          {preguntas && preguntas.length > 0 ? (
                            preguntas.map((pregunta: IPregunta, i: number) => {
                              return (
                                <Grid item xs={12} md={12} key={i}>
                                  <Card sx={{ border: '1px solid #22A9DF' }}>
                                    <CardContent>
                                      <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                          CREA TU PREGUNTA
                                        </Typography>
                                        <Button
                                          variant="contained"
                                          color='error'
                                          size='small'
                                          startIcon={<DeleteIcon />} onClick={() => { hadlerDeletePregunta(i) }}
                                        >
                                          Eliminar pregunta
                                        </Button>
                                      </Box>
                                      <br />
                                      <Grid container spacing={2} >
                                        <Grid item xs={12} md={12} style={{ paddingTop: 0 }}>
                                          <TextField
                                            fullWidth
                                            sx={{ m: 0, p: 0 }}
                                            label="Describa su pregunta"
                                            variant="filled"
                                            size='small'
                                            name={`preguntas[${i}].pregunta_nombre`}
                                            value={values.preguntas[i].pregunta_nombre}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                          />

                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                          <TextField
                                            fullWidth
                                            type='number'
                                            label="Tiempo de respuesta"
                                            variant="filled"
                                            size='small'
                                            name={`preguntas[${i}].tiempo_total`}
                                            value={values.preguntas[i].tiempo_total}
                                            onChange={(e) => {
                                              handleChange(e)
                                              sumarTiempos()
                                            }}
                                            onBlur={handleBlur}
                                            helperText={errors.tiempo_total}
                                            error={!!errors.tiempo_total}
                                          />
                                        </Grid>
                                        <Grid item xs={6} md={6}>
                                          <FormControlLabel control={<Checkbox defaultChecked />} label="Ver por seccion" />
                                        </Grid>
                                        <Grid item xs={12} md={12} >
                                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Imagen para la pregunta
                                          </Typography>
                                          <label style={{ display: 'flex' }} htmlFor={`image-pregunta-${i}`}>
                                            <input
                                              type="file"
                                              accept="image/*"
                                              id={`image-pregunta-${i}`}
                                              name={`preguntas[${i}].imagen`}
                                              onChange={async (e) => {
                                                const converImagen = await readUploadedFileAsText(e);
                                                console.log(converImagen)
                                                //setFieldValue(`preguntas[${i}].respuestas[${index}].imagen`, converImagen)
                                                setFieldValue(`preguntas[${i}].imagen`, converImagen);
                                                console.log(values.preguntas[i])
                                              }}
                                              hidden
                                            />
                                            <CardMedia
                                              style={{
                                                maxWidth: '30%',
                                                margin: 'auto'
                                              }}
                                              sx={{
                                                backgroundColor: 'white',
                                                '&:hover': {
                                                  backgroundColor: '#94EFFF',
                                                  opacity: [0.9, 0.8, 0.7],
                                                },
                                                cursor: 'pointer'
                                              }}
                                              component="img"
                                              image={values.preguntas[i].imagen == '' ? ImagenNoDisponible : values.preguntas[i].imagen}
                                              alt="Imagen"
                                            />
                                          </label>
                                        </Grid>
                                      </Grid>
                                      <br />
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                          <div style={{ display: 'flex' }}>
                                            <Button
                                              variant="contained"
                                              size='small'
                                              style={{ margin: 'auto' }}
                                              startIcon={<AddIcon />}
                                              onClick={() => hadlerAddRespuesta(i)}
                                            >
                                              Añadir respuesta
                                            </Button>
                                          </div>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                          <FieldArray
                                            name="respuestas"
                                            render={arrayRespuesta => {
                                              const respuestas = values.preguntas[i].respuestas;
                                              return (
                                                <Grid container spacing={2}>
                                                  <Grid item sm={12} xs={12}>
                                                    {respuestas && respuestas.length > 0 ? (
                                                      respuestas.map((respuesta: IRespuesta, index: number) => {
                                                        switch (values.tipo_preguntas_id) {
                                                          case 1:
                                                            return (
                                                              <Abierta
                                                                key={index}
                                                                indexPregunta={i}
                                                                indexrespuesta={index}
                                                                descripcionRespuesta='Describa una respuesta'
                                                                onDelete={(e) => hadlerDeleteRespuesta(i, e)}
                                                                fieldRespuestaDescripcion={{
                                                                  name_descripcion: `preguntas[${i}].respuestas[${index}].descripcion`,
                                                                  onChangeRespuestaDescripcion: handleChange,
                                                                  value_descripcion: respuestas[index].descripcion
                                                                }}
                                                                fieldRespuestaImagen={{
                                                                  name_imagen: `preguntas[${i}].respuestas[${index}].imagen`,
                                                                  onChangeRespuestaImagen: handleChange,
                                                                  value_imagen: respuestas[index].imagen
                                                                }}
                                                              />
                                                            )
                                                          case 2:
                                                            return (
                                                              <SelecionUnica
                                                                key={index}
                                                                indexPregunta={i}
                                                                indexrespuesta={index}
                                                                descripcionRespuesta='Describa una respuesta'
                                                                onDelete={(e) => hadlerDeleteRespuesta(i, e)}
                                                                fieldRespuestaDescripcion={{
                                                                  name_descripcion: `preguntas[${i}].respuestas[${index}].descripcion`,
                                                                  onChangeRespuestaDescripcion: handleChange,
                                                                  value_descripcion: respuestas[index].descripcion
                                                                }}
                                                                fieldRespuestaImagen={{
                                                                  name_imagen: `preguntas[${i}].respuestas[${index}].imagen`,
                                                                  onChangeRespuestaImagen: handleChange,
                                                                  value_imagen: respuestas[index].imagen
                                                                }}
                                                                fieldRespuestaValor={{
                                                                  name_valor: `preguntas[${i}].respuestas[${index}].valor`,
                                                                  onChangeRespuestaValor: (e) => { onSetValorRespuesta(`preguntas[${i}].respuestas[${index}].valor`, i) },
                                                                  value_valor: respuestas[index].valor
                                                                }}
                                                              />
                                                            )
                                                          case 3:
                                                            return (
                                                              <SelecionMultiple
                                                                key={index}
                                                                indexPregunta={i}
                                                                indexrespuesta={index}
                                                                descripcionRespuesta='Describa cada seleccion'
                                                                onDelete={(e) => hadlerDeleteRespuesta(i, e)}
                                                                fieldRespuestaDescripcion={{
                                                                  name_descripcion: `preguntas[${i}].respuestas[${index}].descripcion`,
                                                                  onChangeRespuestaDescripcion: handleChange,
                                                                  value_descripcion: respuestas[index].descripcion
                                                                }}
                                                                fieldRespuestaImagen={{
                                                                  name_imagen: `preguntas[${i}].respuestas[${index}].imagen`,
                                                                  onChangeRespuestaImagen: handleChange,
                                                                  value_imagen: respuestas[index].imagen
                                                                }}
                                                              />

                                                            )
                                                          case 4:
                                                            return (
                                                              <SubirArchivo
                                                                key={index}
                                                                indexPregunta={i}
                                                                indexrespuesta={index}
                                                                descripcionRespuesta='Describa una respuesta'
                                                                onDelete={(e) => hadlerDeleteRespuesta(i, e)}
                                                                fieldRespuestaDescripcion={{
                                                                  name_descripcion: `preguntas[${i}].respuestas[${index}].descripcion`,
                                                                  onChangeRespuestaDescripcion: handleChange,
                                                                  value_descripcion: respuestas[index].descripcion
                                                                }}
                                                                fieldRespuestaImagen={{
                                                                  name_imagen: `preguntas[${i}].respuestas[${index}].imagen`,
                                                                  onChangeRespuestaImagen: handleChange,
                                                                  value_imagen: respuestas[index].imagen
                                                                }}
                                                              />
                                                            )
                                                          case 5:
                                                            return (
                                                              <SelecionImagen
                                                                key={index}
                                                                indexPregunta={i}
                                                                indexrespuesta={index}
                                                                descripcionRespuesta='Describa una respuesta'
                                                                onDelete={(e) => hadlerDeleteRespuesta(i, e)}
                                                                fieldRespuestaDescripcion={{
                                                                  name_descripcion: `preguntas[${i}].respuestas[${index}].descripcion`,
                                                                  onChangeRespuestaDescripcion: handleChange,
                                                                  value_descripcion: respuestas[index].descripcion
                                                                }}
                                                                fieldRespuestaImagen={{
                                                                  name_imagen: `preguntas[${i}].respuestas[${index}].imagen`,
                                                                  onChangeRespuestaImagen: async (e) => {
                                                                    const converImagen = await readUploadedFileAsText(e);
                                                                    setFieldValue(`preguntas[${i}].respuestas[${index}].imagen`, converImagen)
                                                                  },
                                                                  value_imagen: respuestas[index].imagen
                                                                }}
                                                              />
                                                            )
                                                          case 7:
                                                            return (
                                                              <SelecionUnica
                                                                key={index}
                                                                indexPregunta={i}
                                                                indexrespuesta={index}
                                                                descripcionRespuesta='Describa una respuesta'
                                                                onDelete={(e) => hadlerDeleteRespuesta(i, e)}
                                                                fieldRespuestaDescripcion={{
                                                                  name_descripcion: `preguntas[${i}].respuestas[${index}].descripcion`,
                                                                  onChangeRespuestaDescripcion: handleChange,
                                                                  value_descripcion: respuestas[index].descripcion
                                                                }}
                                                                fieldRespuestaImagen={{
                                                                  name_imagen: `preguntas[${i}].respuestas[${index}].imagen`,
                                                                  onChangeRespuestaImagen: handleChange,
                                                                  value_imagen: respuestas[index].imagen
                                                                }}
                                                                fieldRespuestaValor={{
                                                                  name_valor: `preguntas[${i}].respuestas[${index}].valor`,
                                                                  onChangeRespuestaValor: (e) => { onSetValorRespuesta(`preguntas[${i}].respuestas[${index}].valor`, i) },
                                                                  value_valor: respuestas[index].valor
                                                                }}
                                                              />
                                                            )
                                                          case 8:
                                                            return (
                                                              <SelecionUnica
                                                                key={index}
                                                                indexPregunta={i}
                                                                indexrespuesta={index}
                                                                descripcionRespuesta='Describa una respuesta'
                                                                onDelete={(e) => hadlerDeleteRespuesta(i, e)}
                                                                fieldRespuestaDescripcion={{
                                                                  name_descripcion: `preguntas[${i}].respuestas[${index}].descripcion`,
                                                                  onChangeRespuestaDescripcion: handleChange,
                                                                  value_descripcion: respuestas[index].descripcion
                                                                }}
                                                                fieldRespuestaImagen={{
                                                                  name_imagen: `preguntas[${i}].respuestas[${index}].imagen`,
                                                                  onChangeRespuestaImagen: handleChange,
                                                                  value_imagen: respuestas[index].imagen
                                                                }}
                                                                fieldRespuestaValor={{
                                                                  name_valor: `preguntas[${i}].respuestas[${index}].valor`,
                                                                  onChangeRespuestaValor: (e) => { onSetValorRespuesta(`preguntas[${i}].respuestas[${index}].valor`, i) },
                                                                  value_valor: respuestas[index].valor
                                                                }}
                                                              />
                                                            )
                                                          case 9:
                                                            return (
                                                              <SelecionUnica
                                                                key={index}
                                                                indexPregunta={i}
                                                                indexrespuesta={index}
                                                                descripcionRespuesta='Describa una respuesta'
                                                                onDelete={(e) => hadlerDeleteRespuesta(i, e)}
                                                                fieldRespuestaDescripcion={{
                                                                  name_descripcion: `preguntas[${i}].respuestas[${index}].descripcion`,
                                                                  onChangeRespuestaDescripcion: handleChange,
                                                                  value_descripcion: respuestas[index].descripcion
                                                                }}
                                                                fieldRespuestaImagen={{
                                                                  name_imagen: `preguntas[${i}].respuestas[${index}].imagen`,
                                                                  onChangeRespuestaImagen: handleChange,
                                                                  value_imagen: respuestas[index].imagen
                                                                }}
                                                                fieldRespuestaValor={{
                                                                  name_valor: `preguntas[${i}].respuestas[${index}].valor`,
                                                                  onChangeRespuestaValor: (e) => { onSetValorRespuesta(`preguntas[${i}].respuestas[${index}].valor`, i) },
                                                                  value_valor: respuestas[index].valor
                                                                }}
                                                              />
                                                            )
                                                          case 10:
                                                            return (
                                                              <SelecionUnica
                                                                key={index}
                                                                indexPregunta={i}
                                                                indexrespuesta={index}
                                                                descripcionRespuesta='Describa una respuesta'
                                                                onDelete={(e) => hadlerDeleteRespuesta(i, e)}
                                                                fieldRespuestaDescripcion={{
                                                                  name_descripcion: `preguntas[${i}].respuestas[${index}].descripcion`,
                                                                  onChangeRespuestaDescripcion: handleChange,
                                                                  value_descripcion: respuestas[index].descripcion
                                                                }}
                                                                fieldRespuestaImagen={{
                                                                  name_imagen: `preguntas[${i}].respuestas[${index}].imagen`,
                                                                  onChangeRespuestaImagen: handleChange,
                                                                  value_imagen: respuestas[index].imagen
                                                                }}
                                                                fieldRespuestaValor={{
                                                                  name_valor: `preguntas[${i}].respuestas[${index}].valor`,
                                                                  onChangeRespuestaValor: (e) => { onSetValorRespuesta(`preguntas[${i}].respuestas[${index}].valor`, i) },
                                                                  value_valor: respuestas[index].valor
                                                                }}
                                                              />
                                                            )
                                                        }
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
                                  </Card>
                                </Grid>
                              )
                            })) : null
                          }
                        </>

                      )
                    }}
                  />

                </Grid>
              </CardContent>
              <CardActions>
                <Button size="small" color='success' type='submit' variant='contained'>Registrar</Button>
              </CardActions>
            </Form>
          </FormikProvider>
        </Card>
      </Grid>
    </Grid >
  )
}

export default Constructor
