import SearchComponents from '../components/search/SearchComponents';
import ConfirmScreen from '../components/confirm/ConfirmScreen';
import CurrentLoans from '../components/returnloan/CurrentLoans.js';
import Register from "../components/login/Register";
import Login from '../components/login/Login';
import Home from '../components/home/Home';
import Component from '../components/componentScreen/Component';
import LoadingScreen from '../components/login/Loading';
import ScanQrCode from '../components/qrcodescanner/ScanQrCode';
import ScanResults from '../components/qrcodescanner/ScanResults';
import AddComponents from '../components/adminTools/addComponents';
import UserManager from '../components/adminTools/UserManager';
import AddTrays from '../components/adminTools/AddTrays';
import AddScreen from '../components/adminTools/addScreen';
import Profile from '../components/profile/Profile';


// Routes and components to use in stack navigator
export const routesList = [
    
    {
        name: 'Loading',
        component: LoadingScreen,
        header: false,
    },
    {
        name: 'Rekisteröinti',
        component: Register,
        header: false,
    },
    {
        name: 'Koti',
        component: Home,
    },
    {
        name: 'Palautus',
        component: CurrentLoans
    },
    {
        name: 'Kirjautuminen',
        component: Login,
        header: false,
    },
    {
        name: 'Komponentti',
        component: Component,
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
        name: 'Skannaus',
        component: ScanQrCode,
        header: false,
    },
    {
        name: 'Tulos',
        component: ScanResults,
        // header: false,
    },
    {
        name: 'Valitse',
        component: AddScreen,
        header: true,
    },
    {
        name: 'Lisää',
        component: AddComponents,
        header: true,
    },
    {
        name: 'Käyttäjät',
        component: UserManager,
    },
    {
        name: 'Luo',
        component: AddTrays,
        header: true,
    },
    {
        name: 'Profiili',
        component: Profile,
        header: false,
    },
]