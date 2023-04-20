import React from 'react'
import { useSelector } from 'react-redux'
// import GuestNavigation from './Guest'
import { setNavigator, useApi } from '../redux/services'
import { ROOT } from '../constants'
import io from 'socket.io-client'
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();


import HomePage from '../screens/Guest/Home'
import SignIn from '../screens/Guest/SignIn'
import SignUp from '../screens/Guest/SignUp'
import BeforeSign from '../screens/Guest/BeforeSign'
import About from '../screens/Guest/About'
// import OpeningHour from '../screens/Guest/OpeningHour'
import ServicePro from '../screens/Guest/ServicePro'
import Confirmed from '../screens/Guest/Confirmed'

import FirstPage from '../screens/Guest/FirstPage'
import SecondPage from '../screens/Guest/SecondPage'
import DashboradPage from '../screens/Guest/Detail/Dashborad';
import RequestPage from '../screens/Guest/Detail/Request';

import ProjectHomePage from '../screens/Guest/Project/Home';
import CarDetailPage from '../screens/Guest/Project/Detail';
import PaymentPage from '../screens/Guest/Project/Payment';
import AddCardPage from '../screens/Guest/Project/AddCard';

import InboxPage from '../screens/Guest/Inbox';
import MyProfilePage from '../screens/Guest/Inbox/MyProfile';
import EditProfilePage from '../screens/Guest/Inbox/EditProfile';
import WhereProfilePage from '../screens/Guest/Inbox/WhereProfile';
import ChartPage from '../screens/Guest/Inbox/chart';

import TripPage from '../screens/Guest/Trip';

import RequestBookPage from '../screens/Guest/Request/index';
import RequestConfirmPage from '../screens/Guest/Request/Confirm';
import RequestDetailPage from '../screens/Guest/Request/Detail';

import ProfilePage from '../screens/Guest/Pages/Profile';
import InfoPage from '../screens/Guest/Pages/Info';
import ChangePassPage from '../screens/Guest/Pages/ChangePass';
import ChangeEmailPage from '../screens/Guest/Pages/ChangeEmail';
import ChangePhonePage from '../screens/Guest/Pages/ChangePhone';
import ConnectFacebookPage from '../screens/Guest/Pages/ConnectFacebook';
import ConnectGooglePage from '../screens/Guest/Pages/ConnectGoogle';
import AddCarPage from '../screens/Guest/Pages/AddCar';
import ConfigurationPage from '../screens/Guest/Pages/Configuration';
import AllCarsPage from '../screens/Guest/Pages/AllCars';
import ForgotPassPage from '../screens/Guest/Pages/ForgotPass';
import ResetPassPage from '../screens/Guest/Pages/ResetPass';
import EnterOTPPage from '../screens/Guest/Pages/EnterOTP';
import NotificationPage from '../screens/Guest/Pages/Notification';
import MyPaymentPage from '../screens/Guest/Pages/MyPayment';

import ReceiveCodePage from '../screens/Guest/Pages/ReceiveCode';
import SendCodePage from '../screens/Guest/Pages/SendCode';
import TellCarPage from '../screens/Guest/Pages/TellCar';
import VecificationCarPage from '../screens/Guest/Pages/VecificationCar';
import VinScanPage from '../screens/Guest/Pages/VinScan';
import DescriptionScreenPage from '../screens/Guest/Pages/DescriptionScreen';
import FinalizeCarPage from '../screens/Guest/Pages/FinalizeCar';
import SelectCarStylePage from '../screens/Guest/Pages/SelectCarStyle';

const navigation = () => {
    // const { user } = useSelector((store) => store.auth);
    // console.log("user=>", user)
    // const Api = useApi()
    // if (user) {
    //     ROOT.Socket = io.connect(ROOT.SOCKET_URL);
    //     ROOT.Socket.emit("new user", user.email);
    // }
    return (
        <Stack.Navigator mode="card">
            <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="SignInScreen"
                component={SignIn}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="SignUpScreen"
                component={SignUp}
                options={{
                    header: () => { },
                }}
            />
        </Stack.Navigator>
    );
}

export default navigation