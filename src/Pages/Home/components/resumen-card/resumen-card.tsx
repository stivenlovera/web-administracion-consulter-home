import { useEffect, useState } from "react";
import CCardResumen from "../../../../Components/CCardResumen/CCardResumen";
import UseResumenHome from "./hooks/UseResumenHome";

interface ListCCardProps {
    previewLoad: number;
}

const ResumenCard = ({ previewLoad }: ListCCardProps) => {
    const [carga, setCarga] = useState(true);
    const loadResumen = async () => {
        await apiResumenHome();
        setCarga(false);
    };
    const { apiResumenHome, home } = UseResumenHome()
    useEffect(() => {
        loadResumen();
    }, []);
    return (
        <>
            {home.map((tarjeta, i) => {
                return (<CCardResumen
                    key={i}
                    icon={tarjeta.icon}
                    color={tarjeta.color}
                    descripcion={tarjeta.titulo}
                    monto={tarjeta.valor}
                    route={tarjeta.routeApp}
                    textToolip={tarjeta.titulo}
                    estado={carga}
                />)
            })}
        </>
    );
}

export default ResumenCard;