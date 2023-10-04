import { Box, Button, CardMedia, FormControlLabel, Grid, Paper, Radio, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ImagenNoDisponible from '../../../../assests/imagenes/no-disponible.png'
import { RespuestaProps } from './abierta';
import { readUploadedFileAsText } from '../../../../Utils/FileBase64';

const SelecionImagen = ({
    descripcionRespuesta,
    indexPregunta,
    indexrespuesta,
    onDelete,
    fieldRespuestaDescripcion,
    fieldRespuestaImagen,
    fieldRespuestaValor
}: RespuestaProps) => {
    const onChangeImagen = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const converImagen = await readUploadedFileAsText(e);
        fieldRespuestaImagen.onChangeRespuestaImagen(converImagen);
    }
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
                            <label style={{ display: 'flex' }} htmlFor={`image-upload-${indexPregunta}-${indexrespuesta}`}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id={`image-upload-${indexPregunta}-${indexrespuesta}`}
                                    name={fieldRespuestaDescripcion.name_descripcion}
                                    //value={fieldRespuestaRecurso.value_recurso}
                                    onChange={(e) => { fieldRespuestaImagen.onChangeRespuestaImagen(e); }}
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
                                    image={fieldRespuestaImagen.value_imagen == '' ? ImagenNoDisponible : fieldRespuestaImagen.value_imagen}
                                    alt="Imagen"
                                />
                            </label>
                            <div style={{ textAlign: 'center' }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    sx={{ mt: 0 }}
                                    label="Describa para la imagen"
                                    name={fieldRespuestaDescripcion.name_descripcion}
                                    value={fieldRespuestaDescripcion.value_descripcion}
                                    onChange={(e) => { fieldRespuestaDescripcion.onChangeRespuestaDescripcion(e); console.log('indexrespuesta selecionado', indexrespuesta) }}
                                />
                                <Button
                                    size='small'
                                    variant="contained"
                                    sx={{ textTransform: 'none', mt: 1 }}
                                >
                                    Carga una imagen
                                </Button>
                            </div>
                            <FormControlLabel value="" control={
                                <Radio
                                    checked={fieldRespuestaValor!.value_valor === '1'}
                                    onChange={fieldRespuestaValor!.onChangeRespuestaValor}
                                    value={fieldRespuestaValor!.value_valor}
                                    name={fieldRespuestaValor!.name_valor}
                                    inputProps={{ 'aria-label': '1' }}

                                />
                            } label="Correcto" />
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SelecionImagen