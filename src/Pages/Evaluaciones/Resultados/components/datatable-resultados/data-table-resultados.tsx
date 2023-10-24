import { SearchState, DataTypeProvider, SortingState, IntegratedFiltering, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, SearchPanel, Table, TableHeaderRow, Toolbar, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Box, Button, Card, Chip, Paper, Typography } from '@mui/material';
import { Grid as GridMui } from '@mui/material';
import { useEffect, useState, } from 'react';
import * as Yup from 'yup';

import FeedIcon from '@mui/icons-material/Feed';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useNavigate } from 'react-router-dom';
import { Loading } from '../../../../../Components/loading/loading';
import UseResultado from '../../../hooks/useResultado';
import { ITestResultos } from '../../../../../Services/Interface/ResultadoTest';
import { IPostulante } from '../../../../../Services/Interface/postulantes';
import { initialStatePostulante } from '../../../../Postulantes/componets/modal-postulante/utils/initialPostulantes';
import { IEvaluacion } from '../../../../../Services/Interface/configEvaluador';
import AlertaResultado from '../aleta-resultados/alerta-resutados';

interface DataTablePostulanteEvaluacionResultadoProps {
    evaluacionId: number,
    postulanteId: number
}
export const DataTablePostulanteEvaluacionResultado = ({ evaluacionId, postulanteId }: DataTablePostulanteEvaluacionResultadoProps) => {
    const navigate = useNavigate();
    const [rows, setRows] = useState<ITestResultos[]>([]);
    const [postulante, setPostulante] = useState<IPostulante>(initialStatePostulante);
    const [evaluacion, setEvaluacion] = useState<IEvaluacion>({
        cargo_id: 0,
        dia: 0,
        estadoId: 0,
        evaluacion_id: 0,
        fechaCreacion: '',
        fechaFin: '',
        fechaInicio: '',
        nombreCargo: '',
        nombreEvaluacion: '',
        nota: '',
        tests: []
    });
    const [openModalAlerta, setOpenModalAlerta] = useState(false);
    const [messageAlerta, setMessageAlerta] = useState('');
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

    const exportExcel = (tipoPreguntaId: number, row: any) => {
        console.log(tipoPreguntaId)
        if (tipoPreguntaId == 10 || tipoPreguntaId == 9 || tipoPreguntaId == 7 ) {
            window.open(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/resultado-report/report_excel/${row.evaluacion_id}/${row.postulante_id}/${row.test_evaluacion_id}/${row.resultado_test_id}`, '_blank');
        }
        else {
            setOpenModalAlerta(true);
            setMessageAlerta('Resultados disponibles para el formato PDF')
        }
    }
    const exportPdf = (tipoPreguntaId: number, row: any) => {
        console.log(row)
        if (tipoPreguntaId == 1 || tipoPreguntaId == 4 || tipoPreguntaId == 11 || tipoPreguntaId == 12 || tipoPreguntaId == 13 || tipoPreguntaId == 6) {
            window.open(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/resultado-report/report_pdf/${row.evaluacion_id}/${row.postulante_id}/${row.test_evaluacion_id}/${row.resultado_test_id}`, '_blank');
        }
        else {
            setOpenModalAlerta(true);
            setMessageAlerta('Resultados disponibles para el formato EXCEL')
        }
    }

    const CurrencyFormatterPDF = ({ value, row, column }: any) => {
        const completado = row.completado as string;
        const tipoPreguntaId = row.tipo_preguntas_id as number;
        return completado == 'si' ? (
            <Chip
                label={'Descarga PDF'}
                color="success"
                style={{ margin: 1 }}
                icon={<PictureAsPdfIcon />}
                onClick={() => { exportPdf(tipoPreguntaId, row) }} />
        ) : null
    };
    const CurrencyFormatterEXCEL = ({ value, row, column }: any) => {
        const completado = row.completado as string;
        const tipoPreguntaId = row.tipo_preguntas_id as number;
        return completado == 'si' ? (
            <Chip
                label={'Descarga EXCEL'}
                color="success"
                style={{ margin: 1 }}
                icon={<FeedIcon />}
                onClick={() => { exportExcel(tipoPreguntaId, row) }} />
            /*  onClick={() => {
                 window.open(`${process.env.REACT_APP_API_CONSULTER_HOME}/api/resultado-report/report_excel/${row.evaluacion_id}/${row.postulante_id}/${row.test_id}`, '_blank');
             }} /> */
        ) : null

    };
    const CurrencyFormatterVer = ({ value }: any) => {
        return (
            <>
                {/* <Chip
                label={'Ver'}
                color="info"
                style={{ margin: 1 }}
                icon={<VisibilityIcon />}
                onClick={() => {

                }} /> */}
            </>
        )
    };


    const { apiList } = UseResultado();

    const Index = async () => {
        const { data, status } = await apiList(evaluacionId, postulanteId);
        console.log('resultado de api ', data)
        setRows(data!.tests);
        setPostulante(data!.postulante)
        setEvaluacion(data!.evaluacion)
    }

    useEffect(() => {
        Index()
    }, [])

    return (
        <>
            <GridMui item xl={12} md={12} >
                <Card>
                    <div style={{ margin: 15 }}>
                        <p style={{ margin: 3, fontSize: 13 }}><strong> Nombres: </strong>
                            {
                                postulante.nombre
                            } </p>
                        <p style={{ margin: 3, fontSize: 13 }}><strong> Apellidos: </strong>
                            {
                                postulante.apellidos
                            } </p>
                        {/* <p style={{ margin: 0, fontSize: 13 }}><strong> Fecha Inicio: </strong>
                        {

                        } </p>

                    <p style={{ margin: 0, fontSize: 13 }}><strong> Fecha Fin: </strong>
                        {

                        } </p> */}
                    </div>
                </Card>
            </GridMui>
            <br />
            <Paper style={{ position: 'relative' }}>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <Typography variant='subtitle2' sx={{ p: 1 }}>Total Test asignados</Typography>

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
            <AlertaResultado message={messageAlerta} onClose={() => { setOpenModalAlerta(false) }} openModal={openModalAlerta} ></AlertaResultado>
        </>
    )
}

