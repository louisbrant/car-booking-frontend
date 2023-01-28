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
                title={'Payments'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={2} flex={1}>
                <Stack flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <Stack pb={3} borderBottomWidth={1} borderColor="gray.300">
                            <Text fontSize="sm" mb={2} color={COLOR.black}>{"Saved card"}</Text>
                            <Input h={45} my={1} size="sm" borderRadius={10} bg={COLOR.white} py={10} _focus={{ borderColor: "gray.200" }} placeholder="Current Password"
                                _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                                InputRightElement={
                                    <Icon
                                        viewBox="0 0 23.751 17.165"
                                        size="sm"
                                        m={2}
                                        _light={{
                                            color: "black",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                        right={2}
                                    >{LAYOUT.PaymentIcon}</Icon>
                                }
                            />
                            <Button my={2} alignSelf="flex-end"  variant="ghost" w="50%" bg={COLOR.base} h={45} onPress={() => navigation.goBack()} colorScheme="orange" borderRadius={15}><Text color={COLOR.white} fontSize="md" pt={1}>Remove</Text></Button>
                        </Stack>
                        <Stack pb={4}>
                            <Text fontSize="sm" my={3} color={COLOR.black}>{"Add new card"}</Text>
                            <Input h={45} my={2} size="sm" borderRadius={10} bg={COLOR.white} py={10} _focus={{ borderColor: "gray.200" }} placeholder="Cardholder full name"
                                _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                            />
                            <Input h={45} my={2} size="sm" borderRadius={10} bg={COLOR.white} py={10} _focus={{ borderColor: "gray.200" }} placeholder="Card Number"
                                _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                            />
                            <HStack justifyContent="space-between">
                                <Select
                                    // selectedValue={language}
                                    w="48%"
                                    color={COLOR.black}
                                    bg={COLOR.white}
                                    fontSize="sm"
                                    h={45}
                                    my={2}
                                    borderRadius={10}
                                    accessibilityLabel="Select your favorite programming language"
                                    placeholder="Expiry Month"
                                    placeholderTextColor="#cccccc"
                                    // onValueChange={(itemValue) => setLanguage(itemValue)}
                                    _selectedItem={{
                                        bg: "cyan.600",
                                        endIcon: <CheckIcon size={4} />,
                                    }}
                                >
                                    <Select.Item label="table" value="table" />
                                    <Select.Item label="bathtub" value="bathtub" />
                                    <Select.Item label="kitchen sink" value="ks" />
                                    <Select.Item label="Others" value="Other" />
                                </Select>
                                <Select
                                    // selectedValue={language}
                                    color={COLOR.black}
                                    w="48%"
                                    bg={COLOR.white}
                                    borderRadius={10}
                                    fontSize="sm"
                                    placeholderTextColor="#cccccc"
                                    h={45}
                                    my={2}
                                    accessibilityLabel="Select your favorite programming language"
                                    placeholder="Expiry Year"
                                    // onValueChange={(itemValue) => setLanguage(itemValue)}
                                    _selectedItem={{
                                        bg: "cyan.600",
                                        endIcon: <CheckIcon size={4} />,
                                    }}
                                >
                                    <Select.Item label="table" value="table" />
                                    <Select.Item label="bathtub" value="bathtub" />
                                    <Select.Item label="kitchen sink" value="ks" />
                                    <Select.Item label="Others" value="Other" />
                                </Select>
                            </HStack>
                            <Input h={45} my={2} size="sm" w="48%" borderRadius={10} bg={COLOR.white} py={10} _focus={{ borderColor: "gray.200" }} placeholder="Enter CVV"
                                _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                            />
                            <Button mt={8} h={45} bg={COLOR.base} variant="ghost" onPress={() => navigation.goBack()} colorScheme="orange" borderRadius={15}><Text color={COLOR.white} fontSize="md" pt={1}>Add Card</Text></Button>
                        </Stack>
                    </ScrollView>
                </Stack>
            </Box>
        </Box>
    )
}

export default PaymentScreen