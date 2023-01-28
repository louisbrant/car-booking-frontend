import { createAppContainer } from "react-navigation"
import { createDrawerNavigator } from "react-navigation-drawer"
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Customer/Home'
import Services from '../screens/Customer/Services'
import SetSchedule from '../screens/Customer/Services/SetSchedule'
import SetTime from '../screens/Customer/Services/SetTime'
import SetPayment from '../screens/Customer/Services/SetPayment'
import Confirmed from '../screens/Customer/Services/Confirmed'
import Signature from '../screens/Customer/Services/Signature'
import Groomers from '../screens/Customer/Groomers'
import Appointments from '../screens/Customer/Appointments'
import Trackgroomer from '../screens/Customer/Appointments/Trackgroomer'
import InviteFriends from '../screens/Customer/InviteFriends'
import Account from "../screens/Customer/Account"
import EditAccount from "../screens/Customer/Account/EditAccount"
import DogProfile from "../screens/Customer/Profile/DogProfile"
import CatProfile from "../screens/Customer/Profile/CatProfile"
import DogVaccine from "../screens/Customer/Profile/DogVaccine"
import AddVaccine from "../screens/Customer/Profile/AddVaccine"
import EditDogProfile from "../screens/Customer/Profile/EditDogProfile"
import EditCatProfile from "../screens/Customer/Profile/EditCatProfile"
import Setting from "../screens/Customer/Menu/Setting"
import Payment from "../screens/Customer/Menu/Payment"
import ChangePass from "../screens/Customer/Menu/ChangePass"
import Message from "../screens/Customer/Menu/Message"
import HelpSupport from "../screens/Customer/Menu/HelpSupport"
import Chatpage from "../screens/Customer/Menu/Chatpage"
import Review from "../screens/Customer/Menu/Review"
import SelectService from "../screens/Customer/Services/SelectService"
import { LAYOUT } from "../constants"
import SideMenu from "./SideMenu"

/**
 * Home Navigator
 */
const Navigator = createStackNavigator(
	{
		HomeScreen: {
			screen: Home,
			navigationOptions: { headerShown: false },
		},
		ServicesScreen: {
			screen: Services,
			navigationOptions: { headerShown: false },
		},
		AppointmentsScreen: {
			screen: Appointments,
			navigationOptions: { headerShown: false },
		},
		GroomersScreen: {
			screen: Groomers,
			navigationOptions: { headerShown: false },
		},
		InviteFriendsScreen: {
			screen: InviteFriends,
			navigationOptions: { headerShown: false },
		},
		SetScheduleScreen: {
			screen: SetSchedule,
			navigationOptions: { headerShown: false }
		},
		SetTimeScreen: {
			screen: SetTime,
			navigationOptions: { headerShown: false }
		},
		SetPaymentScreen: {
			screen: SetPayment,
			navigationOptions: { headerShown: false }
		},
		ConfirmedScreen: {
			screen: Confirmed,
			navigationOptions: { headerShown: false }
		},
		AccountScreen: {
			screen: Account,
			navigationOptions: { headerShown: false }
		},
		EditAccountScreen: {
			screen: EditAccount,
			navigationOptions: { headerShown: false }
		},
		DogProfileScreen: {
			screen: DogProfile,
			navigationOptions: { headerShown: false }
		},
		EditDogProfileScreen: {
			screen: EditDogProfile,
			navigationOptions: { headerShown: false }
		},
		CatProfileScreen: {
			screen: CatProfile,
			navigationOptions: { headerShown: false }
		},
		EditCatProfileScreen: {
			screen: EditCatProfile,
			navigationOptions: { headerShown: false }
		},
		SettingScreen: {
			screen: Setting,
			navigationOptions: { headerShown: false }
		},
		ChangePassScreen: {
			screen: ChangePass,
			navigationOptions: { headerShown: false }
		},
		PaymentScreen: {
			screen: Payment,
			navigationOptions: { headerShown: false }
		},
		MessageScreen: {
			screen: Message,
			navigationOptions: { headerShown: false }
		},
		HelpSupportScreen: {
			screen: HelpSupport,
			navigationOptions: { headerShown: false }
		},
		ChatpageScreen: {
			screen: Chatpage,
			navigationOptions: { headerShown: false }
		},
		SignatureScreen: {
			screen: Signature,
			navigationOptions: { headerShown: false }
		},
		DogVaccineScreen: {
			screen: DogVaccine,
			navigationOptions: { headerShown: false }
		},
		AddVaccineScreen: {
			screen: AddVaccine,
			navigationOptions: { headerShown: false }
		},
		TrackgroomerScreen: {
			screen: Trackgroomer,
			navigationOptions: { headerShown: false }
		},
		ReviewScreen: {
			screen: Review,
			navigationOptions: { headerShown: false }
		},
		SelectServiceScreen: {
			screen: SelectService,
			navigationOptions: { headerShown: false }
		},
	},
	{
		initialRouteName: 'HomeScreen'
	}
)

const RootStack = createDrawerNavigator({
	Home: {
		screen: Navigator,
	},
}, {
	contentComponent: SideMenu,
	drawerWidth: LAYOUT.window.width * .7,
	drawerOpenRoute: 'DrawerOpen',
	drawerCloseRoute: 'DrawerClose',
	drawerToggleRoute: 'DrawerToggle',
	drawerBackgroundColor: '#00000000'
}
)

export default createAppContainer(RootStack)