import { SearchState, DataTypeProvider, SortingState, IntegratedFiltering, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, SearchPanel, Table, TableHeaderRow, Toolbar, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Box, Button, Chip, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Loading } from '../../../../Components/loading/loading';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import ModalEvaluador from '../modal-evaluador/modal-evaluador';
import useDataGridPostulanteEvaluacion from './hooks/useDataGridPostulanteEvaluacion';
interface DataTablePostulanteEvaluacionProps {
    id: number
}
export const DataTablePostulanteEvaluacion = ({ id }: DataTablePostulanteEvaluacionProps) => {
    const [dataTable, setDatatable] = useState<boolean>(true);

    const [tipo, setTipo] = useState('')
    const [tableColumnExtensions] = useState([
        { columnName: 'ci', width: 175, wordWrapEnabled: true },
        { columnName: 'nombreCompleto', width: 200, wordWrapEnabled: true },
        { columnName: 'token', width: 450, wordWrapEnabled: true },

    ]);
    const [columns] = useState([
        { name: 'ci', title: 'CI' },
        { name: 'nombreCompleto', title: 'Nombre completo' },
        { name: 'token', title: 'Url' },

    ]);
    const [loading, setLoading] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const [dateColumnsNombreEstado] = useState(['postulante_evaluacion_id']);

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

    const [onModal, setOnModal] = useState(false)
    const [onModalDelete, setOnModalDelete] = useState(false)
    const { rows, apiLisEvaluacionPostulante } = useDataGridPostulanteEvaluacion();

    useEffect(() => {
        if (dataTable) {
            apiLisEvaluacionPostulante(id);
        }
        setDatatable(false);
    }, [dataTable])

    return (
        <ContextUpdateDateTable.Provider value={{ dataTable, setDatatable }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Typography variant='subtitle1' sx={{ pt: 1 }}>Lista postulante</Typography>
                {/* <Button
                    sx={{
                        mb: 2,
                        textTransform: "none"
                    }}
                    size='small'
                    variant="contained"
                    onClick={() => { setOnModal(true); setTipo('nuevo') }}
                >
                    Añadir evaluacion
                </Button> */}
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

                    <Toolbar />
                    <SearchPanel />

                </Grid>
                {loading && <Loading />}
            </Paper>

        </ContextUpdateDateTable.Provider>
    )
}

