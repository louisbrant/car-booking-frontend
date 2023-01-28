import { createAppContainer } from "react-navigation"
import { createDrawerNavigator } from "react-navigation-drawer"
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Customer/Home'
import Services from '../screens/Provider/Services'
import Manage from '../screens/Provider/Services/Manage'
import Clients from '../screens/Provider/Clients'
import Review from '../screens/Provider/Clients/Review'
import Appointments from '../screens/Provider/Appointments'
import AppointDetail from '../screens/Provider/Appointments/AppointDetail'
import InviteFriends from '../screens/Customer/InviteFriends'
import Account from "../screens/Customer/Account"
import EditAccount from "../screens/Customer/Account/EditAccount"
import DogProfile from "../screens/Customer/Profile/DogProfile"
import CatProfile from "../screens/Customer/Profile/CatProfile"
import EditDogProfile from "../screens/Customer/Profile/EditDogProfile"
import EditCatProfile from "../screens/Customer/Profile/EditCatProfile"
import Setting from "../screens/Customer/Menu/Setting"
import Payment from "../screens/Provider/Menu/Payment"
import ChangePass from "../screens/Customer/Menu/ChangePass"
import Message from "../screens/Customer/Menu/Message"
import HelpSupport from "../screens/Customer/Menu/HelpSupport"
import Chatpage from "../screens/Customer/Menu/Chatpage"
import ManageGroomer from "../screens/Provider/Menu/ManageGroomer"
import EditGroomer from "../screens/Provider/Menu/EditGroomer"
import { LAYOUT, ROOT } from "../constants"
import SideMenu from "./SideMenu"
import SelectService from "../screens/Customer/Services/SelectService"

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
			screen: Clients,
			navigationOptions: { headerShown: false },
		},
		InviteFriendsScreen: {
			screen: InviteFriends,
			navigationOptions: { headerShown: false },
		},
		ManageScreen: {
			screen: Manage,
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
		AppointDetailScreen: {
			screen: AppointDetail,
			navigationOptions: { headerShown: false }
		},
		ChatpageScreen: {
			screen: Chatpage,
			navigationOptions: { headerShown: false }
		},
		ReviewScreen: {
			screen: Review,
			navigationOptions: { headerShown: false }
		},
		ManageGroomerScreen: {
			screen: ManageGroomer,
			navigationOptions: { headerShown: false }
		},
		EditGroomerScreen: {
			screen: EditGroomer,
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