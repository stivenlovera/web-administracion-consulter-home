import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IEmpresa } from '../../../../Services/Interface/empresas';
import { useContext, useEffect } from 'react';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import UseDeletePostulante from '../../hooks/useEliminarPostulante';
import { IPostulante } from '../../../../Services/Interface/postulantes';
import dayjs from 'dayjs';

const initialState: IPostulante = {
  ci: '',
  apellidos: '',
  dirrecion: '',
  email: '',
  postulante_id: 0,
  fecha_nacimiento: dayjs(),
  nombre: '',
  telefono: ''
}
interface ModalProps {
  openModal: boolean;
  id: number;
  onClose: () => void;
}
const ModalEliminarPostulante = ({ openModal, onClose, id }: ModalProps) => {
  const { dataTable, setDatatable } = useContext(ContextUpdateDateTable);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const {
    isValid,
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    setValues,
    resetForm
  } = useFormik({
    initialValues: initialState,
    onSubmit: async (value: IPostulante) => {
      const eliminar = await apiDeletePostulante();
      if (eliminar) {
        setDatatable(true);
        onClose();
        resetForm();
      }
    }
  });


  const { apiDeletePostulante } = UseDeletePostulante(id);
  useEffect(() => {
    return () => {
    }
  }, [openModal])

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openModal}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="responsive-dialog-title">
          ¿Esta seguro de eliminar?
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography variant='body2'>
                Este proceso es irreversible
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            size='small'
            type='button'
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            size='small'
            type='submit'
            color='error'
          >
            Eliminar
          </Button>
        </DialogActions>
      </form>
    </Dialog >
  )
}

export default ModalEliminarPostulante;