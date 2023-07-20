import { SearchState, DataTypeProvider, SortingState, IntegratedFiltering, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, SearchPanel, Table, TableHeaderRow, Toolbar, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Box, Button, Chip, Paper, Typography } from '@mui/material';
import { useEffect, useState, } from 'react';
import * as Yup from 'yup';

import FeedIcon from '@mui/icons-material/Feed';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useNavigate } from 'react-router-dom';
import { Loading } from '../../../../../Components/loading/loading';
import UseResultado from '../../../hooks/useResultado';
import { IResultadoTest } from '../../../../../Services/Interface/ResultadoTest';

interface DataTablePostulanteEvaluacionResultadoProps {
    evaluacionId: number,
    postulanteId: number
}
export const DataTablePostulanteEvaluacionResultado = ({ evaluacionId, postulanteId }: DataTablePostulanteEvaluacionResultadoProps) => {
    const navigate = useNavigate();
    const [rows, setRows] = useState<IResultadoTest[]>([]);
    const [tableColumnExtensions] = useState([
        { columnName: 'descripcion_test', wordWrapEnabled: true },
        { columnName: 'completado', width: 150, wordWrapEnabled: true },
        { columnName: 'evaluacion_id', width: 175, wordWrapEnabled: true },
        { columnName: 'test_id', width: 175, wordWrapEnabled: true },
        { columnName: 'procedimiento', width: 175, wordWrapEnabled: true }
    ]);
    const [columns] = useState([
        { name: 'descripcion_test', title: 'Nombre Test' },
        { name: 'completado', title: 'Completado' },
        { name: 'test_id', title: 'PDF' },
        { name: 'evaluacion_id', title: 'EXCEL' },
        { name: 'procedimiento', title: 'Ver' }
    ]);
    const [loading, setLoading] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const [dateColumnsVer] = useState(['procedimiento']);
    const [dateColumnsPDF] = useState(['test_id']);
    const [dateColumnsEXCEL] = useState(['evaluacion_id']);

    const CurrencyTypeEXCEL = (props: any) => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatterEXCEL}
            {...props}
        />
    );
    const CurrencyTypePDF = (props: any) => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatterPDF}
            {...props}
        />
    );
    const CurrencyTypeVer = (props: any) => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatterVer}
            {...props}
        />
    );
    const CurrencyFormatterPDF = ({ value, row, column }: any) => {
        console.log(row)
        return (
            <Chip
                label={'Descarga PDF'}
                color="success"
                style={{ margin: 1 }}
                icon={<PictureAsPdfIcon />}
                onClick={() => {
                    window.open(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/resultado-report/report_pdf/${row.evaluacion_id}/${row.postulante_id}/${row.test_id}`, '_blank');
                }} />
        )
    };
    const CurrencyFormatterEXCEL = ({ value }: any) => {
        return (
            <Chip
                label={'Descarga EXCEL'}
                color="success"
                style={{ margin: 1 }}
                icon={<FeedIcon />}
                onClick={() => {

                }} />
        )
    };
    const CurrencyFormatterVer = ({ value }: any) => {
        return (
            <Chip
                label={'Ver'}
                color="info"
                style={{ margin: 1 }}
                icon={<VisibilityIcon />}
                onClick={() => {

                }} />
        )
    };


    const { apiList } = UseResultado();

    const Index = async () => {
        const { data, status } = await apiList(evaluacionId, postulanteId);
        setRows(data!);
    }
    useEffect(() => {
        Index()
    }, [])

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Typography variant='subtitle1' sx={{ pt: 1 }}>Total resultados</Typography>
                
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

                    <CurrencyTypeVer
                        for={dateColumnsVer}
                    />
                    <CurrencyTypePDF
                        for={dateColumnsPDF}
                    />
                    <CurrencyTypeEXCEL
                        for={dateColumnsEXCEL}
                    />
                    <Toolbar />
                    <SearchPanel />

                </Grid>
                {loading && <Loading />}
            </Paper>

        </>
    )
}

