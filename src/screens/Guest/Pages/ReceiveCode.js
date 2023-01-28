import React, { useCallback, useState, useEffect } from 'react';
import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";
import { ScrollView, TouchableOpacity } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, Menu, Pressable, useToast } from "native-base";
import Slider from 'rn-range-slider';
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Feather, FontAwesome } from "@expo/vector-icons"

// import CalendarPicker from 'react-native-calendar-picker';
// import { Calendar, CalendarList } from "react-native-calendars";
// import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarList from 'react-native-calendar-list';

import { useDispatch, useSelector } from 'react-redux'

import Thumb from './../Slider/Thumb';
import Rail from './../Slider/Rail';
import RailSelected from './../Slider/RailSelected';
import Notch from './../Slider/Notch';
import Label from './../Slider/Label';

import { useApi } from '../../../redux/services'
import { Logut } from '../../../redux/actions/authActions'

import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'

const markStyle = { dayTextStyle: { color: 'white', fontSize: 14, fontWeight: 'bold' }, dayBackgroundColor: '#08a' };

const ReceiveCodePage = ({ navigation }) => {
    const { user } = useSelector((store) => store.auth)

    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);
    const [codeval, setCodeVal] = useState('')

    const onRecendCode = () => {
        Api.RecendCode({ email: user.email }).then(({ data }) => {
            if (data.status) {
                return Toast.show({ title: "Recend Code!", placement: 'top', status: 'success', w: 300 })
            }
            else {
                return Toast.show({ title: data.message, placement: 'top', status: 'error', w: 300 })
            }
        }).catch(error => {
            console.log(error);
            if (error.response && error.response.status === 400) {
                return Toast.show({ title: error.response.data, placement: 'top', status: 'error', w: 300 })
            } else {
                return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 })
            }
        })
    }

    const onVerifySubmit = () => {
        Api.VerifyCode({ email: user.email, codeval }).then(({ data }) => {
            if (data.status) {
                Toast.show({ title: data.message, placement: 'top', status: 'success', w: 300 })
                return navigation.navigate("SignInScreen");
            }
            else {
                return Toast.show({ title: data.message, placement: 'top', status: 'error', w: 300 })
            }
        }).catch(error => {
            console.log(error);
            if (error.response && error.response.status === 400) {
                return Toast.show({ title: error.response.data, placement: 'top', status: 'error', w: 300 })
            } else {
                return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 })
            }
        })
    }

    const onClose = () => {
        return navigation.navigate("SignUpScreen");
    }
    useEffect(() => {
        setLoading(false);
    }, [])
    return (
        <Box
            flex={1}
            bg={{
                linearGradient: {
                    colors: ['#FFFFFF', '#F3F3F3'],
                    start: [0, 1],
                    end: [0, 0]
                }
            }}
        >
            {loading && <Loading />}
            <Box
                pt={10}
                pb={2}
                px={5}
                style={{
                    backgroundColor: COLOR.white,
                    width: '100%',
                    shadowColor: "#B1A9A9",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 24,
                    // elevation: 1,
                }}
            >
                <HStack justifyContent="space-between">
                    <TouchableOpacity onPress={onClose}>
                        <Icon color={COLOR.black} size="md" as={<AntDesign name="close" />} />
                    </TouchableOpacity>
                </HStack>
            </Box>

            <Box py={3} px={5}
                bg={COLOR.white}>
                <HStack justifyContent="space-between" pb={5}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            style={{ fontSize: 18 }}
                        >
                            Enter code
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
                            We texted a code to your number ending in:
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={6}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            fontSize="sm"
                        >
                            (***) ***-1234
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="flex-start" pb={4}>
                    <VStack w="full" space={1}>
                        <Input
                            w="full"
                            InputLeftElement={
                                <Text
                                    color={COLOR.black}
                                    fontWeight="medium"
                                    fontSize="xs"
                                    px={3}
                                >
                                    Izra code
                                </Text>
                            }
                            onChangeText={setCodeVal}
                            bg={COLOR.white}
                            p={2}
                            borderStyle="solid"
                            borderWidth={0}
                            bgColor={COLOR.InputBlackWhiteBg}
                            color={COLOR.black}
                            placeholder="Enter code"
                            keyboardType='numeric'
                        />
                    </VStack>
                </HStack>

                <HStack justifyContent="space-between" >
                    <VStack w="100%" space={1} >
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            fontSize="sm"
                            textAlign="center"
                        >
                            Didn't receive the code?
                            <Text color={COLOR.IBase} mr={2} onPress={onRecendCode} fontWeight="semibold" fontSize="sm">
                                &nbsp;&nbsp;Recend code
                            </Text>
                        </Text>
                    </VStack>
                </HStack>


                <Box mt={20}>
                    <TouchableOpacity>
                        <Box
                            style={{
                                width: '100%',
                                height: 45,
                                backgroundColor: COLOR.InputBlackWhiteBg,
                                borderRadius: 5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            py={2}
                            onTouchStart={onVerifySubmit}
                        >
                            <Text
                                color={COLOR.inPlaceholder}
                                fontWeight="bold"
                                fontSize="md"
                            >
                                Submit
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>


        </Box>
    );
};
export default ReceiveCodePage;