import { Button, Card, CardContent, CardMedia, Checkbox, FormControlLabel, Grid, Paper, Radio, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import ImagenNoDisponible from '../../../../assests/imagenes/no-disponible.png'
import { ContextRespuesta } from '../../../../Context/ContextRespuesta';

const VistaPreviaPlantilla = () => {
    //STATE
    const { plantilla, setPlantilla } = useContext(ContextRespuesta);
    const { descripcion_test, nombreTest, test_id, preguntas, tipo_preguntas_id } = plantilla;
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            VISTA PREVIA
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <ul>
                                    <li>
                                        <Typography variant='h6' >
                                            {nombreTest}
                                        </Typography>
                                    </li>
                                </ul>
                            </Grid>
                            {
                                /*  respuestas.map((respuesta, i) => {
                                     switch (respuesta.tipo_respuesta_id) {
                                         case 1:
                                             return (
                                                 <Grid style={{ paddingLeft: '15%' }} item xs={12} md={12} key={i}>
                                                     <TextField
                                                         required
                                                         fullWidth
                                                         label={respuesta.respuesta_fija}
                                                         variant="filled"
                                                         size='small'
                                                     />
                                                 </Grid>
                                             )
                                         case 2:
                                             return (
                                                 <Grid style={{ paddingLeft: '15%' }} item xs={12} md={12} key={i}>
                                                     <FormControlLabel value="female" control={<Radio />} label={respuesta.respuesta_fija} />
                                                 </Grid>
                                             )
                                         case 3:
                                             return (
                                                 <Grid style={{ paddingLeft: '15%' }} item xs={12} md={12} key={i}>
                                                     <FormControlLabel control={< Checkbox defaultChecked />} label={respuesta.respuesta_fija} />
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
                                                             {respuesta.respuesta_fija}
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
                                                             image={respuesta.recurso == '' ? ImagenNoDisponible : respuesta.recurso}
                                                             alt="Paella dish"
                                                         />
                                                     </div>
                                                     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom textAlign={'center'}>
                                                         {respuesta.respuesta_fija}
                                                     </Typography>
                                                 </Grid>
                                             )
                                     }
                                 }) */
                            }
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid >
    )
}

export default VistaPreviaPlantilla
