import React, { useCallback, useState, useEffect } from 'react';
import { COLOR, Images, LAYOUT, ROOT } from "../../constants";
import { ScrollView, TouchableOpacity } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, Menu, Pressable, useToast } from "native-base";
import Slider from 'rn-range-slider';
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Feather, FontAwesome } from "@expo/vector-icons"

// import CalendarPicker from 'react-native-calendar-picker';
// import { Calendar, CalendarList } from "react-native-calendars";
// import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarList from 'react-native-calendar-list';
import DatepickerRange from 'react-native-range-datepicker';

import { useDispatch, useSelector } from 'react-redux'
import { BottomTab } from '../../components';

import Thumb from './Slider/Thumb';
import Rail from './Slider/Rail';
import RailSelected from './Slider/RailSelected';
import Notch from './Slider/Notch';
import Label from './Slider/Label';

import { useApi } from '../../redux/services'
import { Logut } from '../../redux/actions/authActions'
import { setRentHouseInfor } from '../../redux/actions/houseActions';

import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../components'

const markStyle = { dayTextStyle: { color: 'white', fontSize: 14, fontWeight: 'bold' }, dayBackgroundColor: '#08a' };

const HouseRentSelectConfigPage = ({ navigation }) => {
    const { user } = useSelector((store) => store.auth)
    const dispatch = useDispatch()

    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('')

    const [startcheckdate, setStartCheckDate] = useState((new Date().toDateString().toString()).replace(" ", ", ") + " 10:00 PM");
    const [endcheckdate, setEndCheckDate] = useState((new Date().toDateString().toString()).replace(" ", ", ") + " 10:00 PM");

    const onIdentifyStart = () => {
        if (!address)
            return Toast.show({ title: "Enter the Adress", placement: 'top', status: 'success', w: 300 })
        else {
            let car = {
                address: address
            };
            dispatch(setCarInfo(car))
            return navigation.navigate("VinScanScreen");
        }
    }

    const onSelectDateHouseNext = () => {
        if (!address || !startcheckdate || !endcheckdate)
            return Toast.show({ title: "Enter the All data", placement: 'top', status: 'success', w: 300 })
        else {
            let house = {
                address,
                startcheckdate,
                endcheckdate
            };
            console.log('house64=>', house)
            dispatch(setRentHouseInfor(house))
            return navigation.navigate("VecificationCarScreen");
        }
    }

    const onClose = () => {
        return navigation.navigate("CarHomeScreen");
    }

    const onSelectCheckDate = (start, end) => {
        setStartCheckDate((new Date(start).toDateString().toString()).replace(" ", ", ") + " 10:00 PM");
        setEndCheckDate((new Date(end).toDateString().toString()).replace(" ", ", ") + " 10:00 PM");
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

            <Box py={3} px={5} bg={COLOR.white}>
                <HStack justifyContent="space-between" pb={3}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="sm"
                        >
                            WHERE IS THIS PLACE LOCATED?
                        </Text>
                    </VStack>
                </HStack>

                <HStack justifyContent="flex-start" pb={3}>
                    <VStack w="full" space={1}>
                        <Input
                            w="full"
                            onChangeText={setAddress}
                            bg={COLOR.white}
                            p={2}
                            borderStyle="solid"
                            borderWidth={1}
                            borderColor={COLOR.inPlaceholder}
                            bgColor={COLOR.white}
                            color={COLOR.black}
                        />
                    </VStack>
                </HStack>

                <HStack justifyContent="space-between" pb={3}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="sm"
                        >
                            WHEN IS YOUR TRIP?
                        </Text>
                    </VStack>
                </HStack>

                <HStack pb={3}>
                    <Box>
                        <VStack w="100%" space={1} height={300} >
                            <ScrollView >
                                <DatepickerRange
                                    buttonText="Save date"
                                    closeButtonText=""
                                    chosenDateTextColor='red'
                                    showDaysHeader={false}
                                    placeHolderStart=''
                                    placeHolderUntil=''
                                    buttonColor={COLOR.IBase}
                                    showClose={false}
                                    showReset={false}
                                    onSelect={onSelectCheckDate}
                                    showButton={false}
                                    selectedBackgroundColor={COLOR.IBase}
                                    infoContainerStyle={{ marginRight: 2, paddingHorizontal: 2, paddingVertical: 5, backgroundColor: 'green', borderRadius: 2, alignSelf: 'flex-end' }}
                                // onConfirm={(startDate, untilDate) => this.setState({ startDate, untilDate })}
                                />
                            </ScrollView>
                        </VStack>

                    </Box>
                </HStack>

                <HStack pb={3} justifyContent={'center'} >
                    <Box w={'100%'}>
                        <TouchableOpacity onPress={onSelectDateHouseNext}>
                            <Box
                                style={{
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
                                    Next
                                </Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                </HStack>
            </Box>
        </Box>
    );
};
export default HouseRentSelectConfigPage;