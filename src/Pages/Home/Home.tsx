import { Breadcrumbs, Grid, Typography } from "@mui/material"
import Link from '@mui/material/Link';
import { CBreadcrumbs } from "../../Components/CBreadcrumbs/CBreadcrumbs";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ResumenCard from "./components/resumen-card/resumen-card";

const Home = () => {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  return (
    <div>
      <CBreadcrumbs icon={<DashboardIcon />} nombreRoute="Home" nombresRoutes={[]} route="#" routes={[]} />
      <Grid container item xs={12} alignItems="center" justifyContent="center">
        <ResumenCard previewLoad={4}/>
      </Grid>

    </div>
  )
}

export default Home
