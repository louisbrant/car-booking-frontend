import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

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
import InBoxDetailPage from '../screens/Guest/Inbox/Detail';
import MyProfilePage from '../screens/Guest/Inbox/MyProfile';
import EditProfilePage from '../screens/Guest/Inbox/EditProfile';
import WhereProfilePage from '../screens/Guest/Inbox/WhereProfile';

import TripPage from '../screens/Guest/Trip';

import RequestBookPage from '../screens/Guest/Request/index';
import RequestConfirmPage from '../screens/Guest/Request/Confirm';

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

import { useSelector } from 'react-redux'


/**
 * Guest Navigator
 */
const Navigator = createStackNavigator(
	{
		HomeScreen: {
			screen: HomePage,
			navigationOptions: { headerShown: false },
		},
		MyHomeScreen: {
			screen: FirstPage,
			navigationOptions: { headerShown: false },
		},
		SecondScreen: {
			screen: SecondPage,
			navigationOptions: { headerShown: false },
		},
		DetailDashboardScreen: {
			screen: DashboradPage,
			navigationOptions: { headerShown: false },
		},
		DetailRequestScreen: {
			screen: RequestPage,
			navigationOptions: { headerShown: false },
		},
		CarHomeScreen: {
			screen: ProjectHomePage,
			navigationOptions: { headerShown: false },
		},
		CarDetailScreen: {
			screen: CarDetailPage,
			navigationOptions: { headerShown: false },
		},
		PaymentScreen: {
			screen: PaymentPage,
			navigationOptions: { headerShown: false },
		},
		AddCardScreen: {
			screen: AddCardPage,
			navigationOptions: { headerShown: false },
		},
		InboxScreen: {
			screen: InboxPage,
			navigationOptions: { headerShown: false },
		},
		InboxDetailScreen: {
			screen: InBoxDetailPage,
			navigationOptions: { headerShown: false },
		},
		MyProfileScreen: {
			screen: MyProfilePage,
			navigationOptions: { headerShown: false },
		},
		EditProfileScreen: {
			screen: EditProfilePage,
			navigationOptions: { headerShown: false },
		},
		WhereProfileScreen: {
			screen: WhereProfilePage,
			navigationOptions: { headerShown: false },
		},
		RequestBookScreen: {
			screen: RequestBookPage,
			navigationOptions: { headerShown: false },
		},
		RequestConfirmScreen: {
			screen: RequestConfirmPage,
			navigationOptions: { headerShown: false },
		},
		SignInScreen: {
			screen: SignIn,
			navigationOptions: { headerShown: false },
		},
		SignUpScreen: {
			screen: SignUp,
			navigationOptions: { headerShown: false },
		},
		ProfileScreen: {
			screen: ProfilePage,
			navigationOptions: { headerShown: false },
		},
		PersonalScreen: {
			screen: InfoPage,
			navigationOptions: { headerShown: false },
		},
		ChangePassScreen: {
			screen: ChangePassPage,
			navigationOptions: { headerShown: false },
		},
		ChangeEmailScreen: {
			screen: ChangeEmailPage,
			navigationOptions: { headerShown: false },
		},
		ChangePhoneScreen: {
			screen: ChangePhonePage,
			navigationOptions: { headerShown: false },
		},
		ConnectFacebookScreen: {
			screen: ConnectFacebookPage,
			navigationOptions: { headerShown: false },
		},
		ConnectGoogleScreen: {
			screen: ConnectGooglePage,
			navigationOptions: { headerShown: false },
		},
		AddCarScreen: {
			screen: AddCarPage,
			navigationOptions: { headerShown: false },
		},
		ConfigurationScreen: {
			screen: ConfigurationPage,
			navigationOptions: { headerShown: false },
		},
		AllCarsScreen: {
			screen: AllCarsPage,
			navigationOptions: { headerShown: false },
		},
		ForgotPassScreen: {
			screen: ForgotPassPage,
			navigationOptions: { headerShown: false },
		},
		ResetPassScreen: {
			screen: ResetPassPage,
			navigationOptions: { headerShown: false },
		},
		EnterOTPScreen: {
			screen: EnterOTPPage,
			navigationOptions: { headerShown: false },
		},
		NotificationScreen: {
			screen: NotificationPage,
			navigationOptions: { headerShown: false },
		},
		MyPaymentScreen: {
			screen: MyPaymentPage,
			navigationOptions: { headerShown: false },
		},




		BeforeSignScreen: {
			screen: BeforeSign,
			navigationOptions: { headerShown: false },
		},
		AboutScreen: {
			screen: About,
			navigationOptions: { headerShown: false },
		},
		OpeningHourScreen: {
			screen: About,
			navigationOptions: { headerShown: false },
		},
		ServiceProScreen: {
			screen: ServicePro,
			navigationOptions: { headerShown: false },
		},
		ConfirmedScreen: {
			screen: Confirmed,
			navigationOptions: { headerShown: false },
		},
		ReceiveCodeScreen: {
			screen: ReceiveCodePage,
			navigationOptions: { headerShown: false },
		},
		SendCodeScreen: {
			screen: SendCodePage,
			navigationOptions: { headerShown: false },
		},
		TellCarScreen: {
			screen: TellCarPage,
			navigationOptions: { headerShown: false },
		},
		VecificationCarScreen: {
			screen: VecificationCarPage,
			navigationOptions: { headerShown: false },
		},
		VinScanScreen: {
			screen: VinScanPage,
			navigationOptions: { headerShown: false },
		},
		DescriptionScreenPageScreen: {
			screen: DescriptionScreenPage,
			navigationOptions: { headerShown: false },
		},
		FinalizeCarPageScreen: {
			screen: FinalizeCarPage,
			navigationOptions: { headerShown: false },
		},
		SelectCarStylePageScreen: {
			screen: SelectCarStylePage,
			navigationOptions: { headerShown: false },
		},
		TripPageScreen: {
			screen: TripPage,
			navigationOptions: { headerShown: false },
		},
	},
	{
		initialRouteName: 'TripPageScreen'
		// initialRouteName: 'RequestBookScreen'
		// initialRouteName: 'MyPaymentScreen'

		// initialRouteName: 'BeforeSignScreen'
	}
)

export default createAppContainer(Navigator)