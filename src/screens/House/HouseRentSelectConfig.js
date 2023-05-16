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

const radius = { dayTextStyle: { borderWidth: 1, borderColor: COLOR.IBasePlaceholder } };

const HouseRentSelectConfigPage = ({ navigation }) => {
    const { renthouse } = useSelector((store) => store.renthouse)
    const dispatch = useDispatch()

    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState(renthouse?.address)
    const startcheckdateval = (new Date(renthouse?.startcheckdate)).toString('mm dd yyyy').split(" ");
    const endcheckdateval = (new Date(renthouse?.endcheckdate)).toString('mm dd yyyy').split(" ");
    const [startcheckdate, setStartCheckDate] = useState(startcheckdateval[1] + " " + startcheckdateval[2] + " " + startcheckdateval[3]);
    const [endcheckdate, setEndCheckDate] = useState(endcheckdateval[1] + " " + endcheckdateval[2] + " " + endcheckdateval[3]);
    const [rentDate, setRentDate] = useState(startcheckdate + " - " + endcheckdate);
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

    const onSelectConfirmHouseNext = () => {
        if (!address || !rentDate)
            return Toast.show({ title: "Enter the All data", placement: 'top', status: 'success', w: 300 })
        else {
            let house = {
                address: renthouse?.address,
                startcheckdate: renthouse?.startcheckdate,
                endcheckdate: renthouse?.endcheckdate
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
        console.log('renthouse=>', renthouse);
        console.log('address=>', address);
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
                pt={5}
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
                            value={address}
                            onChangeText={setAddress}
                            bg={COLOR.white}
                            p={2}
                            borderStyle="solid"
                            fontSize={'sm'}
                            borderWidth={1}
                            borderColor={COLOR.inPlaceholder}
                            bgColor={COLOR.white}
                            color={COLOR.black}
                            height={'40px'}
                        // isDisabled={true}
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

                <HStack justifyContent="flex-start" pb={3}>
                    <VStack w="full" space={1}>
                        <Input
                            w="full"
                            value={rentDate}
                            onChangeText={setRentDate}
                            bg={COLOR.white}
                            fontSize={'sm'}
                            p={2}
                            borderStyle="solid"
                            borderWidth={1}
                            borderColor={COLOR.inPlaceholder}
                            bgColor={COLOR.white}
                            color={COLOR.black}
                            height={'40px'}
                        // isDisabled={true}
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
                            WHO IS COMING?
                        </Text>
                    </VStack>
                </HStack>

                <Box w="full" >
                    <VStack space={3}>
                        <VStack space={3}
                            borderColor={COLOR.inpBorderColor}
                            borderWidth={1}
                            borderRadius={5}
                        >
                            <Box
                                p={3}
                                pb={0}
                            >
                                <HStack
                                    style={{
                                        borderStyle: 'solid',
                                        borderBottomWidth: 1,
                                        borderColor: COLOR.inpBorderColor,
                                    }}
                                    justifyContent="space-between"
                                    alignItems="center"
                                    pb={2}
                                >
                                    <VStack
                                        flex={1}
                                        space={1}
                                    >
                                        <HStack justifyContent="space-between" alignItems="center">
                                            <Text fontWeight="semibold" color={COLOR.black} fontSize="sm" >Adults</Text>
                                        </HStack>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="xs">Ages 13 or above</Text>
                                    </VStack>
                                    <HStack
                                        py={3}
                                    >
                                        <VStack >
                                            <AntDesign name="minuscircleo" size={20} color={COLOR.inPlaceholder} />
                                        </VStack>

                                        <VStack px={2} >
                                            <Text fontWeight="semibold" fontSize={16} >0</Text>
                                        </VStack>

                                        <VStack >
                                            <AntDesign name="pluscircleo" size={20} color={COLOR.inPlaceholder} />
                                        </VStack>
                                    </HStack>
                                </HStack>
                            </Box>
                            <Box
                                p={3}
                                pb={0}
                                pt={0}
                            >
                                <HStack
                                    style={{
                                        borderStyle: 'solid',
                                        borderBottomWidth: 1,
                                        borderColor: COLOR.inpBorderColor,
                                    }}
                                    justifyContent="space-between"
                                    alignItems="center"
                                    pb={2}
                                >
                                    <VStack
                                        flex={1}
                                        space={1}
                                    >
                                        <HStack justifyContent="space-between" alignItems="center">
                                            <Text fontWeight="semibold" color={COLOR.black} fontSize="sm" >Children</Text>
                                        </HStack>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="xs">Ages 2 - 12</Text>
                                    </VStack>
                                    <HStack
                                        py={3}
                                    >
                                        <VStack >
                                            <AntDesign name="minuscircleo" size={20} color={COLOR.inPlaceholder} />
                                        </VStack>

                                        <VStack px={2} >
                                            <Text fontWeight="semibold" fontSize={16} >0</Text>
                                        </VStack>

                                        <VStack >
                                            <AntDesign name="pluscircleo" size={20} color={COLOR.inPlaceholder} />
                                        </VStack>
                                    </HStack>
                                </HStack>
                            </Box>
                            <Box
                                p={3}
                                pb={0}
                                pt={0}
                            >
                                <HStack
                                    style={{
                                        borderStyle: 'solid',
                                        borderBottomWidth: 1,
                                        borderColor: COLOR.inpBorderColor,
                                    }}
                                    justifyContent="space-between"
                                    alignItems="center"
                                    pb={2}
                                >
                                    <VStack
                                        flex={1}
                                        space={1}
                                    >
                                        <HStack justifyContent="space-between" alignItems="center">
                                            <Text fontWeight="semibold" color={COLOR.black} fontSize="sm" >Infants</Text>
                                        </HStack>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="xs">Under 2</Text>
                                    </VStack>
                                    <HStack
                                        py={3}
                                    >
                                        <VStack >
                                            <AntDesign name="minuscircleo" size={20} color={COLOR.inPlaceholder} />
                                        </VStack>

                                        <VStack px={2} >
                                            <Text fontWeight="semibold" fontSize={16} >0</Text>
                                        </VStack>

                                        <VStack >
                                            <AntDesign name="pluscircleo" size={20} color={COLOR.inPlaceholder} />
                                        </VStack>
                                    </HStack>
                                </HStack>
                            </Box>
                            <Box
                                p={3}
                                pb={0}
                                pt={0}
                            >
                                <HStack
                                    justifyContent="space-between"
                                    alignItems="center"
                                    pb={2}
                                >
                                    <VStack
                                        flex={1}
                                        space={1}
                                    >
                                        <HStack justifyContent="space-between" alignItems="center">
                                            <Text fontWeight="semibold" color={COLOR.black} fontSize="sm" >Pets</Text>
                                        </HStack>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="xs">Bringing a service animal?</Text>
                                    </VStack>
                                    <HStack
                                        py={3}
                                    >
                                        <VStack >
                                            <AntDesign name="minuscircleo" size={20} color={COLOR.inPlaceholder} />
                                        </VStack>

                                        <VStack px={2} >
                                            <Text fontWeight="semibold" fontSize={16} >0</Text>
                                        </VStack>

                                        <VStack >
                                            <AntDesign name="pluscircleo" size={20} color={COLOR.inPlaceholder} />
                                        </VStack>
                                    </HStack>
                                </HStack>
                            </Box>
                        </VStack>
                    </VStack>
                </Box>

                <HStack pb={3} justifyContent={'center'} >
                    <Box w={'100%'}>
                        <TouchableOpacity onPress={onSelectConfirmHouseNext}>
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
        </Box >
    );
};
export default HouseRentSelectConfigPage;