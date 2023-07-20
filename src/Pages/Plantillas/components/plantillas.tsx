import { CBreadcrumbs } from '../../../Components/CBreadcrumbs/CBreadcrumbs'
import Constructor from './constructor/constructor';
import { Grid } from '@mui/material';
import { ContextRespuesta } from '../../../Context/ContextRespuesta';
import { useState } from 'react';
import { initialStatePlantilla } from './utils/initialState';
import VistaPrevia from './preview/preview';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { IPlantilla } from '../../../Services/Interface/plantilla';
import usePlantilla from './hook/usePlantilla';
import { useParams } from 'react-router-dom';
const Plantillas = () => {
    const { id } = useParams<{ id?: string }>();
    const { Edit } = usePlantilla({ values: initialStatePlantilla });
  
    const [plantilla, setPlantilla] = useState<IPlantilla>(initialStatePlantilla);

    return (
        <>
            <CBreadcrumbs icon={<QuestionAnswerIcon />} nombreRoute="Lista Preguntas" nombresRoutes={['Crear pregunta']} route="/lista-preguntas" routes={['#']} />
            <ContextRespuesta.Provider value={{ plantilla, setPlantilla }}>
                <Grid container spacing={2}>
                    <Grid item xl={6} md={6} >
                        <VistaPrevia></VistaPrevia>
                    </Grid>
                    <Grid item xl={6} md={6}>
                        <Constructor></Constructor>
                    </Grid>
                </Grid>
            </ContextRespuesta.Provider>
        </>
    )
}
export default Plantillas;
