import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
export interface AbiertaProps {
    index: number;
    descripcionRespuesta: string;
    onDelete(i: number): void
}
const Abierta = ({ descripcionRespuesta, index, onDelete }: AbiertaProps) => {
    return (
        <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'grey.200' }}>
            <Box sx={{ justifyContent: 'space-between', display: "flex", flexWrap: "wrap" }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {descripcionRespuesta}
                </Typography>
                <Button variant="contained" color='error' size='small' startIcon={<DeleteIcon />} onClick={() => onDelete(index)}>
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
    )
}

export default Abierta
