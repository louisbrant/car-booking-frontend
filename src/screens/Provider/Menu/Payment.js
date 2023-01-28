import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, Checkbox, Select, CheckIcon } from 'native-base'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { SliderBox } from 'react-native-image-slider-box'
import normalize from 'react-native-normalize'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { Ionicons } from '@expo/vector-icons';

const PaymentScreen = ({ navigation }) => {
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
                title={'Add bank account'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={2} flex={1}>
                <Stack flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Stack pb={3} >
                            <Text fontSize="xs" mb={2} color="gray.400">{"Add your bank account to receive payments."}</Text>
                            <Text fontSize="sm" mb={2} color={COLOR.black}>{"Account number"}</Text>
                            <Input value={"xxxx-xxxx-xxxx-1234"} h={50} my={1} size="sm" isReadOnly borderRadius={10} bg={COLOR.white} py={10} _focus={{ borderColor: "gray.200" }} placeholder="Current Password"
                                _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                               
                            />
                            <Button my={2} alignSelf="flex-end"  variant="ghost" w="50%" bg={COLOR.base} h={45} onPress={() => navigation.goBack()} colorScheme="orange" borderRadius={15}><Text color={COLOR.white} fontSize="md" pt={1}>Remove</Text></Button>
                        </Stack>
                       
                    </ScrollView>
                </Stack>
            </Box>
        </Box>
    )
}

export default PaymentScreen