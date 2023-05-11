import React, { useEffect, useState } from "react"
import {
  View,
  Icon,
  Pressable,
  Text,
  Button,
  Spinner,
  Avatar,
  IconButton,
  Badge,
  Box,
  Image,
  Center,
  HStack,
  Stack,
  Modal,
  VStack,

} from "native-base"
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { navigate, useApi } from "../redux/services"
import { COLOR, Images, LAYOUT } from "../constants"
import { Fragment } from "react"
import { useSelector } from "react-redux"
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Feather, FontAwesome } from "@expo/vector-icons"


import bottomTabImage from '../assets/bottomTabImage.png';
import { width } from "styled-system"

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const activeStyle = { color: COLOR.IBase, opacity: 1 }
const hiddenStyle = { color: COLOR.inPlaceholder, opacity: 0.55 }


export const BottomTab = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);


  const { user } = useSelector((store) => store.auth);
  const { tab } = useSelector((store) => store.house);

  const onTab = (page) => {
    if (page == 'TellCarScreen') {
      setModalVisible(!modalVisible);
    }
    else {
      navigation.navigate(page);
    }
  }
  const onAddCar = () => {
    navigation.navigate("TellCarScreen");
    setModalVisible(false);
  }
  const [activeTab, setActiveTab] = useState("MyHomeScreen");
  console.log('activeTab62=?', activeTab)
  useEffect(() => {
    let routelength = navigation?.getState()?.routes?.length;
    if (routelength != undefined && routelength != 0) {
      setActiveTab(navigation?.getState()?.routes[navigation?.getState()?.routes?.length - 1]?.name)
    }
    console.log('activeTab68=?', activeTab)
  }, [navigation])

  return (
    <Box
      style={{
        backgroundColor: 'transparent',
        width: '100%',
        height: 54,
        position: 'absolute',
        zIndex: 1001,
        bottom: 0,
      }}
    >
      <Image source={bottomTabImage} resizeMode="cover" width="100%" height="100%" alt="image" />

      <Center position="absolute" w="full">
        <HStack justifyContent="space-between" w="full">


          {
            tab == 'car' &&
            <HStack
              style={{
                width: '100%',
                height: 50,
                '& .active': {
                  borderTopColor: COLOR.IBase,
                }
              }}
              px={5}
              justifyContent="space-between"
            >
              <TabButton activeTab={activeTab} screen={["CarHomeScreen"]} text={"Search"} onTab={onTab} tabIcon={"SearchIcon"} />

              <TabButton activeTab={activeTab} screen={["TellCarScreen"]} text={"Add Car"} onTab={onTab} tabIcon={"AddCarIcon"} />

              <TabButton activeTab={activeTab} screen={["TripPageScreen"]} text={"Trips"} onTab={onTab} tabIcon={"TripsIcon"} />

              <TabButton activeTab={activeTab} screen={["InboxScreen"]} text={"Inbox"} onTab={onTab} tabIcon={"InboxIcon"} />

              <TabButton activeTab={activeTab} screen={["MyProfileScreen"]} text={"More"} onTab={onTab} tabIcon={"MoreIcon"} />

            </HStack>
          }

          {
            tab == 'house' &&
            <HStack
              style={{
                width: '100%',
                height: 50,
                '& .active': {
                  borderTopColor: COLOR.IBase,
                }
              }}
              px={5}
              justifyContent="space-between"
            >
              <TabButton activeTab={activeTab} screen={["CarHomeScreen"]} text={"Search"} onTab={onTab} tabIcon={"SearchIcon"} />

              <TabButton activeTab={activeTab} screen={["GetHouseScreen"]} text={"Add House"} onTab={onTab} tabIcon={"AddCarIcon"} />

              <TabButton activeTab={activeTab} screen={["HouseTripScreen", "HouseWhereProfileScreen"]} text={"Trips"} onTab={onTab} tabIcon={"TripsIcon"} />

              <TabButton activeTab={activeTab} screen={["InboxScreen"]} text={"Inbox"} onTab={onTab} tabIcon={"InboxIcon"} />

              <TabButton activeTab={activeTab} screen={["MyProfileScreen"]} text={"More"} onTab={onTab} tabIcon={"MoreIcon"} />

            </HStack>
          }

        </HStack>
      </Center>




      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef} _backdrop={true} backdropOpacity={0.5} backgroundColor={COLOR.ModalBgcolor} >
        <Modal.Content style={{
          marginBottom: 50,
          marginTop: "auto",
          width: "90%"
        }}>
          <Modal.Body>
            <HStack justifyContent="space-between" pb={5}>
              <VStack w="100%" space={1}>
                <Text
                  color={COLOR.black}
                  fontWeight="medium"
                  style={{ fontSize: 18 }}
                >
                  Interested in hosting?
                </Text>
              </VStack>
            </HStack>
            <HStack justifyContent="space-between" pb={2}>
              <VStack w="100%" space={1}>
                <Text
                  color={COLOR.inPlaceholder}
                  fontWeight="medium"
                  fontSize="xs"
                >
                  Tap to learn about becoming a Izra host.
                </Text>
              </VStack>
            </HStack>
            <Box style={{ marginLeft: "70%" }}>
              <TouchableOpacity onPress={onAddCar}>
                <Box
                  style={{
                    width: '100%',
                    height: 45,
                    backgroundColor: COLOR.black,
                    borderRadius: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  mt={5}
                  py={2}
                >
                  <Text
                    color={COLOR.white}
                    fontWeight="bold"
                    fontSize="md"
                  >
                    Got it
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  )
}

