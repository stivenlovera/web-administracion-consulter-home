import { SearchState, DataTypeProvider, SortingState, IntegratedFiltering, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, SearchPanel, Table, TableHeaderRow, Toolbar, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Loading } from '../../../../Components/loading/loading';
import { ContextUpdateDateTable } from '../../../../Context/Context';
import ModalEliminarEmpresa from '../modal-delete/modal-delete';
import UseListCargo from '../../hooks/useListCargo';
import UseCreateCargo from '../../hooks/useCreateCargo';
import UseEditarCargo from '../../hooks/useEditarCargo';
import ModalCargo from '../modal-cargo/modal-cargo';

export const DataTableCargos = () => {
    const [dataTable, setDatatable] = useState<boolean>(true);

    const [tipo, setTipo] = useState('')
    const [id, setId] = useState(0)
    const [tableColumnExtensions] = useState([
        { columnName: 'nombreCargo' },
        { columnName: 'cargo_id', width: 180 },
    ]);
    const [columns] = useState([
        { name: 'nombreCargo', title: 'Nombre' },
        { name: 'cargo_id', title: 'Acciones' },
    ]);
    const [loading, setLoading] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [currencyColumns] = useState(['cargo_id']);
    const [dateColumnsCargoId] = useState(['cargo_id']);

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
                        const estado = await apEditarCargo(value)
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
    const { rows, apiLisCargo } = UseListCargo();
    const { apiCreateCargo, create } = UseCreateCargo();
    const { apEditarCargo, editar } = UseEditarCargo();

    useEffect(() => {
        if (dataTable) {
            apiLisCargo();
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
                <Typography variant='subtitle1' sx={{ pt: 1 }}>Lista cargo</Typography>
                <Button
                    sx={{
                        mb: 2,
                        textTransform: "none"
                    }}
                    size='small'
                    variant="contained"
                    onClick={() => { setOnModal(true); setTipo('nuevo'); }}
                >
                    Añadir cargo
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
                        for={dateColumnsCargoId}
                    />
                    <Toolbar />
                    <SearchPanel />
                </Grid>
                {loading && <Loading />}
            </Paper>
            <ModalCargo
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

