import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, useMediaQuery, useTheme } from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect } from 'react';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import { ICargo } from '../../../../Services/Interface/cargo';
import UseStoreCargo from '../../hooks/useStoreCargo';
import UseUpdateCargo from '../../hooks/useUpdateCargo';

const initialState: ICargo = {
  cargo_id: 0,
  nombreCargo: ''
}
interface ModalProps {
  openModal: boolean;
  tipo: string;
  id?: number;
  data: ICargo;
  onClose: () => void;
}
const ModalCargo = ({ openModal, onClose, tipo, data, id }: ModalProps) => {
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
    validationSchema: Yup.object({
      cargo_id: Yup.number().nullable(),
      nombreCargo: Yup.string().required('Es nombre requerido'),
    }),
    initialValues: initialState,
    onSubmit: async (value: ICargo) => {
      switch (tipo) {
        case 'nuevo':
          const store = await apiStoreCargo();
          if (store) {
            setDatatable(true);
            onClose();
            resetForm();
          }
          else {
          }
          break;
        case 'editar':
          const update = await apiUpdateCargo();
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
  });


  const { apiStoreCargo } = UseStoreCargo(values);
  const { apiUpdateCargo } = UseUpdateCargo(values);
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
          {tipo == 'nuevo' ? 'Añadir cargo' : 'Editar cargo'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                size='small'
                name="nombreCargo"
                label="Nombre"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.nombreCargo}
                error={!!errors.nombreCargo}
                value={values.nombreCargo}
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

export default ModalCargo;