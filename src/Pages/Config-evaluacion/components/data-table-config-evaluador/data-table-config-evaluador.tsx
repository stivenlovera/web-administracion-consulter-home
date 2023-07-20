import { SearchState, DataTypeProvider, SortingState, IntegratedFiltering, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, SearchPanel, Table, TableHeaderRow, Toolbar, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Box, Button, Chip, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Loading } from '../../../../Components/loading/loading';
import UseListEvaluador from '../../hooks/useListEvaluador';
import UseCreateEvaluador from '../../hooks/useCreateEvaluador';
import UseEditarEvaluador from '../../hooks/useEditarEvaluador';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import ModalEvaluador from '../modal-evaluador/modal-evaluador';
import ModalEvaluacionPostulante from '../modal-evaluacion-postulante/modal-evaluacion-postulante';

export const DataTableConfigEvaluador = () => {
    const [dataTable, setDatatable] = useState<boolean>(true);

    const [tipo, setTipo] = useState('')
    const [id, setId] = useState(0)
    const [tableColumnExtensions] = useState([
        { columnName: 'nombreEvaluacion', width: 200, wordWrapEnabled: true },
        { columnName: 'fechaCreacion', width: 200, wordWrapEnabled: true },
        { columnName: 'nombreCargo', width: 180, wordWrapEnabled: true },
        { columnName: 'nombreEmpresa', wordWrapEnabled: true },
        { columnName: 'nombreEstado', wordWrapEnabled: true },
        { columnName: 'tests', width: 150, wordWrapEnabled: true },
        { columnName: 'postulantes', width: 150, wordWrapEnabled: true },
        { columnName: 'evaluacion_id', width: 175, wordWrapEnabled: true },
    ]);
    const [columns] = useState([
        { name: 'nombreEvaluacion', title: 'Nombre evaluacion' },
        { name: 'fechaCreacion', title: 'Fecha registro' },
        { name: 'nombreCargo', title: 'Cargo' },
        { name: 'nombreEmpresa', title: 'Empresa' },
        { name: 'nombreEstado', title: 'Estado' },
        { name: 'tests', title: 'Test' },
        { name: 'postulantes', title: 'Postulantes' },
        { name: 'evaluacion_id', title: 'Acciones' },
    ]);
    const [loading, setLoading] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const [dateColumnsEvaluacionId] = useState(['evaluacion_id']);
    const [dateColumnsTest] = useState(['tests']);
    const [dateColumnsPostulantes] = useState(['postulantes']);
    const [dateColumnsNombreEstado] = useState(['nombreEstado']);

    const CurrencyFormatterAcciones = ({ value }: any) => {
        return (
            <>
                <Button
                    sx={{ mr: 1, textTransform: "none" }}
                    variant="contained"
                    size='small'
                    onClick={async () => {
                        const estado = await apEditarEvaluador(value)
                        if (estado) {
                            setModal(true);
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
                    onClick={() => { }}
                >
                    Eliminar
                </Button>
            </>
        )
    };

    const CurrencyTypeAcciones = (props: any) => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatterAcciones}
            {...props}
        />
    );
    const CurrencyFormatterPostulantes = (data: any) => {
        return (
            <Chip
                label={`${data.value} Postulantes`}
                color='info'
                onClick={() => { setId(data.row.evaluacion_id); setModalPostulante(true) }}
            />
        )
    };

    const CurrencyTypePostulantes = (props: any) => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatterPostulantes}
            {...props}
        />
    );

    const CurrencyFormatterTest = ({ value }: any) => {
        return (
            <Chip
                label={`${value} Tests`}
                color='info'
                onClick={() => { }}
            />
        )
    };
    const CurrencyTypeTest = (props: any) => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatterTest}
            {...props}
        />
    );

    const CurrencyTypeEstado = (props: any) => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatterEstado}
            {...props}
        />
    );
    const CurrencyFormatterEstado = ({ value }: any) => {
        let color: any = 'default'
        switch (value) {
            case 'En Progreso':
                color = 'warning';
                break;
            case 'Finalizado':
                color = 'success';
                break;
            default:
                color = 'default';
                break;
        }
        return (
            <Chip
                label={`${value}`}
                color={color}
            />
        )
    };

    const [modal, setModal] = useState(false)
    const [onModalDelete, setOnModalDelete] = useState(false)
    const [modalPostulante, setModalPostulante] = useState(false)
    const { rows, apiLisEvaluador } = UseListEvaluador();
    const { apiCreateEvaluador, create, cargos, tests, empresas, postulantes, estados } = UseCreateEvaluador();
    const { apEditarEvaluador, editar, cargosEdit, empresasEdit, estadosEdit, postulantesEdit, testsEdit } = UseEditarEvaluador();

    useEffect(() => {
        if (dataTable) {
            apiLisEvaluador();
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
                <Typography variant='subtitle1' sx={{ pt: 1 }}>Lista evaluaciones</Typography>
                <Button
                    sx={{
                        mb: 2,
                        textTransform: "none"
                    }}
                    size='small'
                    variant="contained"
                    onClick={() => { setModal(true); setTipo('nuevo'); apiCreateEvaluador() }}
                >
                    Añadir evaluacion
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
                        defaultSorting={[{ columnName: 'nombreEvaluacion', direction: 'asc' }]}
                    />
                    <IntegratedFiltering />
                    <IntegratedSorting />
                    <Table columnExtensions={tableColumnExtensions} />
                    <TableHeaderRow showSortingControls />

                    <CurrencyTypeEstado
                        for={dateColumnsNombreEstado}
                    />
                    <CurrencyTypeAcciones
                        for={dateColumnsEvaluacionId}
                    />
                    <CurrencyTypePostulantes
                        for={dateColumnsPostulantes}
                    />
                    <CurrencyTypeTest
                        for={dateColumnsTest}
                    />

                    <Toolbar />
                    <SearchPanel />

                </Grid>
                {loading && <Loading />}
            </Paper>
            <ModalEvaluador
                onClose={() => { setModal(false) }}
                data={tipo == 'nuevo' ? create : editar}
                openModal={modal}
                tipo={tipo}
                id={id}
                cargos={tipo == 'nuevo' ? cargos : cargosEdit}
                tests={tipo == 'nuevo' ? tests : testsEdit}
                empresas={tipo == 'nuevo' ? empresas : empresasEdit}
                postulantes={tipo == 'nuevo' ? postulantes : postulantesEdit}
                estados={tipo == 'nuevo' ? estados : estadosEdit}
            />
            <ModalEvaluacionPostulante
                id={id}
                onClose={() => { setModalPostulante(false) }}
                openModal={modalPostulante}
            />
        </ContextUpdateDateTable.Provider>
    )
}

