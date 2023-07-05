import React, { useCallback, useState, useEffect } from 'react';
import { COLOR, Images, LAYOUT, ROOT, CarStyle } from "../../../constants";
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, Menu, Pressable, useToast, Checkbox } from "native-base";
import SwipePicker from 'react-native-swipe-picker';
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Feather, FontAwesome } from "@expo/vector-icons"


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


const markStyle = { dayTextStyle: { color: 'white', fontSize: 14, fontWeight: 'bold' }, dayBackgroundColor: '#08a' };

const odmeteritems = CarStyle.odmeteritems;
const transmissionitems = CarStyle.transmissionitems;
const carstyleitems = CarStyle.carstyleitems;
const trimitems = CarStyle.trimitems;


const trimlist = CarStyle.trimlist;
const transmissionlist = CarStyle.transmissionlist;
const odmeterlist = CarStyle.odmeterlist;

// let PickerItem = Picker.Item;

const FinalizeCarPage = ({ navigation }) => {
    const { car } = useSelector((store) => store.auth)
    const dispatch = useDispatch()

    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);

    const { width } = Dimensions.get('window')
    const { height } = Dimensions.get('window')

    const [carnameedit, setCarNameEdit] = useState(true);
    const [nextorsave, setNextOrSave] = useState('Next');

    const [address, setAddress] = useState(car.address);
    const [carname, setCarName] = useState(car.carname == undefined ? "" : car.carname);
    const [carnamesave, setCarNameSave] = useState('Save');

    // const [odmeter, setOdmeter] = useState(car.odmeter == undefined ? 0 : car.odmeter);
    // const [transmission, setTransmission] = useState(car.transmission == undefined ? 0 : car.transmission);
    // const [trim, setTrim] = useState(car.trim == undefined ? 0 : car.trim);
    // const [style, setStyle] = useState(car.style == undefined ? 0 : car.style);

    const [odmeter, setOdmeter] = useState(car.odmeter == undefined ? 1 : car.odmeter);
    const [transmission, setTransmission] = useState(car.transmission == undefined ? 1 : car.transmission);
    const [trim, setTrim] = useState(car.trim == undefined ? 1 : car.trim);
    const [style, setStyle] = useState(car.style == undefined ? 1 : car.style);

    const [ipsum, setIpsum] = useState(car.ipsum == undefined ? 'Select' : car.ipsum);
    const [branced, setBranced] = useState(car.ipsum == undefined ? false : car.ipsum);

    const [showpicker, setShowPicker] = useState(false);
    const [currentselpicker, setCurrentSelPicker] = useState(0);

    const [showpickeritem, setShowPickerItem] = useState(odmeterlist);


    const onCarNameEdit = () => {
        setCarNameEdit(!carnameedit);
        if (carnamesave === 'Save')
            setCarNameSave("Edit");
        else
            setCarNameSave("Save");
    }

    const onShowmore = () => {

    }

    const onFinalizeCarNext = () => {
        if (nextorsave == 'Save') {
            switch (showpicker) {
                case 'odometer': setOdmeter(currentselpicker); break;
                case 'tranmission': setTransmission(currentselpicker); break;
                case 'trim': setTrim(currentselpicker); break;
                default: setOdmeter(currentselpicker); break;
            }
            setNextOrSave('Next');
            setShowPicker(false);
        }
        else {
            if (!address || !carname || !odmeter || !transmission || !trim || !style)
                return Toast.show({ title: "Enter the All Infor", placement: 'top', status: 'success', w: 300 })
            else {
                let newcar = {
                    address: address,
                    px: car.px,
                    py: car.py,
                    carname: carname,
                    barcode: car.barcode,
                    odmeter: odmeter,
                    transmission: transmission,
                    trim: trim,
                    style: style,
                    ipsum: ipsum,
                    branced: branced,
                };
                dispatch(setCarInfo(newcar));
                return navigation.navigate("AddCarScreen");
            }
        }
    }

    const onClose = () => {
        return navigation.navigate("CarHomeScreen");
    }

    const onSelectOdometer = () => {
        setShowPickerItem(odmeterlist);
        setShowPicker('odometer');
        setNextOrSave('Save');
    }

    const onSelectTrans = () => {
        setShowPickerItem(transmissionlist);
        setShowPicker('tranmission');
        setNextOrSave('Save');
    }

    const onSelectTrim = () => {
        setShowPickerItem(trimlist);
        setShowPicker('trim');
        setNextOrSave('Save');
    }


    const onSelSwipePicker = ({ index, item }) => {
        setCurrentSelPicker(Number(item?.value));
    }

    const onShowSelectStyle = () => {
        let newcar = {
            address: address,
            carname: carname,
            barcode: car.barcode,
            odmeter: odmeter,
            transmission: transmission,
            trim: trim,
            style: style,
            ipsum: ipsum,
            branced: branced,
        };
        dispatch(setCarInfo(newcar));
        return navigation.navigate("SelectCarStylePageScreen");
    }

    useEffect(() => {
        if (car.style != undefined)
            setStyle(car.style);
        setLoading(false);
    }, [])
    return (
        <Box flex={1}>
            <Box
                pt={5}
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
                    <TouchableOpacity onPress={onClose}>
                        <Icon color={COLOR.black} size="md" as={<AntDesign name="close" />} />
                    </TouchableOpacity>
                </HStack>
            </Box>

            <Box py={2} px={3}
                bg={COLOR.InputBlackWhiteBg}>
                <HStack justifyContent="space-between" pb={4}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            style={{ fontSize: 18 }}
                        >
                            Tell us about your car
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={3}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            WHERE IS YOUR CAR LOCATED?
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
                            borderWidth={1}
                            borderColor={COLOR.inpBorderColor}
                            bgColor={COLOR.InputBlackWhiteBg}
                            color={COLOR.black}
                            height={35}
                        />
                    </VStack>
                </HStack>

                <HStack justifyContent="space-between" pb={2}>
                    <VStack w="100%" space={1} >
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="sm"
                        >
                            WHAT CAR DO YOU HAVE?
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={2}>
                    <VStack w="87.5%" space={1} >
                        {(() => {
                            if (carnameedit) {
                                return (
                                    <Input
                                        w="80%"
                                        value={carname}
                                        onChangeText={setCarName}
                                        bg={COLOR.white}
                                        borderStyle="solid"
                                        borderWidth={1}
                                        borderColor={COLOR.inpBorderColor}
                                        bgColor={COLOR.InputBlackWhiteBg}
                                        color={COLOR.black}
                                        height={8}
                                    />
                                )
                            }
                            else {
                                return (
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="medium"
                                        fontSize="xs"
                                    >
                                        {carname}
                                    </Text>
                                )
                            }
                        })()}
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            {car.barcode}
                        </Text>
                    </VStack>
                    <VStack w="12.5%" space={1} py={2} >
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="sm"
                            textAlign="center"
                            onPress={onCarNameEdit}
                        >
                            {carnamesave}
                        </Text>
                    </VStack>
                </HStack>
                {(() => {
                    if (odmeter == 0) {
                        return (
                            <HStack justifyContent="space-between" pb={2}>
                                <VStack space={1} >
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="medium"
                                        fontSize="xs"
                                    >
                                        Odometer
                                    </Text>
                                </VStack>
                                <VStack mr={0} space={1} >
                                    <Text
                                        color={COLOR.IBase}
                                        fontWeight="medium"
                                        fontSize="sm"
                                        textAlign="center"
                                        onPress={onSelectOdometer}
                                    >
                                        {odmeteritems[odmeter]}
                                    </Text>
                                </VStack>
                            </HStack>
                        )
                    }
                    else {
                        return (
                            <HStack justifyContent="space-between" pb={2}>
                                <VStack space={1} >
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="medium"
                                        fontSize="xs"
                                    >
                                        Odometer
                                    </Text>
                                </VStack>
                                <VStack mr={0} space={1} >
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="medium"
                                        fontSize="sm"
                                        textAlign="center"
                                        onPress={onSelectOdometer}
                                    >
                                        {odmeteritems[odmeter]}
                                    </Text>
                                </VStack>
                            </HStack>
                        )
                    }
                })()}

                {(() => {
                    if (transmission == 0) {
                        return (
                            <HStack justifyContent="space-between" pb={2}>
                                <VStack mr={0} space={1} >
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="medium"
                                        fontSize="xs"
                                    >
                                        Transmission
                                    </Text>
                                </VStack>
                                <VStack mr={0} space={1} >
                                    <Text
                                        color={COLOR.IBase}
                                        fontWeight="medium"
                                        fontSize="sm"
                                        textAlign="center"
                                        onPress={onSelectTrans}
                                    >
                                        {transmissionitems[transmission]}
                                    </Text>
                                </VStack>
                            </HStack>
                        )
                    }
                    else {
                        return (
                            <HStack justifyContent="space-between" pb={2} >
                                <VStack space={1} >
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="medium"
                                        fontSize="xs"
                                    >
                                        Transmission
                                    </Text>
                                </VStack>
                                <VStack space={1} mr={0}>
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="medium"
                                        fontSize="sm"
                                        textAlign="center"
                                        onPress={onSelectTrans}
                                    >
                                        {transmissionitems[transmission]}
                                    </Text>
                                </VStack>
                            </HStack>
                        )
                    }
                })()}

                {(() => {
                    if (trim == 0) {
                        return (
                            <HStack justifyContent="space-between" pb={2}>
                                <VStack space={1} >
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="medium"
                                        fontSize="xs"
                                    >
                                        Trim (Optional)
                                    </Text>
                                </VStack>
                                <VStack mr={0} space={1} >
                                    <Text
                                        color={COLOR.IBase}
                                        fontWeight="medium"
                                        fontSize="sm"
                                        textAlign="center"
                                        onPress={onSelectTrim}
                                    >
                                        {trimitems[trim]}
                                    </Text>
                                </VStack>
                            </HStack>
                        )
                    }
                    else {
                        return (
                            <HStack justifyContent="space-between" pb={2}>
                                <VStack mr={0} space={1} >
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="medium"
                                        fontSize="xs"
                                    >
                                        Trim (Optional)
                                    </Text>
                                </VStack>
                                <VStack mr={0} space={1} >
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="medium"
                                        fontSize="sm"
                                        textAlign="center"
                                        onPress={onSelectTrim}
                                    >
                                        {trimitems[trim]}
                                    </Text>
                                </VStack>
                            </HStack>
                        )
                    }
                })()}

                {(() => {
                    if (style == 0) {
                        return (
                            <HStack justifyContent="space-between" pb={2}>
                                <VStack space={1} >
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="medium"
                                        fontSize="xs"
                                    >
                                        Style (Optional)
                                    </Text>
                                </VStack>
                                <VStack space={1} >
                                    <Text
                                        color={COLOR.IBase}
                                        fontWeight="medium"
                                        fontSize="sm"
                                        textAlign="center"
                                        onPress={onShowSelectStyle}
                                    >
                                        {carstyleitems[style]}
                                    </Text>
                                </VStack>
                            </HStack>
                        )
                    }
                    else {
                        return (
                            <HStack justifyContent="space-between" pb={2}>
                                <VStack space={1} >
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="medium"
                                        fontSize="xs"
                                    >
                                        Style (Optional)
                                    </Text>
                                </VStack>
                                <VStack space={1} >
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="medium"
                                        fontSize={12}
                                        textAlign="center"
                                        onPress={onShowSelectStyle}
                                    >
                                        {carstyleitems[style]}
                                    </Text>
                                </VStack>
                            </HStack>
                        )
                    }
                })()}
                <HStack justifyContent="space-between" pb={3}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            HAVE YOU PAID SALES TAX ON THIS VEHICLE?
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={3}>
                    <VStack w="87%" space={1} >
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec ipsum ac quam auctor dapibus.
                        </Text>
                    </VStack>
                    <VStack w="13%" space={1} >
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="sm"
                            textAlign="center"
                            onPress={() => { if (ipsum === 'Select') setIpsum('unSelect'); else setIpsum('Select'); }}
                        >
                            {ipsum}
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={3}>
                    <VStack w="90%" space={1} >
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            My car has never had a branched or salvage title.
                        </Text>
                    </VStack>
                    <VStack w="10%" space={1} >
                        <Checkbox
                            style={{
                                color: COLOR.IBase
                            }}
                            onChange={setBranced}
                            accessible={true}
                            accessibilityLabel="Tap me!" />
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={3}>
                    <VStack space={1} >
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="xs"
                            textAlign="center"
                            onPress={onShowmore}
                        >
                            Learn more
                        </Text>
                    </VStack>
                </HStack>
                {(() => {
                    if (showpicker) {
                        return (
                            <HStack justifyContent="space-between"
                                bottom={-10}
                                style={{
                                    position: 'absolute',
                                    zIndex: 1,
                                    backgroundColor: COLOR.white,
                                }} >
                                <SwipePicker
                                    items={showpickeritem}
                                    onChange={onSelSwipePicker}
                                    height={200}
                                    width={width}
                                />
                            </HStack>
                        )
                    }
                })()}
            </Box>

            <Box position="absolute" bottom={30} w="full" px={5}>
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
export default FinalizeCarPage;