import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, Switch } from 'native-base'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'

const SettingScreen = ({ navigation }) => {
    const Api = useApi()
    const [loading, setLoading] = useState(false)
    const [AppointData, setAppointData] = useState(false)
    const { user } = useSelector((store) => store.auth);

    const LoadAppointData = () => {
        // setLoading(true)
        // Api.LoadAppointData().then(({ data }) => {
        //     setLoading(false)
        //     setAppointData(data.data)
        // }).catch(error => {
        //     setLoading(false)
        //     console.log(`LoadAppointData`, error)
        // })
    }


    useEffect(() => {
        LoadAppointData()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            <Headers
                title={'Setting'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} flex={1}>
                <Stack flex={1}>
                    <HStack h={51} justifyContent="space-between" alignItems="center" borderBottomWidth={1} borderColor="gray.300" py={3} pr={1}>
                        <Text fontSize="sm" color={COLOR.black}>Email promotions</Text>
                        <Switch colorScheme="green" />
                    </HStack>
                    <HStack h={51} justifyContent="space-between" alignItems="center" borderBottomWidth={1} borderColor="gray.300" py={3} pr={1}>
                        <Text fontSize="sm" color={COLOR.black}>Message</Text>
                        <Switch defaultIsChecked={true} colorScheme="green" />
                    </HStack>
                    {
                        user.roles === "provider" ? <HStack h={51} justifyContent="space-between" alignItems="center" borderBottomWidth={1} borderColor="gray.300" py={3} pr={1}>
                            <Text fontSize="sm" color={COLOR.black}>Appontments abailability</Text>
                            <Switch defaultIsChecked={true} colorScheme="green" />
                        </HStack> : null
                    }

                    <HStack h={51} justifyContent="space-between" alignItems="center" borderBottomWidth={1} borderColor="gray.300" py={3} pr={2}>
                        <Text fontSize="sm" color={COLOR.black}>Language</Text>
                    </HStack>
                    <TouchableOpacity onPress={() => navigation.navigate("ChangePassScreen")}>
                        <HStack h={51} justifyContent="space-between" alignItems="center" borderBottomWidth={1} borderColor="gray.300" py={3} pr={3}>
                            <Text fontSize="sm" color={COLOR.black}>Change password</Text>
                            <Icon size="xs" borderRadius={100} bg="gray.200" as={<Entypo name="chevron-right" />} />
                        </HStack>
                    </TouchableOpacity>
                </Stack>
            </Box>
        </Box>
    )
}

export default SettingScreen