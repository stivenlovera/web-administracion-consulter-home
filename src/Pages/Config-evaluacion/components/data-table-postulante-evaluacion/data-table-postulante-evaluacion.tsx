import { SearchState, DataTypeProvider, SortingState, IntegratedFiltering, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, SearchPanel, Table, TableHeaderRow, Toolbar, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Box, Button, Chip, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Loading } from '../../../../Components/loading/loading';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import useDataGridPostulanteEvaluacion from './hooks/useDataGridPostulanteEvaluacion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';
interface DataTablePostulanteEvaluacionProps {
    id: number
}
export const DataTablePostulanteEvaluacion = ({ id }: DataTablePostulanteEvaluacionProps) => {
    const navigate = useNavigate();
    const [dataTable, setDatatable] = useState<boolean>(true);

    const [tipo, setTipo] = useState('')
    const [tableColumnExtensions] = useState([
        { columnName: 'ci', width: 120, wordWrapEnabled: true },
        { columnName: 'nombreCompleto', width: 350, wordWrapEnabled: true },
        { columnName: 'token', width: 450, wordWrapEnabled: true },
        { columnName: 'postulante_id', width: 175, wordWrapEnabled: true },
        { columnName: 'evaluacion_id', width: 175, wordWrapEnabled: true },
    ]);
    const [columns] = useState([
        { name: 'ci', title: 'CI' },
        { name: 'nombreCompleto', title: 'Nombre completo' },
        { name: 'token', title: 'Url' },
        { name: 'postulante_id', title: 'Whatsapp' },
        { name: 'evaluacion_id', title: 'Ver detalle' },
    ]);
    const [loading, setLoading] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const [dateColumnsNombreEstado] = useState(['postulante_evaluacion_id']);
    const [dateColumnsDetalle] = useState(['evaluacion_id']);
    const [dateColumnsPostulante] = useState(['postulante_id']);

    
    const CurrencyTypeDetalle = (props: any) => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatterDetalle}
            {...props}
        />
    );
    const CurrencyFormatterDetalle = ({ value, row, column }: any) => {
        return (
            <Chip
                label={'Ver detalle'}
                color='success'
                icon={<PlayArrowIcon />}
                onClick={() => {
                    navigate(`/evaluacion-detalle/${row.evaluacion_id}/${row.postulante_id}`)
                }}
            />
        )
    };
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

    const CurrencyTypeWhatsapp = (props: any) => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatterWhatsapp}
            {...props}
        />
    );
    const CurrencyFormatterWhatsapp = ({ value, row, column }: any) => {
        return (
            <Chip
                label={'Enviar mensaje'}
                color='success'
                icon={<WhatsAppIcon />}
                onClick={() => {
                    console.log(row)
                    window.open(`https://api.whatsapp.com/send?phone=591${row.telefono}&text=Aqui esta enlace para realizar su evaluacion ${encodeURIComponent(row.token)}`, '_blank');
                }}
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
                    <CurrencyTypeDetalle
                        for={dateColumnsDetalle}
                    />
                     <CurrencyTypeWhatsapp
                        for={dateColumnsPostulante}
                    />
                    <Toolbar />
                    <SearchPanel />

                </Grid>
                {loading && <Loading />}
            </Paper>

        </ContextUpdateDateTable.Provider>
    )
}

