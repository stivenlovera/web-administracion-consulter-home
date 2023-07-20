import { Divider, Drawer, Grid, Toolbar } from '@mui/material'
import React from 'react'
import ConstructorPlantilla from './components/constructor/constructor'
import VistaPreviaPlantilla from './components/constructor/vista-previa-plantilla'
import ListPreguntas from './components/constructor/lis-pregunta'

const Plantilla = () => {
    const drawerWidth = 240;

    return (
        <Grid container spacing={2}>
            <Grid item xl={6} md={6} >
                <VistaPreviaPlantilla />
            </Grid>

            <Grid item xl={6} md={6}>
                <ConstructorPlantilla />
            </Grid>

        </Grid>

    )
}

export default Plantilla