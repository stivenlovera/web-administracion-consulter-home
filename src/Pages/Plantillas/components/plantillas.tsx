import { CBreadcrumbs } from '../../../Components/CBreadcrumbs/CBreadcrumbs'
import Constructor from './constructor/constructor';
import { Backdrop, CircularProgress, Grid } from '@mui/material';
import { ContextRespuesta } from '../../../Context/ContextRespuesta';
import { useEffect, useState } from 'react';
import { initialStatePlantilla } from './utils/initialState';
import VistaPrevia from './preview/preview';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { IPlantilla } from '../../../Services/Interface/plantilla';
import usePlantilla from './hook/usePlantilla';
import { useParams } from 'react-router-dom';
import { ITest } from '../../../Services/Interface/test';
import { listPregunta } from '../../../Services/servicio';
const Plantillas = () => {
    const { id } = useParams<{ id?: string }>();
    const [open, setOpen] = useState(true);
    const { List, Edit, Update } = usePlantilla();
    const [plantilla, setPlantilla] = useState<IPlantilla>(initialStatePlantilla);
    const [ejemplos, setEjemplo] = useState<ITest[]>([]);

    const initialEditar = async () => {
        const data = await Edit(parseInt(id!), initialStatePlantilla)
        setPlantilla(data)
        const ejemplos = await List();
        setEjemplo(ejemplos);
        setOpen(false)
    }
    const initialCreate = async () => {
        const ejemplos = await List();
        setEjemplo(ejemplos);
        setOpen(false)
    }

    useEffect(() => {
        if (id != 'create') {
            initialEditar()
        } else {
            initialCreate();
        }
    }, [])

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <CBreadcrumbs icon={<QuestionAnswerIcon />} nombreRoute="Lista Preguntas" nombresRoutes={['Crear pregunta']} route="/lista-preguntas" routes={['#']} />
            <Constructor
                ejemplos={ejemplos}
                plantilla={plantilla}
                edit={id != 'create'}
                onProcess={setPlantilla}
            />
        </>
    )
}
export default Plantillas;
