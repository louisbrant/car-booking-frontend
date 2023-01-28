import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Checkbox, CheckIcon, Select, TextArea, Input, useToast, Spinner } from 'native-base'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux';
import moment from 'moment';

const SetPaymentScreen = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast();
    const { bookdata, user } = useSelector((store) => store.auth);
    const [loading, setLoading] = useState(false)
    const [loadingNext, setloadingNext] = useState(false)
    const [cardName, setcardName] = useState(false)
    const [cardNumber, setcardNumber] = useState(false)
    const [expiryMonth, setexpiryMonth] = useState(false)
    const [expiryYear, setexpiryYear] = useState(false)
    const [cvvCode, setcvvCode] = useState(false)
    const Save = () => {
        // if (cardName && cardNumber && expiryMonth && expiryYear && cvvCode) {
        setloadingNext(true);
        if (bookdata.reschedule) {
            Api.RescheduleBook({ ...bookdata, groomer: "", client: user.email, payments: { cardName, cardNumber, expiryMonth, expiryYear, cvvCode } }).then(({ data }) => {
                if (data.status === true) {
                    setloadingNext(false);
                    return navigation.navigate('ConfirmedScreen');
                } else {
                    setloadingNext(false);
                    return Toast.show({ title: data.message, placement: 'bottom', status: 'success', w: 400  })
                }
            })
        } else {
            Api.CreateBook({ ...bookdata, groomer: "", client: user.email, payments: { cardName, cardNumber, expiryMonth, expiryYear, cvvCode } }).then(({ data }) => {
                if (data.status === true) {
                    setloadingNext(false);
                    return navigation.navigate('ConfirmedScreen');
                } else {
                    setloadingNext(false);
                    return Toast.show({ title: data.message, placement: 'bottom', status: 'success' , w: 400 })
                }
            })
        }
        // } else {
        //     return Toast.show({ title: "Something is not entered!", placement: 'bottom', status: 'error' })
        // }
    }
    return (
        <Box flex={1} bg={COLOR.bg1}>
            {loading && <Loading />}
            <Headers
                title={'Schedule Appointment'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Stack flex={1} pt={2} px={8} pb={5}>
                    {/* <Stack borderBottomWidth={4} pb={4} borderColor="gray.300"> */}
                    <Stack pb={4} borderColor="gray.300">
                        <Text fontSize="sm" color={COLOR.black}>{"Confirm details"}</Text>
                        <Stack mt={3} borderBottomWidth={1} borderColor="gray.200">
                            <Text fontSize="sm" color="gray.400">Service type</Text>
                            <Text fontSize="sm" color={COLOR.black} my={2}>{bookdata.Servicetype === "home" ? 'In Home' : 'Mobile Van'}</Text>
                        </Stack>
                        <Stack mt={3} borderBottomWidth={1} borderColor="gray.200">
                            <Text fontSize="sm" color="gray.400">Dog name</Text>
                            <Text fontSize="sm" color={COLOR.black} my={2}>Tiku</Text>
                        </Stack>
                        <Stack mt={3} borderBottomWidth={1} borderColor="gray.200">
                            <Text fontSize="sm" color="gray.400">Service package</Text>
                            <Text fontSize="sm" color={COLOR.black} my={2}>Gold pack</Text>
                        </Stack>
                        <Stack mt={3} borderBottomWidth={1} borderColor="gray.200">
                            <Text fontSize="sm" color="gray.400">Appointment Schedule</Text>
                            <Text fontSize="sm" color={COLOR.black} my={2}>{moment(bookdata.day).format('DD MMMM YYYY') + " " + bookdata.time}</Text>
                        </Stack>
                        <Stack mt={3} borderBottomWidth={1} borderColor="gray.200">
                            <Text fontSize="sm" color="gray.400">Address</Text>
                            <Text fontSize="sm" color={COLOR.black} my={2}>{bookdata.groomplace}</Text>
                        </Stack>
                        <Stack mt={3} >
                            <Text fontSize="sm" color="gray.400">Total amount</Text>
                            <Text fontSize="sm" color={COLOR.black} my={2}>${bookdata.totalPayment}</Text>
                        </Stack>

                    </Stack>

                    {/* <Stack pb={4}>
                        <Text fontSize="sm" my={3} color={COLOR.black}>{"Payment"}</Text>
                        <Input h={45} my={2} size="sm" onChangeText={setcardName} borderRadius={15} bg={COLOR.white} py={10} _focus={{ borderColor: "gray.200" }} placeholder="Cardholder full name"
                            _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                        />
                        <Input h={45} my={2} size="sm" onChangeText={setcardNumber} borderRadius={15} bg={COLOR.white} py={10} _focus={{ borderColor: "gray.200" }} placeholder="Card Number"
                            _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                        />
                        <HStack justifyContent="space-between">
                            <Input h={45}
                                w="48%"
                                my={2}
                                size="sm"
                                onChangeText={setexpiryMonth}
                                borderRadius={15}
                                bg={COLOR.white}
                                py={10}
                                _focus={{ borderColor: "gray.200" }}
                                placeholder="Expiry month"
                                _light={{ placeholderTextColor: "#cccccc", }}
                                _dark={{ placeholderTextColor: "#cccccc", }}
                            />
                            <Input
                                h={45}
                                w="48%"
                                my={2}
                                size="sm"
                                onChangeText={setexpiryYear}
                                borderRadius={15}
                                bg={COLOR.white}
                                py={10}
                                _focus={{ borderColor: "gray.200" }}
                                placeholder="Expiry Year"
                                _light={{ placeholderTextColor: "#cccccc", }}
                                _dark={{ placeholderTextColor: "#cccccc", }}
                            />
                        </HStack>
                        <Input h={45} my={2} size="sm" onChangeText={setcvvCode} w="48%" borderRadius={15} bg={COLOR.white} py={10} _focus={{ borderColor: "gray.200" }} placeholder="Enter CVV"
                            _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                        />
                        <HStack>
                            <Checkbox
                                value={COLOR.base}
                                colorScheme="dark"
                                aria-label="check"
                                size="md"
                                my={2}
                                icon={<Icon as={<AntDesign name="checksquareo" />} />}
                            >
                                <Text ml={3} fontSize={10} color="gray.500">
                                    Make this card as default
                                </Text>
                            </Checkbox>
                        </HStack>
                    </Stack> */}
                    <Button
                        my={5}
                        variant="ghost"
                        bg={COLOR.base}
                        onPress={Save}
                        colorScheme="orange"
                        borderRadius={15}
                        h={45}
                        disabled={loadingNext}
                    >
                        {loadingNext ?
                            <Spinner size='sm' /> :
                            <Text pt={1} fontSize="md" color={COLOR.white} >Submit</Text>
                        }

                    </Button>
                </Stack>
            </ScrollView>
        </Box>
    )
}

export default SetPaymentScreen