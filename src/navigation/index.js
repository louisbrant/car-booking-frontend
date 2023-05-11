import React from 'react'
import { useSelector } from 'react-redux'
// import CarNavigation from './Car'
import { setNavigator, useApi } from '../redux/services'
import { ROOT } from '../constants'
import io from 'socket.io-client'
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();


import HomePage from '../screens/Car/Home'
import SignIn from '../screens/Car/SignIn'
import SignUp from '../screens/Car/SignUp'
import ForgotPassPage from '../screens/Car/Pages/ForgotPass';
import ResetPassPage from '../screens/Car/Pages/ResetPass';
import EnterOTPPage from '../screens/Car/Pages/EnterOTP';
import BeforeSign from '../screens/Car/BeforeSign'
import About from '../screens/Car/About'
import ReceiveCodePage from '../screens/Car/Pages/ReceiveCode';
import SendCodePage from '../screens/Car/Pages/SendCode';


// import OpeningHour from '../screens/Car/OpeningHour'
import ServicePro from '../screens/Car/ServicePro'
import Confirmed from '../screens/Car/Confirmed'

import FirstPage from '../screens/Car/FirstPage'
import SecondPage from '../screens/Car/SecondPage'
import DashboradPage from '../screens/Car/Detail/Dashborad';
import RequestPage from '../screens/Car/Detail/Request';

import ProjectHomePage from '../screens/Car/Project/Home';
import CarDetailPage from '../screens/Car/Project/Detail';
import PaymentPage from '../screens/Car/Project/Payment';
import AddCardPage from '../screens/Car/Project/AddCard';

import InboxPage from '../screens/Car/Inbox';
import MyProfilePage from '../screens/Car/Inbox/MyProfile';
import EditProfilePage from '../screens/Car/Inbox/EditProfile';
import ChartPage from '../screens/Car/Inbox/chart';

import TripPage from '../screens/Car/Trip';
import WhereProfilePage from '../screens/Car/Trip/WhereProfile';

import RequestBookPage from '../screens/Car/Request/index';
import RequestConfirmPage from '../screens/Car/Request/Confirm';
import RequestDetailPage from '../screens/Car/Request/Detail';

import ProfilePage from '../screens/Car/Pages/Profile';
import InfoPage from '../screens/Car/Pages/Info';
import ChangePassPage from '../screens/Car/Pages/ChangePass';
import ChangeEmailPage from '../screens/Car/Pages/ChangeEmail';
import ChangePhonePage from '../screens/Car/Pages/ChangePhone';
import ConnectFacebookPage from '../screens/Car/Pages/ConnectFacebook';
import ConnectGooglePage from '../screens/Car/Pages/ConnectGoogle';
import AddCarPage from '../screens/Car/Pages/AddCar';
import ConfigurationPage from '../screens/Car/Pages/Configuration';
import AllCarsPage from '../screens/Car/Pages/AllCars';
import NotificationPage from '../screens/Car/Pages/Notification';
import MyPaymentPage from '../screens/Car/Pages/MyPayment';

import TellCarPage from '../screens/Car/Pages/TellCar';
import VecificationCarPage from '../screens/Car/Pages/VecificationCar';
import VinScanPage from '../screens/Car/Pages/VinScan';
import DescriptionScreenPage from '../screens/Car/Pages/DescriptionScreen';
import FinalizeCarPage from '../screens/Car/Pages/FinalizeCar';
import SelectCarStylePage from '../screens/Car/Pages/SelectCarStyle';




import GetHousePage from '../screens/House/GetHouse';
import HouseDescribesPage from '../screens/House/HouseDescribes';
import HouseGuestPage from '../screens/House/HouseGuest';
import HouseTellPage from '../screens/House/HouseTell';
import HouseImageAddPage from '../screens/House/HouseImageAdd';
import MyHousesPage from '../screens/House/MyHouse';
import HouseRequestPage from '../screens/House/HouseRequest';
import HouseTripPage from '../screens/House/Trip/index';
import HouseWhereProfilePage from '../screens/House/Trip/WhereProfile';


const navigation = () => {
    const { user } = useSelector((store) => store.auth);
    console.log("user=>", user)
    const Api = useApi()
    if (user) {
        ROOT.Socket = io.connect(ROOT.SOCKET_URL);
        ROOT.Socket.emit("new user", user.email);
    }
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
                name="MyHomeScreen"
                component={FirstPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="SecondScreen"
                component={SecondPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="DetailDashboardScreen"
                component={DashboradPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="DetailRequestScreen"
                component={RequestPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="CarHomeScreen"
                component={ProjectHomePage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="CarDetailScreen"
                component={CarDetailPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="PaymentScreen"
                component={PaymentPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="AddCardScreen"
                component={AddCardPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="InboxScreen"
                component={InboxPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="MyProfileScreen"
                component={MyProfilePage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="EditProfileScreen"
                component={EditProfilePage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="WhereProfileScreen"
                component={WhereProfilePage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="RequestBookScreen"
                component={RequestBookPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="RequestConfirmScreen"
                component={RequestConfirmPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="RequestDetailScreen"
                component={RequestDetailPage}
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
            <Stack.Screen
                name="ProfileScreen"
                component={ProfilePage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="PersonalScreen"
                component={InfoPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="ChangePassScreen"
                component={ChangePassPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="ChangeEmailScreen"
                component={ChangeEmailPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="ChangePhoneScreen"
                component={ChangePhonePage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="ConnectFacebookScreen"
                component={ConnectFacebookPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="ConnectGoogleScreen"
                component={ConnectGooglePage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="AddCarScreen"
                component={AddCarPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="ConfigurationScreen"
                component={ConfigurationPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="AllCarsScreen"
                component={AllCarsPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="ForgotPassScreen"
                component={ForgotPassPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="ResetPassScreen"
                component={ResetPassPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="EnterOTPScreen"
                component={EnterOTPPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="NotificationScreen"
                component={NotificationPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="MyPaymentScreen"
                component={MyPaymentPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="BeforeSignScreen"
                component={BeforeSign}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="AboutScreen"
                component={About}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="OpeningHourScreen"
                component={About}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="ServiceProScreen"
                component={ServicePro}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="ConfirmedScreen"
                component={Confirmed}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="ReceiveCodeScreen"
                component={ReceiveCodePage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="SendCodeScreen"
                component={SendCodePage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="TellCarScreen"
                component={TellCarPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="VecificationCarScreen"
                component={VecificationCarPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="VinScanScreen"
                component={VinScanPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="DescriptionScreenPageScreen"
                component={DescriptionScreenPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="FinalizeCarPageScreen"
                component={FinalizeCarPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="SelectCarStylePageScreen"
                component={SelectCarStylePage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="TripPageScreen"
                component={TripPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="ChartPageScreen"
                component={ChartPage}
                options={{
                    header: () => { },
                }}
            />


            <Stack.Screen
                name="GetHouseScreen"
                component={GetHousePage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="HouseDescribesScreen"
                component={HouseDescribesPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="HouseGuestScreen"
                component={HouseGuestPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="HouseTellScreen"
                component={HouseTellPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="HouseImageAddScreen"
                component={HouseImageAddPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="MyHousesScreen"
                component={MyHousesPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="HouseRequestScreen"
                component={HouseRequestPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="HouseTripScreen"
                component={HouseTripPage}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="HouseWhereProfileScreen"
                component={HouseWhereProfilePage}
                options={{
                    header: () => { },
                }}
            />






        </Stack.Navigator>
    );
}

export default navigation