import { Box, Button, FormControlLabel, Grid, Paper, Radio, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

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
export interface ChangeRespuestaValor {
    value_valor: string;
    name_valor: string;
    onChangeRespuestaValor(e: React.ChangeEvent<any>): void;
}
export interface RespuestaValueProps {
    indexPregunta: number;
    indexrespuesta: number;
    descripcionRespuesta: string;
    onDelete(i: number): void
    fieldRespuestaDescripcion: changeRespuestaDescripcion
    fieldRespuestaImagen: ChangeRespuestaImagen,
    fieldRespuestaValor: ChangeRespuestaValor
}
const SelecionUnica = ({
    descripcionRespuesta,
    indexPregunta,
    indexrespuesta,
    onDelete,
    fieldRespuestaDescripcion,
    fieldRespuestaImagen,
    fieldRespuestaValor
}: RespuestaValueProps) => {
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
                        <RadioButtonCheckedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            sx={{ mt: 0 }}
                            fullWidth id="input-with-sx"
                            label="Selecione una opcion"
                            variant="standard"
                            name={fieldRespuestaDescripcion.name_descripcion}
                            value={fieldRespuestaDescripcion.value_descripcion}
                            onChange={(e) => { fieldRespuestaDescripcion.onChangeRespuestaDescripcion(e) }}
                        />
                        <FormControlLabel value="" control={
                            <Radio
                                checked={fieldRespuestaValor.value_valor === '1'}
                                onChange={fieldRespuestaValor.onChangeRespuestaValor}
                                value={fieldRespuestaValor.value_valor}
                                name={fieldRespuestaValor.name_valor}
                                inputProps={{ 'aria-label': '1' }}

                            />
                        } label="Correcto" />

                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SelecionUnica
