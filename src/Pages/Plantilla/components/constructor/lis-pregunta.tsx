import { Card, CardContent, Divider, FormControl, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'

const ListPreguntas = () => {

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <TextField
                    required
                    fullWidth
                    label="Buscar Plantilla"
                    variant="filled"
                    size='small'
                    name='pregunta_nombre'
                >
                </TextField>
                <List sx={{
                    width: '100%', bgcolor: 'background.paper', position: 'relative', maxHeight: 300,
                    overflow: 'auto',
                }}>
                    <ListItemButton>
                        <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </React.Fragment>
                            }
                        />
                    </ListItemButton>

                </List>
            </CardContent>
        </Card >
    )
}

export default ListPreguntas
