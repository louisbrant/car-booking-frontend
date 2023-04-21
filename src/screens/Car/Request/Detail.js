import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, TextArea, useToast, IconButton } from "native-base";
import { Ionicons, FontAwesome5, Foundation } from "@expo/vector-icons";

import { useDispatch, useSelector } from 'react-redux';
import { useApi } from '../../../redux/services'
import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";

const RequestDetailPage = ({ navigation }) => {

    const { car, book, user } = useSelector((store) => store.auth);
    const Api = useApi();
    const Toast = useToast();

    const [rentedimg, setRentedImg] = useState({ uri: "" });
    const [rentedname, setRentedName] = useState("Not Name");
    const [rentdate, setRentDate] = useState("");
    const [sendData, setsendData] = useState();
    const [message, setMessage] = useState([]);

    const Send = () => {
        let messagedata = message;
        messagedata = [
            ...messagedata,
            sendData
        ];
        setMessage(messagedata);
        setsendData('');
    }

    const onCarRent = () => {
        console.log("CAR=>", car)
        let rentdata = {
            carid: car?._id,
            rentedemail: user?.email,
            rentdate: {
                start: book?.startcheckdate,
                end: book?.endcheckdate,
            },
            message: message
        }
        Api.RentCar({ rentdata }).then(({ data }) => {
            console.log(data);
            if (data.status) {
                Toast.show({ title: data.message, placement: 'bottom', status: 'success', w: 300 });
                return navigation.navigate("RequestConfirmScreen");
            }
            else {
                return Toast.show({ title: data.message, placement: 'bottom', status: 'error', w: 300 })
            }
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                return Toast.show({ title: error.response.message, placement: 'bottom', status: 'error', w: 300 })
            } else {
                return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 })
            }
        })
    }


    useEffect(() => {
        let startdate = new Date(book.startcheckdate);
        let enddate = new Date(book.endcheckdate);
        let startyear = startdate.getFullYear();
        let endyear = enddate.getFullYear();
        let startmonth = startdate.getMonth();
        let endmonth = enddate.getMonth();
        let rendtdateval = "";
        let rentstartdateval = new Date(startdate).toString();
        let rentenddateval = new Date(enddate).toString();
        if (startyear == endyear) {
            if (startmonth == endmonth)
                rendtdateval = rentstartdateval.split(" ")[1] + " " + rentstartdateval.split(" ")[2] + " - " + rentenddateval.split(" ")[2]
            else
                rendtdateval = rentstartdateval.split(" ")[1] + " " + rentstartdateval.split(" ")[2] + " - " + rentenddateval.split(" ")[1] + " " + rentenddateval.split(" ")[2]
        }
        else
            rendtdateval = rentstartdateval.split(" ")[3] + " " + rentstartdateval.split(" ")[1] + " " + rentstartdateval.split(" ")[2] + " - " + rentenddateval.split(" ")[3] + " " + rentenddateval.split(" ")[1] + " " + rentenddateval.split(" ")[2];
        setRentDate(rendtdateval);
        Api.GetUserInfor({
            email: car.email,
        }).then(({ data }) => {
            if (data.status) {
                data = data?.data;
                setRentedName(data?.username)
                if (data.avatar)
                    setRentedImg({
                        uri: ROOT.IMAGE_URL + "users/" + data.avatar
                    })

            }
            else {
                return Toast.show({ title: data.message, placement: 'bottom', status: 'error', w: 300 })
            }
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                return Toast.show({ title: error.response.data, placement: 'bottom', status: 'error', w: 300 })
            } else {
                return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 })

            }
        })
    }, [])
    return (
        <Box flex={1}>
            <Box
                px={5}
                pb={3}
                pt={10}
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

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} pl={8}>
                        <HStack space={2}>
                            <Avatar bg="white" alignSelf="center" size={"36"} source={rentedimg.uri == "" ? Images.Profile1 : rentedimg} />
                            <VStack space={1}>
                                <Text fontWeight="semibold" fontSize="xs">{rentedname}</Text>
                                <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Response Time: 1 hour</Text>
                            </VStack>
                        </HStack>
                    </View>
                </Stack>
            </Box>

            <Box w="full" px={5} pt={3} pb={10}>
                <HStack space={2} alignItems="center">
                    <Box style={{ height: 36, width: 44 }}>
                        <Image source={{ uri: car.img }} style={{ width: '100%', height: '100%' }} rounded={6} alt="car" />
                    </Box>
                    <VStack space={1}>
                        <Text fontWeight="medium" fontSize="xs">{car?.name}</Text>
                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Trip Completed: {rentdate}</Text>
                    </VStack>
                </HStack>

                <HStack
                    mt={2}
                    pb={3}
                    alignItems="center"
                    justifyContent="space-between"
                    style={{
                        borderStyle: 'solid',
                        borderBottomWidth: 1,
                        borderColor: COLOR.inpBorderColor,
                    }}
                >
                    <Box
                        style={{
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderColor: COLOR.inpBorderColor,
                            borderRadius: 5,

                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        h={28}
                        px={3}
                    >
                        <TouchableOpacity onPress={onCarRent}>
                            <HStack space={2} alignItems="center">
                                <Ionicons name="md-share-outline" size={12} color="black" />
                                <Text fontWeight="medium" fontSize="2xs">Share listing</Text>
                            </HStack>
                        </TouchableOpacity>
                    </Box>
                </HStack>

                <Box py={5} h={380}>
                    <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                        <VStack space={5}>
                            {message.map((item, idx) => {
                                return (
                                    <Text key={idx} p={0} m={0} color={COLOR.black} fontWeight="medium" fontSize="2xs">
                                        {item}
                                    </Text>
                                )
                            })}
                        </VStack>
                    </ScrollView>
                </Box>

                <HStack alignItems="center" justifyContent="space-between" py={2} px={1}>
                    <Input
                        value={sendData}
                        onChangeText={setsendData}
                        w="80%"
                        h="37"
                        InputLeftElement={
                            <Icon size="md" ml={2} color={COLOR.inIconColor}>
                                {LAYOUT.imageIcon}
                            </Icon>
                        }
                        bg={COLOR.ChatInputMessagebg}
                        pl={1.5}
                        borderStyle="solid"
                        borderWidth={1}
                        borderColor={COLOR.inpBorderColor}
                        borderRadius={5}

                        fontSize="xs"
                        color={COLOR.black}
                        placeholder="Write a message"
                    />
                    <IconButton w={42} h={42} borderRadius={100}
                        bg="black" colorScheme="dark" onPress={Send}
                        icon={<Icon size={5} as={<Ionicons name="md-send" />} color="white" />}
                    />
                </HStack>
            </Box>
        </Box>
    )
}

export default RequestDetailPage;