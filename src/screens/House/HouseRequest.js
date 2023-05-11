import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated, SafeAreaView, StyleSheet } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, Select, Modal, useToast } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, Feather } from "@expo/vector-icons"
import { useDispatch, useSelector } from 'react-redux';

import MapView from "react-native-maps";

import { Notification } from "react-native-in-app-message";


import DatepickerRange from 'react-native-range-datepicker';

import { TabView, SceneMap } from 'react-native-tab-view';

// import SwipePicker from 'react-native-swipe-picker';

import { COLOR, Images, LAYOUT, ROOT } from "../../constants";

import { setBookInfo } from '../../redux/actions/authActions';

const HouseRequestPage = ({ navigation }) => {

    const { house } = useSelector((store) => store.house);
    console.log('car=>', house)
    const dispatch = useDispatch();
    const Toast = useToast();


    let currentyear = new Date().getFullYear();
    let currentdate = new Date().getDate();
    let currentday = new Date().getDay() - 1;
    let currentMon = new Date().getMonth(); - 1
    let mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const { width } = Dimensions.get('window')


    const [currenttime, setCurrentTime] = useState((new Date().toDateString().toString()).replace(" ", ", ") + " 10:00 PM");
    const [modalVisible, setModalVisible] = useState(false);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [showpicker, setShowPicker] = useState(false);

    const [startcheckdate, setStartCheckDate] = useState((new Date().toDateString().toString()).replace(" ", ", ") + " 10:00 PM");
    const [endcheckdate, setEndCheckDate] = useState((new Date().toDateString().toString()).replace(" ", ", ") + " 10:00 PM");



    const [showdays, setShowDays] = useState([]);
    const [hours, setHours] = useState([]);
    const [mins, setMins] = useState([]);

    const [position, setPosition] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });
    const [mapaddress, setMapAddress] = useState("");
    const [currentseldate, setCurrentSelDate] = useState("in");


    const ms = [
        {
            value: 1,
            label: 'AM'
        },
        {
            value: 2,
            label: 'PM'
        }
    ];



    const onPayRequest = async () => {
        navigation.navigate("RequestConfirmScreen");
    }

    const onSelectCheckDate = (start, end) => {
        setStartCheckDate((new Date(start).toDateString().toString()).replace(" ", ", ") + " 10:00 PM");
        setEndCheckDate((new Date(end).toDateString().toString()).replace(" ", ", ") + " 10:00 PM");
    }

    const onCheckInOutCancel = () => {
        setModalVisible(false);
    }

    const showCheckPicker = (type) => {
        setModalVisible(false);
        setShowPicker(true);
        setCurrentSelDate(type);;
    }

    const onSelSwipePicker = ({ index, item }, type) => {
        if (currentseldate == "in") {
            let checkdate = startcheckdate;
            switch (type) {
                case 'date': checkdate = checkdate.replace(checkdate.split(" ")[0] + " " + checkdate.split(" ")[1] + " " + checkdate.split(" ")[2], index.item.label); break;
                case 'hour': checkdate = checkdate.replace(checkdate.split(" ")[4].split(":")[0] + ":", index.item.label + ":"); break;
                case 'min': checkdate = checkdate.replace(":" + checkdate.split(" ")[4].split(":")[1], ":" + index.item.label); break;
                case 'ms': checkdate = checkdate.replace(checkdate.split(" ")[5], index.item.label); break;
            }
            setStartCheckDate(checkdate);
        }
        else {
            let checkdate = endcheckdate;
            switch (type) {
                case 'date': checkdate = checkdate.replace(checkdate.split(" ")[0] + " " + checkdate.split(" ")[1] + " " + checkdate.split(" ")[2], index.item.label); break;
                case 'hour': checkdate = checkdate.replace(checkdate.split(" ")[4].split(":")[0] + ":", index.item.label + ":"); break;
                case 'min': checkdate = checkdate.replace(":" + checkdate.split(" ")[4].split(":")[1], ":" + index.item.label); break;
                case 'ms': checkdate = checkdate.replace(checkdate.split(" ")[5], index.item.label); break;
            }
            setEndCheckDate(checkdate);
        }

    }

    const onCheckInOutSave = () => {
        setShowPicker(false);
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
                setMapAddress(address?.formatted_address);
            }
        };
        request.send();
    }

    const requestBook = () => {
        console.log(new Date(endcheckdate).valueOf(), "-", new Date(startcheckdate).valueOf(), "DDDDDD", endcheckdate, "AND", startcheckdate)
        if ((new Date(endcheckdate).valueOf() - new Date(startcheckdate).valueOf()) <= 0)
            return Toast.show({ title: "Please select correctly date.", placement: 'bottom', status: 'error', w: 300 });
        else {
            let bookinfor = {
                mapaddress: mapaddress,
                startcheckdate: startcheckdate,
                endcheckdate: endcheckdate,
            }
            console.log(bookinfor);
            dispatch(setBookInfo(bookinfor));
            navigation.navigate("RequestDetailScreen");
        }
    }

    // Notification.show();

    useEffect(() => {
        let dates = [], newmins = [], newhours = [];
        for (let i = 0; i < 40; i++) {
            currentday++;
            if (currentday == 7)
                currentday = 0;
            currentdate++;
            if ((currentMon == 0 || currentMon == 2 || currentMon == 4 || currentMon == 6 || currentMon == 7 || currentMon == 9 || currentMon == 11) && currentdate == 32) {
                currentMon++;
                currentdate = 1;
            }
            if ((currentMon == 3 || currentMon == 5 || currentMon == 8 || currentMon == 10) && currentdate == 31) {
                currentMon++;
                currentdate = 1;
            }
            if (currentyear % 4 == 3) {
                if ((currentMon == 1) && currentdate == 29) {
                    currentMon++;
                    currentdate = 1;
                }
            }
            else {
                if ((currentMon == 1) && currentdate == 30) {
                    currentMon++;
                    currentdate = 1;
                }
            }
            if (currentMon == 12) {
                currentyear++;
            }
            let currentdayval = day[currentday] + ", " + mon[currentMon] + " " + currentdate;
            dates.push({
                value: i,
                label: currentdayval
            });
        }
        setShowDays(dates);
        for (let i = 0; i < 60; i++) {
            let newminitem = {
                value: 0,
                label: 0
            }
            if (i < 10)
                newminitem = {
                    value: i,
                    label: 0 + "" + i
                }
            else
                newminitem = {
                    value: i,
                    label: i.toString()
                }
            newmins.push(newminitem);
        }
        setMins(newmins);

        for (let i = 0; i < 13; i++) {
            let newhouritem = {
                value: 0,
                label: 0
            }
            if (i < 10)
                newhouritem = {
                    value: i,
                    label: 0 + "" + i
                }
            else
                newhouritem = {
                    value: i,
                    label: i.toString()
                }
            newhours.push(newhouritem);
        }
        setHours(newhours);
    }, [])
    return (
        <Box flex={1}>

            {(() => {
                if (showpicker) {
                    return (
                        <HStack position="absolute" style={{
                            zIndex: 1,
                            backgroundColor: COLOR.white,
                        }} justifyContent="space-between" bottom={0}
                        >
                            <HStack justifyContent="space-between" mb={6}
                            >
                                {/* <SwipePicker
                                    items={showdays}
                                    onChange={(index, item) => onSelSwipePicker({ index, item }, "date")}
                                    initialSelectedIndex={0}
                                    height={300}
                                    width={width * 2 / 5}
                                />

                                <SwipePicker
                                    items={hours}
                                    onChange={(index, item) => onSelSwipePicker({ index, item }, "hour")}
                                    height={300}
                                    width={width / 5}
                                />

                                <SwipePicker
                                    items={mins}
                                    onChange={(index, item) => onSelSwipePicker({ index, item }, "min")}
                                    height={300}
                                    width={width / 5}
                                />

                                <SwipePicker
                                    items={ms}
                                    onChange={(index, item) => onSelSwipePicker({ index, item }, "ms")}
                                    height={300}
                                    width={width / 5}
                                /> */}
                            </HStack>
                            <HStack bottom={3} position="absolute" >
                                <Box px={3}>
                                    <TouchableOpacity onPress={onCheckInOutSave} >
                                        <Box
                                            style={{
                                                width: width - 23,
                                                height: 45,
                                                backgroundColor: COLOR.IBase,
                                                borderRadius: 5,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text
                                                color={COLOR.white}
                                                fontWeight="bold"
                                                fontSize="md"
                                            >
                                                Save date
                                            </Text>
                                        </Box>
                                    </TouchableOpacity>
                                </Box>
                            </HStack>
                        </HStack>
                    )
                }
            })()}

            <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false} style={{ backgroundColor: COLOR.InputBlackWhiteBg }}>
                <Box>
                    <Image source={{ uri: house?.img }} h="250" resizeMode="cover" alt="image" />

                    <Center position="absolute" w="full">

                        <Stack pt={10} direction="row" alignItems="center">
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={requestBook}>
                                    <Text
                                        color={COLOR.white}
                                        fontWeight="semibold"
                                        fontSize="md"
                                    >Request to Book</Text>
                                </TouchableOpacity>
                            </View>
                        </Stack>

                    </Center>

                </Box>

                <Box w="full" px={5} py={3} pb={10}>
                    <Box
                        p={3}
                        style={{
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderColor: COLOR.inpBorderColor,
                            borderRadius: 5,
                        }}
                    >
                        <HStack alignItems="center" justifyContent="space-between" >
                            <TouchableOpacity onPress={() => showCheckPicker('in')}>
                                <VStack space={1} >
                                    <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">Check-in</Text>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                                        {startcheckdate}
                                    </Text>
                                </VStack>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setShowPicker(false); setModalVisible(true); }}>
                                <Icon color={COLOR.inIconColor} size="xs" as={<AntDesign name="right" />} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => showCheckPicker('out')}>
                                <VStack space={1} >
                                    <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">Checkout</Text>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                                        {endcheckdate}
                                    </Text>
                                </VStack>
                            </TouchableOpacity>
                        </HStack>
                    </Box>

                    <VStack my={2} space={2}>
                        <HStack alignItems="center" space={2} >
                            <Icon color={COLOR.black} size="sm" as={<Ionicons name="ios-location-sharp" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Get Directions</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.black} size="sm" as={<Ionicons name="call" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Call Host</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.black} size="sm" as={<Ionicons name="chatbubble-ellipses" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Message Host</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.black} size="sm" as={<Ionicons name="document-text" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Show Listings</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                    </VStack>

                    <Box mt={3}>
                        <Text fontWeight="bold" fontSize="xs">Reservation details</Text>

                        <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <VStack space={1}>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Who's coming</Text>
                                    <Text fontWeight="semibold" fontSize="xs">1 guest</Text>
                                </VStack>
                                <Image source={Images.Profile5} w={35} h={35} rounded="full" resizeMode="cover" alt="image" />
                            </HStack>
                        </Box>

                        <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <VStack space={1}>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Confirmation code</Text>
                                    <Text fontWeight="semibold" fontSize="xs">{house?.barcode}</Text>
                                </VStack>
                            </HStack>
                        </Box>

                        <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <VStack space={1}>
                                    <HStack>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Your booking is protected by </Text>
                                        <Text color={COLOR.black} fontWeight="bold" fontSize="2xs">Izra</Text>
                                    </HStack>
                                    <Text fontWeight="semibold" fontSize="xs" underline>Learn more</Text>
                                </VStack>
                            </HStack>
                        </Box>

                        <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <VStack space={1}>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Cancellation Policy</Text>
                                    <Text fontWeight="semibold" fontSize="xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum aliquet tincidunt. Morbi sed molestie orci.</Text>
                                    <Text color={COLOR.IBase} fontWeight="semibold" fontSize="xs" underline>Read more</Text>
                                </VStack>
                            </HStack>
                        </Box>

                    </Box>

                    <VStack my={2} space={2}>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.black} size="sm" as={<Ionicons name="document-text" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Get a PDF for visa purpose</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.black} size="sm" as={<Ionicons name="wallet" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Add to wallet</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.black} size="sm" as={<Entypo name="text-document-inverted" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Get receipt</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                    </VStack>

                    <Box mt={3}>
                        <Text fontWeight="bold" fontSize="xs">Getting there</Text>
                        <Stack mt={5}>
                            {/* <Image source={Images.Map} h="185" resizeMode="cover" alt="image" /> */}
                            <MapView
                                style={{ width: width - 40, height: 200 }}
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


                    <Box mt={3}>
                        <VStack>
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <VStack space={1}>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Address</Text>
                                        <Text fontWeight="semibold" fontSize="xs">{mapaddress}</Text>
                                    </VStack>
                                </HStack>
                            </Box>

                            <VStack my={2} space={2}>
                                <HStack alignItems="center" space={2}>
                                    <Icon color={COLOR.black} size="sm" as={<Ionicons name="copy" />} />
                                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between">
                                            <Text fontWeight="medium" fontSize="sm">Copy address</Text>
                                            <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                                <HStack alignItems="center" space={2}>
                                    <Icon color={COLOR.black} size="sm" as={<Ionicons name="ios-location-sharp" />} />
                                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between">
                                            <Text fontWeight="medium" fontSize="sm">Get directions</Text>
                                            <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                            </VStack>

                            <Box mt={5}>
                                <Text fontWeight="medium" fontSize="sm">What this place offers</Text>
                            </Box>
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

                            <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                                <Box w="full" >
                                    <VStack space={2}>
                                        <HStack space={2} style={{ alignItems: 'center' }}>
                                            <FontAwesome name="star" size={14} color={COLOR.yellow} />
                                            <HStack space={1}>
                                                <Text
                                                    color={COLOR.black}
                                                    fontWeight="semibold"
                                                    fontSize="xs"
                                                >{`5`}</Text>
                                                <Text
                                                    color={COLOR.inPlaceholder}
                                                    fontWeight="semibold"
                                                    fontSize="xs"
                                                >(24.2k)</Text>
                                            </HStack>
                                        </HStack>
                                        <ScrollView
                                            horizontal={true}
                                            style={{
                                                flex: 1
                                            }}>
                                            <HStack justifyContent="space-between">
                                                <Box
                                                    w={300}
                                                    pr={4}
                                                >
                                                    <VStack space={2}
                                                        p={3}
                                                        style={{
                                                            backgroundColor: COLOR.smBoxColor,
                                                            borderStyle: 'solid',
                                                            borderWidth: 1,
                                                            borderColor: COLOR.smBoxBoderColor,
                                                            borderRadius: 10,
                                                        }}>
                                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
                                                            <HStack space={2}>
                                                                <Avatar bg="white" alignSelf="center" size={"36"} source={Images.Profile1} />
                                                                <VStack space={1}>
                                                                    <Text fontWeight="semibold" fontSize="xs">Name here</Text>
                                                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Response Time: 1 hour</Text>
                                                                </VStack>
                                                            </HStack>
                                                        </View>
                                                        <HStack alignItems="center" justifyContent="space-between">
                                                            <VStack space={1}>
                                                                <Text fontWeight="semibold" fontSize="xs">Lorem ipsum dolor sit amet, con sectetur adipiscing elit. Vestibulum pellentesque justo eget justo sagittis, eu accumsan quam consectetur. Morbi sed quam varius.</Text>
                                                            </VStack>
                                                        </HStack>
                                                    </VStack>
                                                </Box>
                                                <Box
                                                    style={{
                                                        backgroundColor: COLOR.smBoxColor,
                                                        borderStyle: 'solid',
                                                        borderWidth: 1,
                                                        borderColor: COLOR.smBoxBoderColor,
                                                        borderRadius: 10,
                                                    }}
                                                    p={3}
                                                    w={300}
                                                >
                                                    <VStack space={2}>
                                                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} >
                                                            <HStack space={2}>
                                                                <Avatar bg="white" alignSelf="center" size={"36"} source={Images.Profile1} />
                                                                <VStack space={1}>
                                                                    <Text fontWeight="semibold" fontSize="xs">Name here</Text>
                                                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Response Time: 1 hour</Text>
                                                                </VStack>
                                                            </HStack>
                                                        </View>
                                                        <HStack alignItems="center" justifyContent="space-between">
                                                            <VStack space={1}>
                                                                <Text fontWeight="semibold" fontSize="xs">Lorem ipsum dolor sit amet, con sectetur adipiscing elit. Vestibulum pellentesque justo eget justo sagittis, eu accumsan quam consectetur. Morbi sed quam varius.</Text>
                                                            </VStack>
                                                        </HStack>
                                                    </VStack>
                                                </Box>
                                            </HStack>
                                        </ScrollView>
                                    </VStack>
                                </Box>
                            </ScrollView>

                            <HStack justifyContent="space-between" pt={3}>
                                <VStack borderColor={COLOR.black} borderWidth={1} borderRadius={5} w="full">
                                    <VStack p={1} space={1} >
                                        <Text
                                            color={COLOR.black}
                                            fontWeight="medium"
                                            fontSize='18px'
                                            textAlign="center"
                                        >
                                            Show all 39 reviews
                                        </Text>
                                    </VStack>
                                </VStack>
                            </HStack>
                            <HStack justifyContent="space-between" pt={3}>
                                <Box >
                                    <VStack>

                                        <Text fontWeight="semibold" fontSize="sm" color={COLOR.black}>$450/night</Text>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="xs" pt={1}>Sat, 11 - Mon, 13</Text>
                                    </VStack>
                                </Box>
                                <Box >
                                    <TouchableOpacity >
                                        <Box
                                            style={{
                                                height: 39,
                                                backgroundColor: COLOR.IBase,
                                                borderRadius: 8,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            py={3}
                                            px={4}
                                        >
                                            <Text
                                                color={COLOR.white}
                                                fontWeight="bold"
                                                fontSize="17px"
                                            >
                                                Reserve
                                            </Text>
                                        </Box>
                                    </TouchableOpacity>
                                </Box>
                            </HStack>
                        </VStack>
                    </Box>
                </Box>

                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef} _backdrop={true} backdropOpacity={0.5} backgroundColor={COLOR.ModalBgcolor} >
                    <Modal.Content style={{
                        marginTop: "auto",
                        width: "100%",
                        heigh: "100%",
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    }}>
                        <Modal.Body>
                            <HStack justifyContent="space-between" pb={1} height={390}>
                                <ScrollView >
                                    <DatepickerRange
                                        buttonText="Save date"
                                        closeButtonText=""
                                        chosenDateTextColor='red'
                                        showDaysHeader={false}
                                        placeHolderStart=''
                                        placeHolderUntil=''
                                        buttonColor={COLOR.IBase
                                        }
                                        onSelect={onSelectCheckDate}
                                        showButton={false}
                                        selectedBackgroundColor={COLOR.IBase}
                                        infoContainerStyle={{ marginRight: 2, paddingHorizontal: 2, paddingVertical: 5, backgroundColor: 'green', borderRadius: 2, alignSelf: 'flex-end' }}
                                    // onConfirm={(startDate, untilDate) => this.setState({ startDate, untilDate })}
                                    />
                                </ScrollView>
                            </HStack>
                            <Box >
                                <TouchableOpacity onPress={onCheckInOutCancel}>
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
                                            Save date
                                        </Text>
                                    </Box>
                                </TouchableOpacity>
                            </Box>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </ScrollView>
            <Notification duration={1000} text={'Hello world'} style=
                {{
                    marginTop: 30,
                    borderRadius: 10,
                    borderLeftWidth: 5,
                    borderLeftColor: COLOR.IBase
                }} onPress={Notification.hide} />
        </Box >
    )
}

export default HouseRequestPage;