import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
export interface changeRespuestaDescripcion {
    value_descripcion: string;
    name_descripcion: string;
    onChangeRespuestaDescripcion(e: React.ChangeEvent<any>): void;
}
export interface ChangeRespuestaImagen {
    value_imagen: string;
    name_imagen: string;
    onChangeRespuestaImagen(e: React.ChangeEvent<any>): void;
}
export interface RespuestaProps {
    indexPregunta: number;
    indexrespuesta: number;
    descripcionRespuesta: string;
    onDelete(i: number): void
    fieldRespuestaDescripcion: changeRespuestaDescripcion
    fieldRespuestaImagen: ChangeRespuestaImagen
}
const Abierta = ({
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
                    {descripcionRespuesta}
                </Typography>
                <Button variant="contained" color='error' size='small' startIcon={<DeleteIcon />} onClick={() => onDelete(indexrespuesta)}>
                    Eliminar respuesta
                </Button>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TextField
                        fullWidth
                        sx={{ mt: 0 }}
                        label="Describa una respuesta"
                        variant="standard"
                        name={fieldRespuestaDescripcion.name_descripcion}
                        value={fieldRespuestaDescripcion.value_descripcion}
                        onChange={(e) => { fieldRespuestaDescripcion.onChangeRespuestaDescripcion(e) }}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Abierta
