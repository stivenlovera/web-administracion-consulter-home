import { Box, Button, CardMedia, Grid, Paper, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ImagenNoDisponible from '../../../../assests/imagenes/no-disponible.png'
import { RespuestaProps } from './abierta';

const SubirArchivo = ({
    descripcionRespuesta,
    indexPregunta,
    indexrespuesta,
    onDelete,
    fieldRespuestaDescripcion,
    fieldRespuestaImagen
}: RespuestaProps) => {
    return (
        <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'grey.200' }}>
            <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Subir archivo
                </Typography>
                <Button variant="contained" color='error' size='small' startIcon={<DeleteIcon />} onClick={() => onDelete(indexrespuesta)}>
                    Eliminar respuesta
                </Button>
            </Box>
            <Grid container spacing={2} >
                <Grid item xs={12} md={12} >
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                        <Grid item xs={12} md={12}>
                            <div style={{ display: 'flex' }}>
                                <CardMedia
                                    style={{ maxWidth: '30%', margin: 'auto' }}
                                    component="img"
                                    image={ImagenNoDisponible}
                                    alt="Paella dish"
                                />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <TextField
                                    
                                    fullWidth
                                    sx={{ mt: 0 }}
                                    label="Describa para el boton"
                                    variant="standard"
                                    name={fieldRespuestaDescripcion.name_descripcion}
                                    value={fieldRespuestaDescripcion.value_descripcion}
                                    onChange={(e) => { fieldRespuestaDescripcion.onChangeRespuestaDescripcion(e) }}
                                />
                            </div>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SubirArchivo