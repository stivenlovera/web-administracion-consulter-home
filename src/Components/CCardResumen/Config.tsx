import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LayersIcon from '@mui/icons-material/Layers';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PercentIcon from '@mui/icons-material/Percent';
import ParkIcon from '@mui/icons-material/Park';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BusinessIcon from '@mui/icons-material/Business';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import SignpostIcon from '@mui/icons-material/Signpost';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

interface cardConfig {
    icon: React.ReactNode;
    color: string
}
interface Icolor {
    nombre: string;
    color: string;
}
interface Iicon {
    nombre: string;
    icon: React.ReactNode;
}
const colores: Icolor[] = [
    {
        nombre: 'black',
        color: 'linear-gradient(to right bottom, #0E0E0E, #939393)'
    },
    {
        nombre: 'red',
        color: 'linear-gradient(to right bottom, #FF0000, #FF7C7C)'
    },
    {
        nombre: 'blue',
        color: 'linear-gradient(to right bottom, #0008FF, #9295FF)'
    },
    {
        nombre: 'green',
        color: 'linear-gradient(to right bottom, #00581C, #61DA87)'
    },
    {
        nombre: 'default',
        color: 'linear-gradient(90deg, rgba(172,170,251,1) 0%, rgba(25,118,210,1) 100%)'
    },
]
const iconos: Iicon[] = [
    {
        icon: <Diversity3Icon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'grupo'
    },
    {
        icon: <AttachMoneyIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'money'
    },
    {
        icon: <TrendingUpIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'up'
    },
    {
        icon: <AccountTreeIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'tree'
    },
    {
        icon: <LayersIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'layers'
    },
    {
        icon: <MilitaryTechIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'medal'
    },
    {
        icon: <PercentIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'percentaje'
    },
    {
        icon: <ParkIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'monte'
    },
    {
        icon: <WorkspacePremiumIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'top'
    },
    {
        icon: <AccountTreeIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'red'
    },
    {
        icon: <CurrencyExchangeIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'residual'
    },
    {
        icon: <MonetizationOnIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'personal'
    },
    {
        icon: <BusinessIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'empresas'
    },
    {
        icon: <SwitchAccountIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'postulantes'
    },
    {
        icon: <EditNoteIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'editarNota'
    },
    {
        icon: <PendingActionsIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'evaluaciones'
    },
    {
        icon: <SignpostIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />,
        nombre: 'cargo'
    }
]
export function IconosColores(icon: string, color: string) {
    const elementIcon = iconos.find(i => i.nombre == icon);
    const elementColor = colores.find(i => i.nombre == color);
    return {
        icon: elementIcon?.icon,
        color: elementColor?.color
    };
}
export function Config(posicion: number) {
    let config: cardConfig;
    switch (posicion) {
        case 0:
            config = {
                color: "linear-gradient(to right bottom, #0E0E0E, #FFB6B6)",
                icon: (<GroupsIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />)
            }
            break;
        case 1:
            config = {
                color: "linear-gradient(to right bottom, #FF0000, #FFC1C1)",
                icon: (<AttachMoneyIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />)
            }
            break;
        case 2:
            config = {
                color: "linear-gradient(to right bottom, #0008FF, #9295FF)",
                icon: (<TrendingUpIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />)
            }
            break;
        case 3:
            config = {
                color: "linear-gradient(to right bottom, #00581C, #61DA87)",
                icon: (<AccountTreeIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />)
            }
            break;
        default:
            //por default
            config = {
                color: "linear-gradient(to right bottom, #FF0000, #FF7C7C)",
                icon: (<AttachMoneyIcon style={{ fontSize: '5rem', color: 'white', margin: '10px' }} />)
            }
            break;
    }
    return config
}