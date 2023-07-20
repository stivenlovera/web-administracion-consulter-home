import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { RespuestaProps } from './abierta';

const SelecionMultiple = ({
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
                    {indexrespuesta + 1}. Opcion
                </Typography>
                <Button variant="contained" color='error' size='small' startIcon={<DeleteIcon />} onClick={() => onDelete(indexrespuesta)}>
                     Eliminar respuesta
                </Button>
            </Box>
            <Grid container spacing={2} >
                <Grid item xs={12} md={12} >
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                        <CheckBoxIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            sx={{ mt: 0 }}
                            fullWidth
                            label="seleccion multiple"
                            variant="standard"
                            name={fieldRespuestaDescripcion.name_descripcion}
                            value={fieldRespuestaDescripcion.value_descripcion}
                            onChange={(e) => { fieldRespuestaDescripcion.onChangeRespuestaDescripcion(e) }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SelecionMultiple
