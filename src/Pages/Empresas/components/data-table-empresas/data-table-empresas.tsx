import { SearchState, DataTypeProvider, SortingState, IntegratedFiltering, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, SearchPanel, Table, TableHeaderRow, Toolbar, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Loading } from '../../../../Components/loading/loading';
import UseListEmpresa from '../../hooks/useListEmpresa';
import ModalEmpresa from '../modal-empresa/modal-empresa';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import UseEditarEmpresa from '../../hooks/useEditarEmpresa';
import UseCreateEmpresa from '../../hooks/useCreateEmpresa';
import ModalEliminarEmpresa from '../modal-delete/modal-delete';

export const DataTableEmpresas = () => {
    const [dataTable, setDatatable] = useState<boolean>(true);

    const [tipo, setTipo] = useState('')
    const [id, setId] = useState(0)
    const [tableColumnExtensions] = useState([
        { columnName: 'nombreEmpresa' },
        { columnName: 'empresa_id', width: 180 },
    ]);
    const [columns] = useState([
        { name: 'nombreEmpresa', title: 'Empresa' },
        { name: 'nombreRespresentante', title: 'Representante' },
        { name: 'dirrecion', title: 'Dirrecion' },
        { name: 'telefono', title: 'Telefono' },
        { name: 'empresa_id', title: 'Acciones' },
    ]);
    const [loading, setLoading] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [currencyColumns] = useState(['empresa_id']);
    const [dateColumnsEmpresaId] = useState(['empresa_id']);

    const DateFormatter = ({ value }: any) => value.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');
    const DateTypeProvider = (props: any) => (
        <DataTypeProvider
            formatterComponent={DateFormatter}
            {...props}
        />
    );
    const CurrencyFormatter = ({ value }: any) => {
        return (
            <>
                <Button
                    sx={{ mr: 1, textTransform: "none" }}
                    variant="contained"
                    size='small'
                    onClick={async () => {
                        const estado = await apEditarEmpresa(value)
                        if (estado) {
                            setOnModal(true);
                            setTipo('editar');
                            console.log(value, tipo);
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
    const { rows, apiLisEmpresa } = UseListEmpresa();
    const { apiCreateEmpresa, create } = UseCreateEmpresa();
    const { apEditarEmpresa, editar } = UseEditarEmpresa();

    useEffect(() => {
        if (dataTable) {
            apiLisEmpresa();
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
                <Typography variant='subtitle1' sx={{ pt: 1 }}>Lista empresas</Typography>
                <Button
                    sx={{
                        mb: 2,
                        textTransform: "none"
                    }}
                    size='small'
                    variant="contained"
                    onClick={() => { setOnModal(true); setTipo('nuevo'); }}
                >
                    Añadir empresa
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
                        defaultSorting={[{ columnName: 'empresa_id', direction: 'asc' }]}
                    />
                    <IntegratedFiltering />
                    <IntegratedSorting />
                    <Table />
                    <TableHeaderRow showSortingControls />
                    <CurrencyTypeProvider
                        for={dateColumnsEmpresaId}
                    />
                    <Toolbar />
                    <SearchPanel />
                </Grid>
                {loading && <Loading />}
            </Paper>
            <ModalEmpresa
                onClose={() => { setOnModal(false) }}
                data={tipo == 'nuevo' ? create : editar}
                openModal={onModal}
                tipo={tipo}
                id={id}
            />
            <ModalEliminarEmpresa
                onClose={() => { setOnModalDelete(false) }}
                id={id}
                openModal={onModalDelete}
            />
        </ContextUpdateDateTable.Provider>
    )
}

