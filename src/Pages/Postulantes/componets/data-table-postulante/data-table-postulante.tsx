import { SearchState, DataTypeProvider, SortingState, IntegratedFiltering, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, SearchPanel, Table, TableHeaderRow, Toolbar, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Loading } from '../../../../Components/loading/loading';
import UseListEmpresa from '../../hooks/useListPostulante';
import ModalPostulante from '../modal-postulante/modal-postulante';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import UseEditarEmpresa from '../../hooks/useEditarPostulante';
import UseCreateEmpresa from '../../hooks/useCreatePostulante';
import ModalEliminarPostulante from '../modal-delete-postulante/modal-delete-postulante';

export const DataTablePostulante = () => {
    const [dataTable, setDatatable] = useState<boolean>(true);

    const [tipo, setTipo] = useState('')
    const [id, setId] = useState(0)
    const [tableColumnExtensions] = useState([
        { columnName: 'nombre', wordWrapEnabled: true },
        { columnName: 'nombre', wordWrapEnabled: true },
        { columnName: 'apellidos', wordWrapEnabled: true },
        { columnName: 'fecha_nacimiento', wordWrapEnabled: true },
        { columnName: 'dirrecion', wordWrapEnabled: true },
        { columnName: 'email', width: 180, wordWrapEnabled: true },
        { columnName: 'postulante_id', width: 180, wordWrapEnabled: true },
    ]);
    const [columns] = useState([
        { name: 'ci', title: 'CI' },
        { name: 'nombre', title: 'Nombres' },
        { name: 'apellidos', title: 'Apellidos' },
        { name: 'fecha_nacimiento', title: 'Fecha nacimiento' },
        { name: 'email', title: 'Email' },
        { name: 'dirrecion', title: 'Dirrecion' },
        { name: 'telefono', title: 'Telefono' },
        { name: 'postulante_id', title: 'Acciones' },
    ]);
    const [loading, setLoading] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [currencyColumns] = useState(['empresa_id']);
    const [dateColumnsPostulanteId] = useState(['postulante_id']);

    const DateFormatter = ({ value }: any) => value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');
    const DateTypeProvider = (props: any) => (
        <DataTypeProvider
            formatterComponent={DateFormatter}
            {...props}
        />
    );
    const CurrencyFormatter = ({ value }: any) => {
        console.log(value)
        return (
            <>
                <Button
                    sx={{ mr: 1, textTransform: "none" }}
                    variant="contained"
                    size='small'
                    onClick={async () => {
                        const estado = await apEditarPostulante(value)
                        if (estado) {
                            setOnModal(true);
                            setTipo('editar');
                            setId(value);
                        }
                    }}
                >
                    Editar
                </Button>
                <Button
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    color="error"
                    size='small'
                    onClick={() => { setOnModalDelete(true); setId(value); }}
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

    const [onModal, setOnModal] = useState(false)
    const [onModalDelete, setOnModalDelete] = useState(false)
    const { rows, apiListPostulante } = UseListEmpresa();
    const { apiCreatePostulantes, create } = UseCreateEmpresa();
    const { apEditarPostulante, editar } = UseEditarEmpresa();

    useEffect(() => {
        if (dataTable) {
            apiListPostulante();
        }
        setDatatable(false);
        return () => {

        }
    }, [dataTable])

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
                    onClick={() => { setOnModal(true); setTipo('nuevo'); }}
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
                </Grid>
                {loading && <Loading />}
            </Paper>
            <ModalPostulante
                onClose={() => { setOnModal(false) }}
                data={tipo == 'nuevo' ? create : editar}
                openModal={onModal}
                tipo={tipo}
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

