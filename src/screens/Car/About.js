import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, useToast } from 'native-base'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { SliderBox } from 'react-native-image-slider-box'
import normalize from 'react-native-normalize'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../components'
import { COLOR, Images, LAYOUT } from '../../constants'
import { useApi } from '../../redux/services'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { register_service_store } from '../../redux/actions/authActions'

const AboutScreen = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
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

    const Next = () => {
        if (email && username && password && cPassword) {
            if (password === cPassword) {
                Api.EmailCheck({ email: email }).then(({ data }) => {
                    if (data) {
                        dispatch(register_service_store({
                            email, username, password
                        }));
                        navigation.navigate("OpeningHourScreen")
                    } else {
                        return Toast.show({ title: 'Email was signed aleady!', placement: 'bottom', status: 'error' , w: 400  })
                    }
                })
            } else {
                return Toast.show({ title: 'Confirm password was incorrect!', placement: 'bottom', status: 'error' , w: 400  })
            }
        } else {
            return Toast.show({ title: 'Something was wrong!', placement: 'bottom', status: 'error' , w: 400  })
        }
    }


    useEffect(() => {
        LoadAppointData()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            <Headers
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={2} flex={1}>
                <Stack flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <Text color={COLOR.black} fontSize="lg">About You</Text>
                        <Text fontSize="sm" color="gray.500">Add details about you to start getting pet grooming bookings.</Text>
                        <Stack mt={3} flex={1}>
                            <Input
                                py={0}
                                InputLeftElement={
                                    <Icon
                                        size="xs"
                                        ml={4}
                                        h={5}
                                        w={5}
                                        _light={{
                                            color: "gray.300",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                        viewBox="-2 0 20 20"
                                    >{LAYOUT.userIcon}</Icon>
                                }
                                _focus={{
                                    borderColor: "gray.200"
                                }}
                                my={2}
                                bg={COLOR.white}
                                size='sm'
                                h={50}
                                borderWidth={2}
                                borderRadius={15}
                                onChangeText={setUserName}
                                placeholder="Full name"
                            />
                            <Input
                                py={0}
                                InputLeftElement={
                                    <Icon
                                        w={5}
                                        size="xs"
                                        ml={4}
                                        _light={{
                                            color: "gray.300",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                        viewBox="1 -2 17 17"
                                    >{LAYOUT.mailIcon}</Icon>
                                }
                                _focus={{
                                    borderColor: "gray.200"
                                }}
                                bg={COLOR.white}
                                my={2}
                                size='sm'
                                h={50}
                                borderWidth={2}
                                borderRadius={15}
                                onChangeText={setEmail}
                                placeholder="Email"
                            />
                            <Input
                                py={0}
                                InputLeftElement={
                                    <Icon
                                        size="xs"
                                        h={5}
                                        ml={5}
                                        _light={{
                                            color: "gray.300",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    >{LAYOUT.keyIcon}</Icon>
                                }
                                _focus={{
                                    borderColor: "gray.200"
                                }}
                                bg={COLOR.white}
                                my={2}
                                size='sm'
                                h={50}
                                borderWidth={2}
                                borderRadius={15}
                                onChangeText={setPassword}
                                placeholder="Password"
                                type='password'
                            />
                            <Input
                                py={0}
                                InputLeftElement={
                                    <Icon
                                        size="xs"
                                        h={5}
                                        ml={5}
                                        _light={{
                                            color: "gray.300",
                                        }}
                                        _dark={{
                                            color: "gray.300",
                                        }}
                                    >{LAYOUT.keyIcon}</Icon>
                                }
                                _focus={{
                                    borderColor: "gray.200"
                                }}
                                bg={COLOR.white}
                                my={2}
                                size='sm'
                                h={50}
                                borderWidth={2}
                                borderRadius={15}
                                onChangeText={setCPassword}
                                placeholder="Confirm Password"
                                type='password'
                            />
                        </Stack>
                    </ScrollView>
                    <Button mb={10} variant="ghost" bg={COLOR.base} onPress={Next} h={50} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.white}>Continue</Text></Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default AboutScreen