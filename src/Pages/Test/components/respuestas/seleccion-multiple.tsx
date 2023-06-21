import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AbiertaProps } from './abierta';

const SelecionMultiple = ({ descripcionRespuesta, index, onDelete }: AbiertaProps) => {
    return (
        <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'grey.200' }}>
            <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {index + 1}. Opcion
                </Typography>
                <Button variant="contained" color='error' size='small' startIcon={<DeleteIcon />} onClick={() => onDelete(index)}>
                    Eliminar
                </Button>
            </Box>
            <br />
            <Grid container spacing={2} >
                <Grid item xs={12} md={12} >
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                        <CheckBoxIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField sx={{ mt: 0 }} fullWidth id="input-with-sx" label="seleccion multiple" variant="standard" />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SelecionMultiple
