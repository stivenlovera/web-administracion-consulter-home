import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Collapse, List, ListItem } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BadgeIcon from '@mui/icons-material/Badge';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BusinessIcon from '@mui/icons-material/Business';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import SignpostIcon from '@mui/icons-material/Signpost';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import { useState } from 'react';
import { Link } from 'react-router-dom'

const MainListItems = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };
    return (
        <React.Fragment>
            <ListItemButton component={Link} to="/inicio">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Tablero" />
            </ListItemButton>
            <ListItemButton component={Link} to="/lista-empresas">
                <ListItemIcon>
                    <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Empresas" />
            </ListItemButton>
            <ListItemButton component={Link} to="/lista-postulantes">
                <ListItemIcon>
                    <SwitchAccountIcon />
                </ListItemIcon>
                <ListItemText primary="Postulantes" />
            </ListItemButton>
            <ListItemButton component={Link} to="/lista-cargos">
                <ListItemIcon>
                    <SignpostIcon />
                </ListItemIcon>
                <ListItemText primary="Cargos" />
            </ListItemButton>
            <ListItemButton component={Link} to="/lista-test">
                <ListItemIcon>
                    <AutoStoriesIcon />
                </ListItemIcon>
                <ListItemText primary="Test" />
            </ListItemButton>
            {/* <ListItemButton component={Link} to="/lista-evaluaciones">
                <ListItemIcon>
                    <EditNoteIcon />
                </ListItemIcon>
                <ListItemText primary="Config. evaluacion" />
            </ListItemButton> */}
            <ListItemButton component={Link} to="/lista-evaluaciones">
                <ListItemIcon>
                    <PendingActionsIcon />
                </ListItemIcon>
                <ListItemText primary="Evaluaciones" />
            </ListItemButton>
            
           {/*  <ListItemButton onClick={handleClick} >
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reportes" />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton component={Link} to="/vendedores">
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText disableTypography primary="Top 10 vendedores" style={{ fontSize: '14px' }} />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/venta-residuales">
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText disableTypography primary="Red ventas y residual" style={{ fontSize: '14px' }} />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/vendedores-mes">
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText disableTypography primary="Mejores vendedores" style={{ fontSize: '14px' }} />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/ascensos">
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText disableTypography primary="Ascenso de rangos" style={{ fontSize: '14px' }} />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/ubicacion-red">
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText disableTypography primary="Ubicacion de mi red" style={{ fontSize: '14px' }} />
                    </ListItemButton>
                </List>
            </Collapse> */}
        </React.Fragment>
    )
};

const SecondaryListItems = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };
    return (
        <>
            <ListSubheader component="div" inset>
                Submenu
            </ListSubheader>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Otros" />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem >
                        <ListItemIcon>

                        </ListItemIcon>
                        <ListItemText primary='Otros' />
                    </ListItem>
                </List>
            </Collapse>
        </>
    );
}
export default { SecondaryListItems, MainListItems };