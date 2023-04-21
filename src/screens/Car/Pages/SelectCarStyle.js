import React, { useCallback, useState, useEffect } from 'react';
import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, Menu, Pressable, useToast, Checkbox, Radio } from "native-base";
import Slider from 'rn-range-slider';
// import SwipePicker from 'react-native-swipe-picker';
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Feather, FontAwesome } from "@expo/vector-icons"

import CalendarList from 'react-native-calendar-list';

import { useDispatch, useSelector } from 'react-redux'
import { BottomTab } from '../../../components';

import Thumb from './../Slider/Thumb';
import Rail from './../Slider/Rail';
import RailSelected from './../Slider/RailSelected';
import Notch from './../Slider/Notch';
import Label from './../Slider/Label';

import { useApi } from '../../../redux/services';
import { Logut } from '../../../redux/actions/authActions';
import { setCarInfo } from '../../../redux/actions/authActions';

import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { backgroundColor } from 'styled-system';



// let PickerItem = Picker.Item;

const SelectCarStylePage = ({ navigation }) => {


    const [carstyle, setCarStyle] = useState(0);

    const { car } = useSelector((store) => store.auth)
    const dispatch = useDispatch()

    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);


    const [nextorsave, setNextOrSave] = useState('Next');




    const onFinalizeCarNext = () => {
        if (carstyle == 0)
            return Toast.show({ title: "Enter the Car Style Infor", placement: 'top', status: 'success', w: 300 })
        else {
            if (nextorsave == 'Next') {
                let newcar = {
                    address: car.address,
                    carname: car.carname,
                    barcode: car.barcode,
                    odmeter: car.odmeter,
                    transmission: car.transmission,
                    trim: car.trim,
                    style: carstyle,
                    ipsum: car.ipsum,
                    branced: car.branced,
                };
                dispatch(setCarInfo(newcar));
                return navigation.navigate("FinalizeCarPageScreen");
            }
            else {
                let newcar = {
                    address: car.address,
                    carname: car.carname,
                    barcode: car.barcode,
                    odmeter: car.odmeter,
                    transmission: car.transmission,
                    trim: car.trim,
                    style: carstyle,
                    ipsum: car.ipsum,
                    branced: car.branced,
                };
                dispatch(setCarInfo(newcar));
                return navigation.navigate("AddCarScreen");
            }
        }
    }

    const onClose = () => {
        return navigation.navigate("FinalizeCarPageScreen");
    }

    useEffect(() => {
        if (car?.address != "" && car?.barcode != undefined && car?.barcode != "" && car?.carname != "" && car?.odmeter != "" && car?.transmission != "" && car?.trim != "") {
            setNextOrSave('Confirm and Pay')
        }
        setLoading(false);
    }, [])
    return (
        <Box flex={1}>
            <Box
                pt={10}
                pb={2}
                px={3}
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
                    <VStack space={1}>
                        <TouchableOpacity onPress={onClose}>
                            <Icon color={COLOR.black} size="md" as={<AntDesign name="close" />} />
                        </TouchableOpacity>
                    </VStack>

                    <VStack space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            style={{ fontSize: 18 }}
                        >
                            Select Style
                        </Text>
                    </VStack>

                    <VStack space={1}>
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            style={{ fontSize: 14 }}
                        >
                            Done
                        </Text>
                    </VStack>
                </HStack>
            </Box>

            <Box py={4} pt={7}
                bg={COLOR.InputBlackWhiteBg} px={3}>
                <HStack justifyContent="space-between" pb={4}
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: COLOR.inpBorderColor
                    }}>
                    <VStack space={1} mt={1.5}>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            style={{ fontSize: 14 }}
                        >
                            4dr Sedan AWD (3.0L 6cyl Turbo 9A)
                        </Text>
                    </VStack>
                    <VStack space={1} >
                        <Radio.Group
                            name="myRadioGroup"
                            accessibilityLabel="favorite number" value={carstyle} onChange={nextValue => {
                                setCarStyle(nextValue)
                            }}>
                            <Radio value={1} aria-label={false} my={1} colorScheme="blue" style={{
                                borderColor: COLOR.IBase
                            }}>
                                <Text></Text>
                            </Radio>
                        </Radio.Group>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={4}>
                    <VStack space={1} mt={1.5}>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            style={{ fontSize: 14 }}
                        >
                            4dr Sedan AWD (3.0L 6cyl Turbo 9A)
                        </Text>
                    </VStack>
                    <VStack space={1} >
                        <Radio.Group
                            name="myRadioGroup"
                            accessibilityLabel="favorite number" value={carstyle} onChange={nextValue => {
                                setCarStyle(nextValue)
                            }}>
                            <Radio value={2} aria-label={false} my={1} colorScheme="blue" style={{
                                borderColor: COLOR.IBase
                            }}>
                                <Text></Text>
                            </Radio>
                        </Radio.Group>
                    </VStack>
                </HStack>
            </Box>

            <Box w="full" position="absolute" bottom={35} px={5} py={1}>
                <TouchableOpacity onPress={onFinalizeCarNext}>
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
                            {nextorsave}
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    );
};
export default SelectCarStylePage;