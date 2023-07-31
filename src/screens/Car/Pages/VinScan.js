import React, { useCallback, useState, useEffect } from 'react';
import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";
import { ScrollView, TouchableOpacity, ImageBackground, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, Menu, Pressable, useToast } from "native-base";
import Slider from 'rn-range-slider';
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Feather, FontAwesome, Ionicons } from "@expo/vector-icons"

import CalendarList from 'react-native-calendar-list';

import { useDispatch, useSelector } from 'react-redux'
// import { RNCamera } from 'react-native-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';


import Thumb from './../Slider/Thumb';
import Rail from './../Slider/Rail';
import RailSelected from './../Slider/RailSelected';
import Notch from './../Slider/Notch';
import Label from './../Slider/Label';

import { setCarInfo } from '../../../redux/actions/authActions';
import { useApi } from '../../../redux/services'
import { Logut } from '../../../redux/actions/authActions'

import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'

import Vinbg from "./../../../assets/img/VIN-background.png"
const markStyle = { dayTextStyle: { color: 'white', fontSize: 14, fontWeight: 'bold' }, dayBackgroundColor: '#08a' };
const bgstyle = { width: "100%", height: "100%" };

const VinScanPage = ({ navigation }) => {

    const dispatch = useDispatch()
    const { car } = useSelector((store) => store.auth);
    const [barcodeval, setBarCodeVal] = useState('')

    const [loading, setLoading] = useState(false);

    const goScreenDescription = () => {
        let newcar = {
            address: car.address,
            px: car.px,
            py: car.py,
            barcode: barcodeval
        };
        dispatch(setCarInfo(newcar));
        return navigation.navigate("DescriptionScreenPageScreen");
    }

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    useEffect(() => {

        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, [])
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setBarCodeVal(data);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <ImageBackground source={Vinbg} style={bgstyle} resizeMode="cover" >
            <Box style={{ width: '100%', height: "100%", backgroundColor: COLOR.Homebgcolor }}
            >
                <Box
                    px={5}
                    pb={3}
                    pt={20}
                    w="full"
                    style={{ backgroundColor: COLOR.Homebgcolor }}
                >
                    <Stack direction="row" alignItems="center">
                        <View style={{ position: 'absolute' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon color={COLOR.white} size="md" as={<Ionicons name="arrow-back" />} />
                            </TouchableOpacity>
                        </View>
                    </Stack>

                </Box>
                <Box style={{ width: '100%', height: "100%", backgroundColor: COLOR.Homebgcolor }}
                >
                    {loading && <Loading />}
                    <Box pt={180} pb={4} >
                        <HStack justifyContent="space-between" >
                            <VStack w="100%" space={1} >
                                <Text
                                    color={COLOR.white}
                                    fontWeight="medium"
                                    fontSize='16'
                                    textAlign="center"
                                >
                                    Align with VIN barcode to scan
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                    <Box px={4}>
                        <HStack justifyContent="space-between" >
                            <VStack w="full" space={1}>
                                <Input
                                    w="full"
                                    value={barcodeval}
                                    onChangeText={setBarCodeVal}
                                    p={2}
                                    borderStyle="solid"
                                    borderWidth={0}
                                    bgColor={COLOR.ScanInputcolor}
                                    color={COLOR.black}
                                    keyboardType='numeric'
                                />
                            </VStack>
                        </HStack>
                    </Box>

                    <Box pt={210} px={4} pb={100}>
                        <Box
                            style={{
                                width: '100%',
                                height: 45,
                                backgroundColor: COLOR.IBase,
                                borderRadius: 5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 0,
                                borderStyle: "solid",
                                borderColor: COLOR.white,
                            }}
                            onTouchStart={goScreenDescription}
                        >
                            <Text
                                color={COLOR.white}
                                fontWeight="bold"
                                fontSize="18"
                                textAlign="center"
                            >Type VIN instead
                            </Text>
                        </Box>
                    </Box>
                    <Box pt={230} px={4} backgroundColor={COLOR.transform} >
                        <BarCodeScanner
                            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                            style={StyleSheet.absoluteFillObject}
                        />
                        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                    </Box>
                </Box>
            </Box>
        </ImageBackground >
    );
};
export default VinScanPage;