import { SearchState, DataTypeProvider, SortingState, IntegratedFiltering, IntegratedSorting, PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import { Grid, PagingPanel, SearchPanel, Table, TableHeaderRow, Toolbar, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Loading } from '../../../../Components/loading/loading';
import UseListEmpresa from '../../hooks/useListPostulante';
import ModalPostulante from '../modal-postulante/modal-postulante';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import UseEditarEmpresa from '../modal-postulante/hooks/useEditarPostulante';
import UseCreateEmpresa from '../modal-postulante/hooks/useCreatePostulante';
import ModalEliminarPostulante from '../modal-delete-postulante/modal-delete-postulante';

export const DataTablePostulante = () => {
    const [dataTable, setDatatable] = useState<boolean>(true);

    const [modeEditar, setModeEditar] = useState(false)
    const [id, setId] = useState(0)
    const [tableColumnExtensions] = useState([
        { columnName: 'nombre', wordWrapEnabled: true },
        { columnName: 'nombre', wordWrapEnabled: true },
        { columnName: 'apellidos', wordWrapEnabled: true },
        { columnName: 'fecha_nacimiento', wordWrapEnabled: true },
        { columnName: 'nombreEstadoPostulante', wordWrapEnabled: true },
        { columnName: 'email', width: 180, wordWrapEnabled: true },
        { columnName: 'postulante_id', width: 180, wordWrapEnabled: true },
    ]);
    const [columns] = useState([
        { name: 'ci', title: 'CI' },
        { name: 'nombre', title: 'Nombres' },
        { name: 'apellidos', title: 'Apellidos' },
        { name: 'fecha_nacimiento', title: 'Fecha nacimiento' },
        { name: 'email', title: 'Email' },
        { name: 'nombreEstadoPostulante', title: 'Estado' },
        { name: 'telefono', title: 'Telefono' },
        { name: 'postulante_id', title: 'Acciones' },
    ]);
    const [loading, setLoading] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [currencyColumns] = useState(['empresa_id']);
    const [dateColumnsPostulanteId] = useState(['postulante_id']);

    const [onModal, setOnModal] = useState(false)
    const [onModalDelete, setOnModalDelete] = useState(false)
    const { rows, apiListPostulante } = UseListEmpresa();
    const { apiCreatePostulantes, create, estadoCivilCreate, estadoPostulanteCreate } = UseCreateEmpresa();
    const { apEditarPostulante, editar, estadoCivilEditar, estadoPostulanteEditar } = UseEditarEmpresa();

    /*METODOS */
    const onChangeCreate = async () => {
        if (await apiCreatePostulantes()) {
            setOnModal(true);
            setModeEditar(false);
        }
    }
    const onChangeEditar = async (id: number) => {

        if (await apEditarPostulante(id)) {
            setOnModal(true);
            setModeEditar(true);
            setId(id);
        }
    }

    const onChangeEliminar = async (id: number) => {
        setOnModalDelete(true);
        setId(id);
    }

    useEffect(() => {
        if (dataTable) {
            apiListPostulante();
        }
        setDatatable(false);
        return () => {

        }
    }, [dataTable])

    const CurrencyFormatter = ({ value }: any) => {
        //console.log(value)
        return (
            <>
                <Button
                    sx={{ mr: 1, textTransform: "none" }}
                    variant="contained"
                    size='small'
                    onClick={() => onChangeEditar(value)}
                >
                    Editar
                </Button>
                <Button
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    color="error"
                    size='small'
                    onClick={() => { onChangeEliminar(value) }}
                >
                    Eliminar
                </Button>
            </>
        )
    };
    const CurrencyTypeProvider = (props: any) => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatter}
            {...props}
        />
    );
    return (
        <ContextUpdateDateTable.Provider value={{ dataTable, setDatatable }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Typography variant='subtitle1' sx={{ pt: 1 }}>Lista Postulantes</Typography>
                <Button
                    sx={{
                        mb: 2,
                        textTransform: "none"
                    }}
                    size='small'
                    variant="contained"
                    onClick={onChangeCreate}
                >
                    Añadir Postulante
                </Button>
            </Box>
            <Paper style={{ position: 'relative' }}>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <SearchState
                        onValueChange={setSearchValue}
                    />
                    <SortingState
                        defaultSorting={[{ columnName: 'postulante_id', direction: 'asc' }]}
                    />
                    <IntegratedFiltering />
                    <IntegratedSorting />
                    <Table columnExtensions={tableColumnExtensions} />
                    <TableHeaderRow showSortingControls />
                    <CurrencyTypeProvider
                        for={dateColumnsPostulanteId}
                    />
                    <Toolbar />
                    <SearchPanel />

                    {/*  <PagingState
                        defaultCurrentPage={0}
                        pageSize={5}
                    />
                    <IntegratedPaging />
                    <PagingPanel /> */}
                </Grid>
                {loading && <Loading />}
            </Paper>
            <ModalPostulante
                onClose={() => { setOnModal(false) }}
                data={{
                    postulante:modeEditar ? editar : create,
                    estadoCivil:modeEditar ? estadoCivilEditar : estadoCivilCreate,
                    estadoPostulante:modeEditar ? estadoPostulanteEditar : estadoPostulanteCreate
                }}
                openModal={onModal}
                editar={modeEditar}
                id={id}
            />
            <ModalEliminarPostulante
                onClose={() => { setOnModalDelete(false) }}
                id={id}
                openModal={onModalDelete}
            />
        </ContextUpdateDateTable.Provider>
    )
}

