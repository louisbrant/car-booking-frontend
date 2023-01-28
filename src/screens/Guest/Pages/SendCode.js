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

const SendCodePage = ({ navigation }) => {
    const { user } = useSelector((store) => store.auth)

    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);
    const [codeval, setCodeVal] = useState('')

    const onSendEmail = () => {
        Api.SendCode({ email: user.email, type: 'email' }).then(({ data }) => {
            console.log(data);
            if (data.status) {
                Toast.show({ title: "Send Code in Email!", placement: 'top', status: 'success', w: 300 });
                navigation.navigate("EnterOTPScreen");
            }
            else {
                return Toast.show({ title: data.message, placement: 'top', status: 'error', w: 300 })
            }
        }).catch(error => {
            console.log(error);
            if (error.response && error.response.status === 400) {
                Toast.show({ title: error.response.data, placement: 'top', status: 'error', w: 300 })
            } else {
                return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 })
            }
        })
    }

    const onTextCodeSubmit = () => {
        Api.SendCode({ email: user.email, type: "phone" }).then(({ data }) => {
            console.log(data);
            if (data.status) {
                Toast.show({ title: "Send Code in your phone!", placement: 'top', status: 'success', w: 300 })
                return navigation.navigate("EnterOTPScreen");
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
                    colors: ['#FFFFFF', '#FFFFFF'],
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
                            Verification
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
                            This extra step is required to keep your account safe. We'll text a code to your phone number ending in:
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

                <HStack justifyContent="space-between" >
                    <VStack w="100%" space={1} >
                        <Text color={COLOR.IBase} mr={2} onPress={onSendEmail} fontWeight="semibold" fontSize="sm">Or verify with email instead
                        </Text>
                    </VStack>
                </HStack>
            </Box>

            <Box position="absolute" bottom={35} w="full" px={5}>
                <TouchableOpacity onPress={onTextCodeSubmit}>
                    <Box
                        style={{
                            width: '100%',
                            height: 45,
                            backgroundColor: COLOR.IBase,
                            borderRadius: 5,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        mt={5}
                        py={2}
                    >
                        <Text
                            color={COLOR.white}
                            fontWeight="bold"
                            fontSize="md"
                        >
                            Text code
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    );
};
export default SendCodePage;