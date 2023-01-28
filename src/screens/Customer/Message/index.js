import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center } from 'native-base'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'

const CatProfileScreen = ({ navigation }) => {
    const Api = useApi()
    const [loading, setLoading] = useState(false)
    const [AppointData, setAppointData] = useState(false)

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
                title={'Cat Profile'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} flex={1} pb={20} alignItems="center" justifyContent="center">
                <Box w={100} h={100} borderRadius={100} alignItems="center" justifyContent="center" borderColor={COLOR.base} borderWidth={1}>
                    <Icon viewBox="0 0 18.034 19.995" size="xl">{LAYOUT.CatIcon}</Icon>
                </Box>
                <Button onPress={()=>navigation.navigate("EditCatProfileScreen")} h={45} variant="ghost" my={8} w="50%" bg={COLOR.base} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.white}>Add Cat</Text></Button>
            </Box>
        </Box>
    )
}

export default CatProfileScreen