export const TabButton = ({ activeTab, screen, onTab, tabIcon, text }) => {
  console.log('screen', screen)
  return (
    <Stack
      style={{
        height: '100%',
        width: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        borderColor: 'transparent',
      }}
      mt={2}
    >
      <TouchableOpacity onPress={() => onTab(screen[0])}>
        <Box
          style={{
            width: 45,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {tabIcon == "MoreIcon" ? <Text mt={-0.8} mb={2}
            style={{
              color: activeTab === screen[0] || activeTab === screen[1] ? COLOR.IBase : COLOR.BottomFontcolor,
              fontSize: 20
            }}>...</Text> : LAYOUT[tabIcon](activeTab === screen[0] || activeTab === screen[1] ? activeStyle : hiddenStyle)
          }
          <Text
            style={{
              color: activeTab === screen[0] || activeTab === screen[1] ? COLOR.IBase : COLOR.BottomFontcolor,
              fontSize: 8
            }}
            mt={-1.5}
          >
            {text}
          </Text>
        </Box>
      </TouchableOpacity>
    </Stack>
  )
}

export const Headers = ({ title = "", left = null, right = null }) => {
  return (
    <HStack
      h={55}
      px={3}
      mt={10}
      bg={COLOR.bg1}
      alignItems="center"
      justifyContent='space-between'
    >
      <View alignItems='flex-start' ml={3} w={10}>{left}</View>
      <Text fontSize='lg' bold color={COLOR.black}>{title}</Text>
      <View alignItems='flex-end' mr={4} w={10}>{right}</View>
    </HStack>
  )
}

export const Footers = ({ routeName }) => {
  const Api = useApi();
  const { user } = useSelector((store) => store.auth);
  const [badgeNum, setBadgeNum] = useState(0);

  useEffect(() => {
    Api.LoadAppointData(user.email === "admin@gmail.com" ? {} : { groomer: user.email }).then(({ data }) => {
      let bgn = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].__v === 0) {
          bgn++;
        };
      }
      setBadgeNum(bgn);
    }).catch(error => {
      console.log(`LoadAppointData`, error)
    })
  }, []);

  return (
    <Fragment>
      <Center pos='absolute' zIndex={1} alignSelf="center" w={65} bottom={6} style={{ elevation: 10 }}>
        <IconButton bg={"#fbedda"} variant="ghost" onPress={() => navigate("HomeScreen")} colorScheme="orange" w={57} h={57} borderWidth={1} borderRadius={100} borderColor={COLOR.base}
          icon={<Image source={Images.Logos} size="xs" resizeMode="contain" />}
        />
      </Center>
      <HStack bg={COLOR.white} alignItems="center" safeAreaBottom shadow={4}>
        <Pressable
          py={2}
          flex={1}
          onPress={() => navigate('ServicesScreen')}
          opacity={routeName === 'ServicesScreen' ? 1 : 0.7}
        >
          <Center>
            <Icon size="sm" viewBox="0 0 25.776 22.526">{LAYOUT.ServiceIcon(routeName === 'ServicesScreen' ? COLOR.base : "#71717a")}</Icon>
            <Text color={routeName === 'ServicesScreen' ? COLOR.base : "dark.400"} fontSize={9}>Services</Text>
          </Center>
        </Pressable>
        <Pressable
          py={2}
          flex={1}
          onPress={() => navigate('AppointmentsScreen')}
          opacity={routeName === 'AppointmentsScreen' ? 1 : 0.7}
        >
          <Center>
            <Icon size="sm" viewBox="0 0 23.376 24.526">{LAYOUT.AppointIcon(routeName === 'AppointmentsScreen' ? COLOR.base : "#71717a")}</Icon>
            <Text color={routeName === 'AppointmentsScreen' ? COLOR.base : "dark.400"} fontSize={9}>Appointments</Text>
          </Center>
          {
            badgeNum && user.roles !== "customer" ?
              <Badge colorScheme="danger" left={8} h={6} minW={6} alignItems="center" borderRadius={100} ml={1} pos="absolute" justifyContent="center" >
                <Text fontSize="xs" mt={1} textAlign="center">
                  {badgeNum}
                </Text>
              </Badge> : null
          }
        </Pressable>

        <Pressable w={70} />
        <Pressable
          py={2}
          flex={1}
          onPress={() => navigate('AccountScreen', { key: "footer" })}
          opacity={routeName === 'AccountScreen' ? 1 : 0.7}
        >
          <Center>
            <Icon size="sm" viewBox="0 0 17.321 19.51">{LAYOUT.FooterAccoundIcon(routeName === 'AccountScreen' ? COLOR.base : "#71717a")}</Icon>
            <Text color={routeName === 'AccountScreen' ? COLOR.base : "dark.400"} fontSize={9}>My Account</Text>
          </Center>
        </Pressable>
        <Pressable
          py={2}
          flex={1}
          onPress={() => navigate('InviteFriendsScreen')}
          opacity={routeName === 'InviteFriendsScreen' ? 1 : 0.7}
        >
          <Center>
            <Icon size="sm" mr={2} w={7} viewBox="0 0 27.269 19.862">{LAYOUT.InviteIcon(routeName === 'InviteFriendsScreen' ? COLOR.base : "#71717a")}</Icon>
            <Text color={routeName === 'InviteFriendsScreen' ? COLOR.base : "dark.400"} fontSize={9}>Invite Friends</Text>
          </Center>
        </Pressable>
      </HStack>
    </Fragment>
  )
}


