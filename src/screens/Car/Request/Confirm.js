import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, useToast } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT } from "../../../constants";

import { BottomTab } from '../../../components';

import { useDispatch, useSelector } from 'react-redux';
import { useApi } from '../../../redux/services'

const RequestConfirmPage = ({ navigation }) => {

    const { car, book, user } = useSelector((store) => store.auth);
    const Api = useApi();
    const Toast = useToast();

    const [rentdate, setRentDate] = useState(1);
    const [totlalprice, setTotalPrice] = useState(10);

    const onShowProfile = () => {
        navigation.navigate("EditProfileScreen")
    }

    const onShowPayment = () => {
        navigation.navigate("MyPaymentScreen")
    }

    const onTrippage = () => {
        navigation.navigate("TripPageScreen")
    }

    useEffect(() => {
        let startdate = new Date(book?.startcheckdate).valueOf();
        let enddate = new Date(book?.endcheckdate).valueOf();
        console.log(startdate, enddate, book);
        let rentdateval = (enddate - startdate) / (1000 * 3600 * 24);
        console.log("rentdateval=>", rentdateval)
        if ((rentdateval - Math.floor(rentdateval)) > 0)
            rentdateval = Math.floor(rentdateval + 1);
        else
            rentdateval = Math.floor(rentdateval);
        setRentDate(rentdateval);
        setTotalPrice(Number(Number(car?.days) * Number(rentdate) + 10))
        // let startdate = new Date(book.startcheckdate);
        // let enddate = new Date(book.endcheckdate);
        // let startyear = startdate.getFullYear();
        // let endyear = enddate.getFullYear();
        // let startmonth = startdate.getMonth();
        // let endmonth = enddate.getMonth();
        // let rendtdateval = "";
        // let rentstartdateval = new Date(startdate).toString();
        // let rentenddateval = new Date(enddate).toString();
        // if (startyear == endyear) {
        //     if (startmonth == endmonth)
        //         rendtdateval = rentstartdateval.split(" ")[1] + " " + rentstartdateval.split(" ")[2] + " - " + rentenddateval.split(" ")[2]
        //     else
        //         rendtdateval = rentstartdateval.split(" ")[1] + " " + rentstartdateval.split(" ")[2] + " - " + rentenddateval.split(" ")[1] + " " + rentenddateval.split(" ")[2]
        // }
        // else
        //     rendtdateval = rentstartdateval.split(" ")[3] + " " + rentstartdateval.split(" ")[1] + " " + rentstartdateval.split(" ")[2] + " - " + rentenddateval.split(" ")[3] + " " + rentenddateval.split(" ")[1] + " " + rentenddateval.split(" ")[2];
        // setRentDate(rendtdateval);
        // Api.GetUserInfor({
        //     email: car.email,
        // }).then(({ data }) => {
        //     if (data.status) {
        //         data = data?.data;
        //         setRentedName(data?.username)
        //         if (data.avatar)
        //             setRentedImg({
        //                 uri: ROOT.IMAGE_URL + "users/" + data.avatar
        //             })

        //     }
        //     else {
        //         return Toast.show({ title: data.message, placement: 'bottom', status: 'error', w: 300 })
        //     }
        // }).catch(error => {
        //     if (error.response && error.response.status === 400) {
        //         return Toast.show({ title: error.response.data, placement: 'bottom', status: 'error', w: 300 })
        //     } else {
        //         return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 })

        //     }
        // })
    }, [])

    return (
        <Box flex={1}>
            <Box
                px={5}
                pb={3}
                pt={5}
                bg={COLOR.white}
                w="full"
                style={{
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
                <Stack direction="row" alignItems="center">

                    <View style={{ position: 'absolute' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon color={COLOR.black} size="md" as={<Ionicons name="arrow-back" />} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text
                            color={COLOR.black}
                            fontWeight="semibold"
                            fontSize="md"
                        >Confirm and Pay</Text>
                    </View>
                </Stack>

            </Box>

            <Box w="full" px={5} py={3} pb={10}>
                <Box py={2}>
                    <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">PRICE DETAILS</Text>
                    <VStack mt={2} space={1}>
                        <HStack justifyContent="space-between">
                            <Text fontWeight="medium" fontSize="xs">${car?.days}/DAY X {rentdate} Days</Text>
                            <Text fontWeight="medium" fontSize="xs">${Number(car?.days) * Number(rentdate)}</Text>
                        </HStack>
                        <HStack justifyContent="space-between">
                            <Text fontWeight="medium" fontSize="xs">Service fees</Text>
                            <Text fontWeight="medium" fontSize="xs">$10.00</Text>
                        </HStack>
                        <HStack justifyContent="space-between">
                            <Text fontWeight="medium" fontSize="xs">Total</Text>
                            <Text fontWeight="medium" fontSize="xs">${totlalprice}</Text>
                        </HStack>
                    </VStack>
                </Box>
                <Box py={2} mt={3}>
                    <VStack space={2}>
                        <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">PAY WITH</Text>
                        <HStack justifyContent="space-between" alignItems="center">
                            <HStack alignItems="center" space={2}>
                                <Image source={Images.Visa} w="24px" resizeMode="contain" alt="visa" />
                                <Text fontWeight="medium" fontSize="xs">**** 1234</Text>
                            </HStack>

                            <TouchableOpacity onPress={onShowPayment}>
                                <Text color={COLOR.IBasePlaceholder} fontWeight="semibold" fontSize="xs">Edit</Text>
                            </TouchableOpacity>
                        </HStack>
                        <Text color={COLOR.IBasePlaceholder} fontWeight="semibold" fontSize="xs">Enter a coupon</Text>
                    </VStack>
                </Box>
                <Box py={2} mt={3}>
                    <VStack space={2}>
                        <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">Cancellation Policy</Text>
                        <Text fontWeight="semibold" fontSize="xs">
                            Lorem ipsum dolor sit amet, consectetur adipis cing elit. Praesent interdum aliquet tincidunt. Morbi sed molestie orci.
                        </Text>
                    </VStack>
                </Box>
                <Box py={2} mt={3}>
                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                        Lorem ipsum dolor sit amet, consectetur adipis cing elit.
                        Praesent interdum aliquet tincidunt. sed molestie orci.
                    </Text>
                </Box>
            </Box>

            <Box position="absolute" bottom={35} w="full" px={5}>

                <TouchableOpacity onPress={onTrippage}>
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
                            Confirm and Pay
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>

        </Box>
    )
}

export default RequestConfirmPage;