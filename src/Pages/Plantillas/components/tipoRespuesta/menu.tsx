import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { ITipoPregunta } from '../../../../Services/Interface/tipoRespuesta';

interface SimpleListMenuProps {
    options: ITipoPregunta[],
    onSelect(tipoRespuesta: ITipoPregunta): void
}
export default function SimpleListMenu({ onSelect, options }: SimpleListMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
        option: ITipoPregunta,
        index: number,
    ) => {
        onSelect(option);
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <List

                component="nav"
                aria-label="Device settings"
                sx={{ bgcolor: 'background.paper' }}
            >
                <ListItem
                    button
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                >
                    <ListItemText
                        primary="Selecione tipo de respuesta"
                        secondary={options[selectedIndex].tipo_pregunta_nombre}
                    />
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        /* disabled={index === 0} */
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(option, index)}
                    >
                        {option.tipo_pregunta_nombre}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}