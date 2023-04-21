import React, { useCallback, useState, useEffect } from 'react';
import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";
import { ScrollView, TouchableOpacity } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, Menu, Pressable, useToast } from "native-base";
import Slider from 'rn-range-slider';
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons"

// import CalendarPicker from 'react-native-calendar-picker';
// import { Calendar, CalendarList } from "react-native-calendars";
// import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarList from 'react-native-calendar-list';

import { useDispatch, useSelector } from 'react-redux'
import { BottomTab } from '../../../components';

import Thumb from './../Slider/Thumb';
import Rail from './../Slider/Rail';
import RailSelected from './../Slider/RailSelected';
import Notch from './../Slider/Notch';
import Label from './../Slider/Label';

import { useApi } from '../../../redux/services'
import { Logut } from '../../../redux/actions/authActions'
import { setCarInfo } from '../../../redux/actions/authActions';

import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { borderRadius, textAlign } from 'styled-system';
import { width } from 'styled-system';

const markStyle = { dayTextStyle: { color: 'white', fontSize: 14, fontWeight: 'bold' }, dayBackgroundColor: '#08a' };

const DescriptionScreenPage = ({ navigation }) => {
    const { car } = useSelector((store) => store.auth)
    const dispatch = useDispatch()

    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('')


    const onFinalizeCarShow = () => {
        return navigation.navigate("FinalizeCarPageScreen");
    }

    const onClose = () => {
        return navigation.navigate("CarHomeScreen");
    }
    useEffect(() => {
        setLoading(false);
    }, [])
    return (
        <Box
            flex={1}
            bg={{
                linearGradient: {
                    colors: [COLOR.InputBlackWhiteBg, COLOR.InputBlackWhiteBg],
                    start: [0, 1],
                    end: [0, 0]
                }
            }}
            height={'100%'}
        >
            {loading && <Loading />}
            <BottomTab navigation={navigation} />
            <Box
                pt={10}
                pb={2}
                px={5}
                style={{
                    backgroundColor: COLOR.InputBlackWhiteBg,
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
                        <Icon color={COLOR.black} size="md" as={<Ionicons name="arrow-back" />} />
                    </TouchableOpacity>
                </HStack>
            </Box>

            <Box py={3} px={5}
                bg={COLOR.InputBlackWhiteBg}>
                <HStack justifyContent="space-between" pb={5}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            style={{ fontSize: 18 }}
                        >
                            Description
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={4}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            Tell guests what makes your car unique and why
                            they'll love driving it.
                        </Text>
                    </VStack>
                </HStack>

                <HStack justifyContent="space-between" pb={2}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="sm"
                            onPress={onFinalizeCarShow}
                        >
                            What should I include?
                        </Text>
                    </VStack>
                </HStack>

                <HStack justifyContent="space-between" pb={4}>
                    <VStack w="100%" px={3} py={3} space={1} style={{
                        backgroundColor: COLOR.DescriptionScreenbgcolor
                    }}>
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec ipsum ac quam auctor dapibus at sed ante.
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
                            I love my car. It's luxurious and extremely fast.
                        </Text>
                    </VStack>
                </HStack>
            </Box>
        </Box>
    );
};
export default DescriptionScreenPage;