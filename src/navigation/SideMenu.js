import React from 'react'
import { useDispatch } from 'react-redux'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Icon, ScrollView, Text, Image, Box, HStack, Stack } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { COLOR, Images, LAYOUT, Profile, ProviderSideMenu, ROOT } from '../constants'
import { Logut } from '../redux/actions/authActions'
import { navigate } from '../redux/services'
import { useSelector } from 'react-redux'

export default () => {
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.auth)
  const SignOut = () => {
    ROOT.Socket.emit("logout user");
    dispatch(Logut())
  }
  return (
    <Box flex={1} w='100%' bgColor={COLOR.white} borderTopRightRadius={35}>
      <ImageBackground
        borderTopRightRadius={30}
        resizeMode={'cover'}
        source={Images.Drawer}
        style={{ width: "100%", height: 160 }}
      >
        <Box w={8} position="absolute" right={6} top={12}>
          <TouchableOpacity onPress={() => navigate("SettingScreen")}>
            <Icon size={7} color={COLOR.white} as={<AntDesign name="setting" />} />
          </TouchableOpacity>
        </Box>
        <HStack alignItems="center" pt={20} px={6} h={130}>
          <Image size="sm" borderRadius={100} source={user.avatar ? { uri: `${ROOT.IMAGE_URL}users/` + user.avatar } : user.roles === "customer" ? Images.Profile : Images.GroomerAvata} />
          <Stack>
            <Text fontSize="md" color={COLOR.white} ml={4} numberOfLines={1} w={120} fontWeight={700}>{user ? user.username : ""}</Text>
            <Text fontSize="xs" color={COLOR.white} ml={4}>{user.phone}</Text>
          </Stack>
        </HStack>
      </ImageBackground>
      <Stack flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            user.roles === "customer" ?
              Profile.map((item, key) => (
                <TouchableOpacity key={key} onPress={() => navigate(item.navLink)}>
                  <HStack alignItems='center' px={5} py={2} borderBottomWidth={1} borderColor="gray.100">
                    <Icon color={COLOR.buttonGColor[0]} viewBox="0 0 24 22" size='sm'>{item.icon}</Icon>
                    <Text color={COLOR.black} pl={4} fontSize='md'> {item.title} </Text>
                  </HStack>
                </TouchableOpacity>
              )) :
              ProviderSideMenu.map((item, key) => {
                if (item.id === "manageGroomer") {
                  if (user.roles === "admin") {
                    return <TouchableOpacity key={key} onPress={() => navigate(item.navLink)}>
                      <HStack alignItems='center' px={5} py={2} borderBottomWidth={1} borderColor="gray.100">
                        <Icon color={COLOR.buttonGColor[0]} viewBox="0 0 24 22" size='sm'>{item.icon}</Icon>
                        <Text color={COLOR.black} pl={4} fontSize='md'> {item.title} </Text>
                      </HStack>
                    </TouchableOpacity>
                  }
                } else {
                  return <TouchableOpacity key={key} onPress={() => navigate(item.navLink)}>
                    <HStack alignItems='center' px={5} py={2} borderBottomWidth={1} borderColor="gray.100">
                      <Icon color={COLOR.buttonGColor[0]} viewBox="0 0 24 22" size='sm'>{item.icon}</Icon>
                      <Text color={COLOR.black} pl={4} fontSize='md'> {item.title} </Text>
                    </HStack>
                  </TouchableOpacity>
                }
              })
          }
          <TouchableOpacity onPress={SignOut}>
            <HStack alignItems='center' px={5} py={2} borderColor="gray.200">
              <Icon color={COLOR.buttonGColor[0]} viewBox="-2 0 22 20" size='sm'>{LAYOUT.LogOutIcon}</Icon>
              <Text color={COLOR.black} pl={4} fontSize='md'> Log Out </Text>
            </HStack>
          </TouchableOpacity>
        </ScrollView>
      </Stack>
    </Box >
  )
}