export const Loading = () => {
  return (
    <View style={{
      position: 'absolute',
      elevation: 10,
      width: LAYOUT.window.width,
      height: LAYOUT.window.height,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 100
    }}>
      <Spinner color="blue.500" size="lg" />
    </View>
  )
}

export const MainCurrency = ({ data = {} }) => {
  const title = `${data.fShortName} / ${data.sShortName}`
  const percentChange = parseFloat(data.gain) * 100
  const last = parseFloat(data.price / Math.pow(10, data.sPrecision)).toFixed(6)
  const isPlus = percentChange > 0
  data.symbol = `${data.fShortName}${data.sShortName}`
  return (
    <TouchableOpacity onPress={() => navigate('TradingView', data)}>
      <Stack alignItems='center'>
        <Text fontSize='sm' bold color={COLOR.white}>{title}</Text>
        <Text fontSize='sm' color={isPlus ? COLOR.info : COLOR.danger}>{last}</Text>
        <Text fontSize='xs' color={COLOR.white}>{isPlus && '+'}{percentChange.toFixed(2)}%</Text>
      </Stack>
    </TouchableOpacity>
  )
}

export const MarketsItem = ({ data = {}, active = 'all' }) => {
  const percentChange = parseFloat(data.gain) * 100
  const isPlus = percentChange > 0
  const last = parseFloat(data.price / Math.pow(10, data.sPrecision)).toFixed(6)
  const volume = `${(parseFloat(data.volume / Math.pow(10, data.fPrecision))).toFixed(2)} ${data.fShortName}`
  const title = `${data.fShortName} / ${data.sShortName}`
  data.symbol = `${data.fShortName}${data.sShortName}`
  if (data.fShortName === 'USDJ' || data.sShortName == 'USDJ')
    return <View />
  if (active === 'ALL' || active === data.sShortName) {
    return (
      <HStack py={2} justifyContent='space-between' alignItems='center' borderBottomWidth={StyleSheet.hairlineWidth} borderColor={COLOR.grey}>
        <HStack alignItems='center'>
          <Image source={{ uri: data.logo }} size='xs' resizeMode='contain' alt='' />
          <Stack ml={2}>
            <Text fontSize='sm' bold color={COLOR.white}>{title}</Text>
            <Text fontSize='xs' color={COLOR.grey}>{volume}</Text>
          </Stack>
        </HStack>
        <Text fontSize='sm' color={COLOR.white}>{last}</Text>
        <Button
          py={2}
          px={3}
          borderRadius={4}
          disabled={data.listed === 0}
          bg={isPlus ? COLOR.success : COLOR.danger}
          onPress={() => navigate('TradingView', data)}
        >
          <Text fontSize='xs' color={COLOR.white}> {isPlus && '+'}{(percentChange).toFixed(2)}% </Text>
        </Button>
      </HStack>
    )
  } else {
    return <View />
  }
}

