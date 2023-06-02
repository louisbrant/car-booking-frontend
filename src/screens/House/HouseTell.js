import React, { useCallback, useState, useEffect } from 'react';
import { COLOR, Images, LAYOUT, ROOT, CarStyle } from "../../constants";
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, Menu, Pressable, useToast, Checkbox } from "native-base";
import SwipePicker from 'react-native-swipe-picker';
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Feather, FontAwesome } from "@expo/vector-icons"
import MapView from "react-native-maps";


import { useDispatch, useSelector } from 'react-redux'


import { useApi } from '../../redux/services';
import { Logut } from '../../redux/actions/authActions';
import { setCarInfo } from '../../redux/actions/authActions';



const markStyle = { dayTextStyle: { color: 'white', fontSize: 14, fontWeight: 'bold' }, dayBackgroundColor: '#08a' };

const odmeteritems = CarStyle.odmeteritems;
const transmissionitems = CarStyle.transmissionitems;
const carstyleitems = CarStyle.carstyleitems;
const trimitems = CarStyle.trimitems;


const trimlist = CarStyle.trimlist;
const transmissionlist = CarStyle.transmissionlist;
const odmeterlist = CarStyle.odmeterlist;

// let PickerItem = Picker.Item;

const HouseTellPage = ({ navigation }) => {
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
    const [position, setPosition] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    const onCarNameEdit = () => {
        setCarNameEdit(!carnameedit);
        if (carnamesave === 'Save')
            setCarNameSave("Edit");
        else
            setCarNameSave("Save");
    }

    const onShowmore = () => {

    }

    const onTellHouseNext = () => {
        navigation.navigate("HouseImageAddScreen");
        // if (nextorsave == 'Save') {
        //     switch (showpicker) {
        //         case 'odometer': setOdmeter(currentselpicker); break;
        //         case 'tranmission': setTransmission(currentselpicker); break;
        //         case 'trim': setTrim(currentselpicker); break;
        //         default: setOdmeter(currentselpicker); break;
        //     }
        //     setNextOrSave('Next');
        //     setShowPicker(false);
        // }
        // else {
        //     if (!address || !carname || !odmeter || !transmission || !trim || !style)
        //         return Toast.show({ title: "Enter the All Infor", placement: 'top', status: 'success', w: 300 })
        //     else {
        //         let newcar = {
        //             address: address,
        //             carname: carname,
        //             barcode: car.barcode,
        //             odmeter: odmeter,
        //             transmission: transmission,
        //             trim: trim,
        //             style: style,
        //             ipsum: ipsum,
        //             branced: branced,
        //         };
        //         dispatch(setCarInfo(newcar));
        //         return navigation.navigate("AddCarScreen");
        //     }
        // }
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
            px: position.latitude,
            py: position.longitude,
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

    const changePosition = (mappos) => {
        setPosition({
            latitude: mappos?.latitude,
            longitude: mappos?.longitude,
            latitudeDelta: mappos?.latitudeDelta,
            longitudeDelta: mappos?.longitudeDelta
        })

        let request = new XMLHttpRequest();
        let method = 'GET';
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + mappos?.latitude + ',' + mappos?.longitude + '&key=' + ROOT.mapApiKey;
        let async = true;
        request.open(method, url, async);
        request.onreadystatechange = function (datas) {
            if (request.readyState == 4 && request.status == 200) {
                let data = JSON.parse(request.responseText);
                let address = data.results[0];
                setAddress(address?.formatted_address);
            }
        };
        request.send();
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
                        <Icon color={COLOR.black} size="md" as={<AntDesign name="close" />} />
                    </TouchableOpacity>
                </HStack>
            </Box>

            <Box py={2} px={5}
                bg={COLOR.InputBlackWhiteBg}>
                <HStack justifyContent="space-between" pb={4}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            style={{ fontSize: 18 }}
                        >
                            Tell us about your House
                        </Text>
                    </VStack>
                </HStack>
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
                            isDisabled={true}
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
                    <VStack space={1} >
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="sm"
                        >
                            WHAT CAR DO YOU HAVE?
                        </Text>
                    </VStack>
                    <VStack mr={0} space={1} >
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="sm"
                        >
                            + Add more
                        </Text>
                    </VStack>
                </HStack>

                <HStack justifyContent="space-between" pb={2}>

                    <VStack>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            fontSize="sm"
                            textAlign="center"
                        >
                            {LAYOUT.BayIcon}
                            <Text color={COLOR.black} mt={5} fontWeight="semibold" fontSize="sm">
                                &nbsp;&nbsp;Bay view
                            </Text>
                        </Text>
                    </VStack>
                    <VStack mr={0} pt={1} space={1} >
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="sm"
                        >
                            Edit
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={2}>
                    <VStack>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            fontSize="sm"
                            textAlign="center"
                        >
                            {LAYOUT.CityIcon}
                            <Text color={COLOR.black} mt={5} fontWeight="semibold" fontSize="sm">
                                &nbsp;&nbsp;City view
                            </Text>
                        </Text>
                    </VStack>
                    <VStack mr={0} pt={1} space={1} >
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="sm"
                        >
                            Edit
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={2}>
                    <VStack>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            fontSize="sm"
                            textAlign="center"
                        >
                            {LAYOUT.BeachIcon}
                            <Text color={COLOR.black} mt={5} fontWeight="semibold" fontSize="sm">
                                &nbsp;&nbsp;Beach view
                            </Text>
                        </Text>
                    </VStack>
                    <VStack mr={0} pt={1} space={1} >
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="sm"
                        >
                            Edit
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={2}>
                    <VStack>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            fontSize="sm"
                            textAlign="center"
                        >
                            {LAYOUT.CutleryIcon}
                            <Text color={COLOR.black} mt={5} fontWeight="semibold" fontSize="sm">
                                &nbsp;&nbsp;Kitchen
                            </Text>
                        </Text>
                    </VStack>
                    <VStack mr={0} pt={1} space={1} >
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="sm"
                        >
                            Edit
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={2}>
                    <VStack>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            fontSize="sm"
                            textAlign="center"
                        >
                            {LAYOUT.FreeWifiIcon}
                            <Text color={COLOR.black} mt={5} fontWeight="semibold" fontSize="sm">
                                &nbsp;&nbsp;Free Wifi
                            </Text>
                        </Text>
                    </VStack>
                    <VStack mr={0} pt={1} space={1} >
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="sm"
                        >
                            Edit
                        </Text>
                    </VStack>
                </HStack>

            </Box>
            <Box mt={1} ml={5}>
                <Stack >
                    {/* <Image source={Images.Map} h="185" resizeMode="cover" alt="image" /> */}
                    <MapView
                        style={{ width: width - 40, height: 180 }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                        onRegionChangeComplete={changePosition}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: position.latitude,
                                longitude: position.longitude,
                            }}
                            centerOffset={{ x: -18, y: -60 }}
                            anchor={{ x: 0.69, y: 1 }}
                        />
                    </MapView>

                </Stack>
            </Box>
            <Box position="absolute" bottom={2} w="full" px={5}>
                <TouchableOpacity onPress={onTellHouseNext}>
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
export default HouseTellPage;