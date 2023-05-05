import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, useMediaQuery, useTheme } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IEmpresa } from '../../../../Services/Interface/empresas';
import UseCreateEmpresa from '../../hooks/useCreateEmpresa';
import { useContext, useEffect } from 'react';
import UseStoreEmpresa from '../../hooks/useStoreEmpresa';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import useUpdateEmpresa from '../../hooks/useUpdateEmpresa';
import UseUpdateEmpresa from '../../hooks/useUpdateEmpresa';

const initialState: IEmpresa = {
  dirrecion: '',
  empresa_id: 0,
  nombreEmpresa: '',
  nombreRespresentante: '',
  telefono: ''
}
interface ModalProps {
  openModal: boolean;
  tipo: string;
  id?: number;
  data: IEmpresa;
  onClose: () => void;
}
const ModalEmpresa = ({ openModal, onClose, tipo, data, id }: ModalProps) => {
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
    onSubmit: async (value: IEmpresa) => {
      switch (tipo) {
        case 'nuevo':
          const store = await apiStoreEmpresa();
          if (store) {
            setDatatable(true);
            onClose();
            resetForm();
          }
          else {
          }
          break;
        case 'editar':
          const update = await apiUpdateEmpresa();
          if (update) {
            setDatatable(true);
            onClose();
            resetForm();
          }
          else {
          }
          break;
        default:
          break;
      }

    },
    validationSchema: Yup.object({
      empresa_id: Yup.number().nullable(),
      nombreEmpresa: Yup.string().required('Es nombre'),
      dirrecion: Yup.string().required('Es dirrecion'),
      telefono: Yup.string().required('Es telefono'),
      nombreRespresentante: Yup.string().required('Es nombre reprentante'),
    })
  });


  const { apiStoreEmpresa } = UseStoreEmpresa(values);
  const { apiUpdateEmpresa } = UseUpdateEmpresa(values);
  useEffect(() => {
    console.log('acutlaizacion', data)
    setValues(data)

    return () => {

    }
  }, [openModal])

  return (
    <Dialog
      open={openModal}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="responsive-dialog-title">
          {tipo == 'nuevo' ? 'Añadir empresa' : 'Editar empresa'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                size='small'
                name="nombreEmpresa"
                label="Nombre"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.nombreEmpresa}
                error={!!errors.nombreEmpresa}
                value={values.nombreEmpresa}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size='small'
                name="dirrecion"
                label="Dirrecion"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.dirrecion}
                error={!!errors.dirrecion}
                value={values.dirrecion}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size='small'
                name="telefono"
                label="Telefono"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.telefono}
                error={!!errors.telefono}
                value={values.telefono}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                size='small'
                name="nombreRespresentante"
                label="Nombre Respresentante"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.nombreRespresentante}
                error={!!errors.nombreRespresentante}
                value={values.nombreRespresentante}
              />
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
            color='success'
          >
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog >
  )
}

export default ModalEmpresa;