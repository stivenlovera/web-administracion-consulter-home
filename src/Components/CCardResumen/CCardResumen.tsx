import { Box, Card, CardActionArea, CardContent, Grid, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import { Link } from 'react-router-dom'
import './CCard.css'
import { IconosColores } from "./Config";

const LoadCard = () => {
    return (
        <Grid container item sm={3} sx={{ p: 1 }}  >
            <Grid container item lg={12} style={{ marginBottom: 25 }} >
                <Stack spacing={1} sx={{ minWidth: '100%' }} style={{ alignItems: "center" }} >
                    <Skeleton variant="rounded" sx={{ width: '100%' }} height={90} />
                </Stack>
            </Grid>
        </Grid>
    )
}

interface CCardResumenProps {
    color: string,
    monto: string
    descripcion: string;
    icon: string;
    route: string;
    textToolip: string;
    estado: boolean;
}

const CCardResumen = ({ color, descripcion, monto, icon, route, textToolip, estado }: CCardResumenProps) => {
    const iconsColor = IconosColores(icon, color);
    const text = textToolip != '' ? `Click para detalle de  ${textToolip}` : '';
    return (
        estado ? (<LoadCard />) : (
            <Grid container item sm={3} >
                <Grid container item lg={12} sx={{ m: 1 }} sm={12}>
                    <Tooltip title={text} arrow>
                        <Card sx={{ minWidth: '100%' }} style={{ background: iconsColor.color }} className="card" >
                            <CardActionArea component={Link} to={route}>
                                <CardContent sx={{ display: 'flex' }} style={{ padding: 0 }}>
                                    {iconsColor.icon}
                                    <Box style={{ width: '100%' }}>
                                        <CardContent>
                                            <Typography variant="h6" style={{ margin: 0, textAlign: 'center', fontWeight: 'bold', color: "white" }}>{monto}</Typography>
                                            <Typography variant="body2" style={{ margin: 0, textAlign: 'center', color: "white" }}>{descripcion}</Typography>
                                        </CardContent>
                                    </Box>
                                </CardContent>
                            </CardActionArea >
                        </Card>
                    </Tooltip>
                </Grid>
            </Grid >)
    );
}

export default CCardResumen;