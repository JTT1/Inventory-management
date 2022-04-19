import SearchComponents from '../components/search/SearchComponents';
import ConfirmScreen from '../components/confirm/ConfirmScreen';
import CurrentLoans from '../components/returnloan/CurrentLoans.js';
import Register from "../components/login/Register";
import Login from '../components/login/Login';

// Routes and components to use in stack navigator
export const routesList = [
    {
        name: 'Palautus',
        component: CurrentLoans
    },
    {
        name: 'Kirjautuminen',
        component: Login,
        header: false, // this needs to be false for screens that dont render the header
    },
    {
        name: 'Haku',
        component: SearchComponents,
    },
    {
        name: 'Vahvistus',
        component: ConfirmScreen,
        header: false,
    },
    {
        name: 'Rekisteröinti',
        component: Register,
        header: false,
    },
]