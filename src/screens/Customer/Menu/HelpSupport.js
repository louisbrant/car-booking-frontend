import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, TextArea } from 'native-base'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'

const HelpSupportScreen = ({ navigation }) => {
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
                title={'Help & Support'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={2} flex={1}>
                <Stack flex={1}>
                    <Text color="#717171" lineHeight="18px" fontSize="xs" mb={3}>
                        Submit your message and we will get back to you within 48 hours.
                    </Text>
                    <Input h={45} my={1} size="sm" borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.300" }} placeholder="Subject"
                        _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                    />
                    <TextArea bg={COLOR.white} py={3} placeholderTextColor="#cccccc" borderRadius={15} size="sm" _focus={{ borderColor: "gray.300" }} textAlignVertical='top' h={130} placeholder="Write your message here" my={1} />
                    <Button mt={2} bg={COLOR.base} variant="ghost" h={45} onPress={() => navigation.goBack()} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.white}>Contact Us</Text></Button>
                    <Center mt={5}>
                        <Text color={COLOR.base} my={1} fontSize="sm">Need help?</Text>
                        <Text color="gray.800" my={1} fontSize="xs">FAQ's?</Text>
                        <Text color="gray.800" my={1} fontSize="xs">Terms & Conditions</Text>
                        <Text color="gray.800" my={1} fontSize="xs">cancellation policy</Text>
                    </Center>
                </Stack>
            </Box>
        </Box>
    )
}

export default HelpSupportScreen