export const TreadingViewItem = ({ data = {} }) => {
  const percentChange = parseFloat(data.gain) * 100
  const isPlus = percentChange > 0
  const last = parseFloat(data.price / Math.pow(10, data.sPrecision)).toFixed(6)
  const volume = `${(parseFloat(data.trxVolume24h / Math.pow(10, data.fPrecision))).toFixed(0)}`
  const title = `${data.fShortName} / ${data.sShortName}`
  data.symbol = `${data.fShortName}${data.sShortName}`

  return (
    <HStack justifyContent='space-between' alignItems='center' p={2}>
      <HStack alignItems='center'>
        <Image source={{ uri: data.logo }} size='xs' resizeMode='contain' alt='' />
        <Stack ml={2}>
          <HStack alignItems='center'>
            <Text fontSize='sm' bold color={COLOR.white}>{title}</Text>
            <Text fontSize='xs' color={isPlus ? COLOR.success : COLOR.danger}> {isPlus && '+'}{(percentChange).toFixed(2)}%</Text>
          </HStack>
          <Text fontSize='sm' bold mt={2} color={isPlus ? COLOR.success : COLOR.danger}>{last}  {isPlus ? '↑' : '↓'}</Text>
        </Stack>
      </HStack>
      <Stack ml={2} alignItems='flex-end'>
        <Text fontSize='xs' bold color={COLOR.grey}> 24H VOL </Text>
        <Text fontSize='xs' bold color={COLOR.grey}> H </Text>
        <Text fontSize='xs' bold color={COLOR.grey}> L </Text>
      </Stack>
      <Stack alignItems='flex-end'>
        <Text fontSize='xs' color={COLOR.grey}> {volume} </Text>
        <Text fontSize='xs' color={COLOR.grey}> {data.highestPrice24h} </Text>
        <Text fontSize='xs' color={COLOR.grey}> {data.lowestPrice24h} </Text>
      </Stack>
    </HStack>
  )
}


// export const UserAvatars = ({ info = null, size = 35 }) => {
//   if (info && info.avatar) {
//     return (
//       <Stack alignSelf='flex-start'>
//         <UserAvatar
//           size={normalize(size)}
//           src={`${ROOT.IMAGE_URL}${info.avatar}`}
//           bgColors={COLOR.chatColor}
//         />
//       </Stack>
//     )
//   } else if (info && info.firstname && info.lastname) {
//     return (
//       <Stack alignSelf='flex-start'>
//         <UserAvatar
//           size={normalize(size)}
//           name={(info.firstname.slice(0, 1) + info.lastname.slice(0, 1)).toUpperCase()}
//           bgColors={COLOR.chatColor}
//         />
//       </Stack>
//     )
//   } else if (info && info.email) {
//     return (
//       <Stack alignSelf='flex-start'>
//         <UserAvatar
//           size={normalize(size)}
//           name={info.email.slice(0, 2).toUpperCase()}
//           bgColors={COLOR.chatColor}
//         />
//       </Stack>
//     )
//   } else {
//     return <View />
//   }
// }