import { SearchState, DataTypeProvider, SortingState, IntegratedFiltering, IntegratedSorting, PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import { Grid, PagingPanel, SearchPanel, Table, TableHeaderRow, Toolbar, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Backdrop, Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Loading } from '../../../Components/loading/loading';
import { Link } from 'react-router-dom';
import { IPostulante } from '../../../Services/Interface/postulantes';
import usePlantilla from './hook/usePlantilla';
import { IPlantilla } from '../../../Services/Interface/plantilla';

export const DataTablePlantillas = () => {
    const [loading, setLoading] = useState(true)
    const [dataTable, setDatatable] = useState<boolean>(true);
    const [id, setId] = useState(0)
    const [tableColumnExtensions] = useState([
        { columnName: 'nombreTest', wordWrapEnabled: true },
        { columnName: 'descripcion_test', wordWrapEnabled: true },
        { columnName: 'tiempo_respuesta', wordWrapEnabled: true },
        { columnName: 'test_id', width: 180, wordWrapEnabled: true },
    ]);
    const [columns] = useState([
        { name: 'nombreTest', title: 'Nombre plantilla' },
        { name: 'descripcion_test', title: 'Descripcion' },
        { name: 'tiempo_respuesta', title: 'Tiempo respuesta' },
        { name: 'test_id', title: 'Acciones' },
    ]);

    const [searchValue, setSearchValue] = useState('');
    const [dateColumnsPostulanteId] = useState(['test_id']);

    const [onModal, setOnModal] = useState(false)
    const [onModalDelete, setOnModalDelete] = useState(false)
    const [rows, setRows] = useState<IPlantilla[]>([]);

    /*API */
    const { List } = usePlantilla();
    const loadTable = async () => {
        const data = await List();
        setRows(data)
        setLoading(false)
    }
    /*METODOS */

    const onChangeEliminar = async (id: number) => {
        setOnModalDelete(true);
        setId(id);
    }

    useEffect(() => {
        loadTable()
    }, [dataTable])

    const CurrencyFormatter = ({ value }: any) => {
        return (
            <>
                <Link to={`/test/editar/${value}`}>
                    <Button
                        sx={{ mr: 1, textTransform: "none" }}
                        variant="contained"
                        size='small'
                    >
                        Editar
                    </Button>
                </Link>
                <Button
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    color="error"
                    size='small'
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
        <>
            {/* <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop> */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Typography variant='subtitle1' sx={{ pt: 1 }}>Lista Test (plantillas)</Typography>
                <Link to={'/test/create'}>
                    <Button
                        sx={{
                            mb: 2,
                            textTransform: "none"
                        }}
                        size='small'
                        variant="contained"
                        onClick={() => {

                        }}
                    >
                        Añadir Test
                    </Button>
                </Link>
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
                        defaultSorting={[{ columnName: 'test_id', direction: 'asc' }]}
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

        </>
    )
}

