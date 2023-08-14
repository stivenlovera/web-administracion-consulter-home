import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'

interface ModalProps {
    openModal: boolean;
    message: string;
    onClose: () => void;
}
const AlertaResultado = ({ message, onClose, openModal }: ModalProps) => {
    return (
        <Dialog
            open={openModal}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                Atencion
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <Typography variant='body2'>
                            {message}
                        </Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    size='small'
                    type='submit'
                    color='success'
                    onClick={onClose}
                >
                    ok
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default AlertaResultado
