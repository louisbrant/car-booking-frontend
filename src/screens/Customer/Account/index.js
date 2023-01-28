import React, { Fragment, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, Text, Image, Button } from 'native-base'
import { Entypo } from '@expo/vector-icons'
import { Footers, Headers, Loading } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'

const AccountScreen = ({ navigation }) => {
    const Api = useApi()
    const [loading, setLoading] = useState(false)
    const [ProfileData, setProfileData] = useState(false)
    const { user } = useSelector((store) => store.auth);
    const key = navigation.state.params.key;
    const LoadProfileData = () => {

    }


    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            <Headers
                title={'My Account'}
                left={
                    key ?
                        <TouchableOpacity onPress={navigation.openDrawer} >
                            <Icon borderRadius={8} bg={COLOR.base} size='md' color={COLOR.white} >{LAYOUT.drawerIcon}</Icon>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                        </TouchableOpacity>
                }
            />
            < Box px={7} py={3} flex={1} >
                <Stack alignItems="center" space={2}>
                    <Image borderRadius={100} source={user.avatar ? { uri: `${ROOT.IMAGE_URL}users/` + user.avatar } : Images.Profile} size="lg" />
                    <Text fontSize="md" color={COLOR.base} bold>{user.username}</Text>
                </Stack>
                <Stack py={7} flex={1}>
                    <Text mt={3} mb={2} color="gray.400" fontSize={10}>Phone number</Text>
                    <Text color={COLOR.black} fontSize="sm" borderBottomWidth={1} borderColor="gray.300" pb={3}>{user.phone}</Text>
                    <Text mt={3} mb={2} color="gray.400" fontSize={10}>Email</Text>
                    <Text color={COLOR.black} fontSize="sm" borderBottomWidth={1} borderColor="gray.300" pb={3}>{user.email}</Text>
                    <Text mt={3} mb={2} color="gray.400" fontSize={10}>Zip Code</Text>
                    <Text color={COLOR.black} fontSize="sm" pb={3}>{user.zipcode}</Text>
                    {
                        user.roles === "customer" ?
                            <Fragment>
                                <Text borderTopWidth={1} borderColor="gray.300" pt={3} mb={2} color="gray.400" fontSize={10}>My pets</Text>
                                <Text color={COLOR.black} fontSize="sm">{user.pets}</Text>
                            </Fragment>
                            : null
                    }

                </Stack>
                <Button mb={5} bg={COLOR.base} h={45} onPress={() => navigation.navigate("EditAccountScreen")} variant="ghost" colorScheme="orange" borderRadius={15}><Text color={COLOR.white} pt={1} fontSize="md">Edit profile</Text></Button>
            </Box >
            {
                key ?
                    <Footers routeName="AccountScreen" />
                    : null
            }
        </Box >
    )
}

export default AccountScreen