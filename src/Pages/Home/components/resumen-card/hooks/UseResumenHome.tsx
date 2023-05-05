import { enqueueSnackbar } from "notistack";
import { useContext, useState } from "react";
import { ICCard } from "../../../../../Services/Interface/home";
import { ResumenHomeService } from "../../../../../Services/home";
import { initialDataFakeCards } from "../../../../../DataFake/DataFake";

const UseResumenHome = () => {
    const [home, setHome] = useState<ICCard[]>(initialDataFakeCards);
    
    const apiResumenHome = async () => {
        try {
            const { data } = await ResumenHomeService();
            if (data.status == 1) {
                setHome(data.data);
            } else {
                enqueueSnackbar(data.message, { variant: 'error' });
                setHome([]);
            }
        } catch (error) {
            enqueueSnackbar('Ocurio un error', { variant: 'error' });
            setHome([]);
        }
    }
    return {
        home,
        setHome,
        apiResumenHome
    }
}
export default UseResumenHome;