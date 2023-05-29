import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaidIcon from '@mui/icons-material/Paid';
import TouchAppIcon from '@mui/icons-material/TouchApp';

const HouseEdgeCards = [
    {
        id: 1,
        cardmedia: <CreditScoreIcon sx={{ fontSize: '45px',width:'100%', padding: 'auto', color: '#00b0ff' }} />,
        cardcontent: 'Rent Agreement'
    },
    {
        id: 2,
        cardmedia: <AccountBalanceIcon sx={{ fontSize: '45px', width:'100%', padding: 'auto',color: '#a2cf6e' }} />,
        cardcontent: 'Home Loans'

    },
    {
        id: 3,
        cardmedia: <MapsHomeWorkIcon sx={{ fontSize: '45px', width:'100%', padding: 'auto', color: '#d7e360' }} />,
        cardcontent: 'Rent Now,Pay Later'

    },
    {
        id: 4,
        cardmedia: <HealthAndSafetyIcon sx={{ fontSize: '45px', width:'100%', padding: 'auto', color: '#ff5722' }} />,
        cardcontent: 'Home Interiors'

    },
    {
        id: 5,
        cardmedia: <SecurityIcon sx={{ fontSize: '45px', width:'100%', padding: 'auto', color: '#9c27b0' }} />,
        cardcontent: 'Solar Rooftop'

    },
    {
        id: 6,
        cardmedia: <AccountBalanceWalletIcon sx={{ fontSize: '45px', width:'100%', padding: 'auto', color: '#00b0ff' }} />,
        cardcontent: 'Housing Premium'

    },
    {
        id: 7,
        cardmedia: <CreditScoreIcon sx={{ fontSize: '45px', width:'100%', padding: 'auto', color: '#ff5722' }} />,
        cardcontent: 'Packers and Movers'

    },
    {
        id: 8,
        cardmedia: <PaidIcon sx={{ fontSize: '45px', width:'100%', padding: 'auto', color: '#3f51b5' }} />,
        cardcontent: 'Property Management'

    }, {
        id: 9,
        cardmedia: <AccountBalanceIcon sx={{ fontSize: '45px', width:'100%', padding: 'auto', color: '#9c27b0' }} />,
        cardcontent: 'Locality Specific'

    }, {
        id: 10,
        cardmedia: <SecurityIcon sx={{ fontSize: '45px', width:'100%', padding: 'auto', color: '#ff5722' }} />,
        cardcontent: 'Weekend Plans'

    }, {
        id: 11,
        cardmedia: <TouchAppIcon sx={{ fontSize: '45px', width:'100%', padding: 'auto', color: '#d7e360' }} />,
        cardcontent: 'Property Resort'

    }
];


export { HouseEdgeCards };