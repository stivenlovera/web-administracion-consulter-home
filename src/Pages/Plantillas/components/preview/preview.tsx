import { Box, Button, Card, CardContent, CardMedia, Checkbox, Chip, FormControlLabel, Grid, Paper, Radio, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import ImagenNoDisponible from '../../../../assests/imagenes/no-disponible.png'
import { ContextRespuesta } from '../../../../Context/ContextRespuesta';

const VistaPrevia = () => {
    //STATE
    const { plantilla, setPlantilla } = useContext(ContextRespuesta);
    const { descripcion_test, nombreTest, test_id, preguntas, pasos, procedimiento, tiempo_total, tipo_preguntas_id } = plantilla;
    console.log(plantilla)
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ margin: 0, padding: 0 }}>
                    <Typography style={{ fontSize: 14 }} color="text.secondary">
                        VISTA PREVIA EN EL MENU
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ minWidth: 275 }} >
                        <CardContent>
                            <div style={{ border: '1px solid #22A9DF', padding: 10 }}>
                                <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                                    <Typography variant='subtitle1' gutterBottom align='left'>
                                        {descripcion_test}
                                    </Typography>
                                    {
                                        tiempo_total == 0 ? (null) : (<Chip label={`Duracion ${tiempo_total} min.`} color="primary" />)
                                    }
                                </Box>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <br />

            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ margin: 0, padding: 0 }}>
                    <Typography style={{ fontSize: 14 }} color="text.secondary">
                        VISTA PREVIA
                    </Typography>
                </Grid>
                <Grid item xl={8} lg={8} md={12} sm={12} xs={12}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Grid item xs={12} md={12}>
                                <Typography variant='subtitle1'>
                                    {descripcion_test}
                                </Typography>
                            </Grid>
                            {
                                preguntas.map((pregunta, index) => {
                                    return (
                                        <Grid container spacing={2} key={index}>
                                            <Grid item xs={12} md={12}>
                                                <Typography variant='subtitle2' >
                                                    {index + 1}.- {pregunta.pregunta_nombre}
                                                </Typography>
                                                {
                                                    pregunta.imagen != '' ? (
                                                        <CardMedia
                                                            style={{ maxWidth: '80%', margin: 'auto' }}
                                                            component="img"
                                                            image={pregunta.imagen == '' ? ImagenNoDisponible : pregunta.imagen}
                                                            alt="Paella dish"
                                                        />
                                                    )
                                                        : null
                                                }
                                            </Grid>
                                            {
                                                pregunta.respuestas.map((respuesta, i) => {
                                                    switch (tipo_preguntas_id) {
                                                        case 1:
                                                            return (
                                                                <Grid style={{ paddingBottom: 15 }} item xs={12} md={12} key={i}>

                                                                    <TextField
                                                                        required
                                                                        fullWidth
                                                                        label={respuesta.descripcion}
                                                                        variant="filled"
                                                                        size='small'
                                                                    />
                                                                </Grid>
                                                            )
                                                        case 2:
                                                            return (
                                                                <Grid style={{ paddingLeft: '15%', paddingTop: 0 }} item xs={12} md={12} key={i}>
                                                                    <FormControlLabel value="female" control={<Radio />} label={respuesta.descripcion} />
                                                                </Grid>
                                                            )
                                                        case 3:
                                                            return (
                                                                <Grid style={{ paddingLeft: '15%', paddingTop: 0 }} item xs={12} md={12} key={i}>
                                                                    <FormControlLabel control={< Checkbox defaultChecked />} label={respuesta.descripcion} />
                                                                </Grid>
                                                            )
                                                        case 4:
                                                            return (
                                                                <Grid item xs={12} md={12} key={i}>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <CardMedia
                                                                            style={{ maxWidth: '30%', margin: 'auto' }}
                                                                            component="img"
                                                                            image={ImagenNoDisponible}
                                                                            alt="Paella dish"
                                                                        />
                                                                    </div>
                                                                    <div style={{ textAlign: 'center' }}>
                                                                        <Button
                                                                            size='small'
                                                                            variant="contained"
                                                                            sx={{ textTransform: 'none', mt: 1 }}
                                                                        >
                                                                            {respuesta.descripcion}
                                                                        </Button>
                                                                    </div>
                                                                </Grid>
                                                            )
                                                        case 5:
                                                            return (
                                                                <Grid item lg={3} xl={2} xs={2} md={2} key={i}>
                                                                    <div style={{ display: 'flex' }}>
                                                                        <CardMedia
                                                                            style={{ maxWidth: '80%', margin: 'auto' }}
                                                                            component="img"
                                                                            image={respuesta.imagen == '' ? ImagenNoDisponible : respuesta.imagen}
                                                                            alt="Paella dish"
                                                                        />
                                                                    </div>
                                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom textAlign={'center'}>
                                                                        {respuesta.descripcion}
                                                                    </Typography>
                                                                </Grid>
                                                            )
                                                    }
                                                })
                                            }
                                        </Grid>
                                    )
                                })
                            }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
                    <Card >
                        <CardContent>
                            <Typography variant='subtitle1' gutterBottom align='left'>
                                {procedimiento}
                            </Typography>
                            <ol>
                                {
                                    pasos.map((paso, i) => {
                                        return (
                                            <li key={i}>
                                                <p>{paso.descripcion}</p>
                                                {paso.imagen != '' ? (
                                                    <CardMedia
                                                        style={{ maxWidth: '80%', margin: 'auto' }}
                                                        component="img"
                                                        image={paso.imagen == '' ? ImagenNoDisponible : paso.imagen}
                                                        alt="Paella dish"
                                                    />
                                                ) : null
                                                }

                                            </li>
                                        )
                                    })
                                }
                            </ol>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default VistaPrevia
