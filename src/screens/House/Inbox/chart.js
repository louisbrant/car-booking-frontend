import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, TextArea, FlatList, IconButton } from "native-base";
import { Ionicons, FontAwesome5, Foundation } from "@expo/vector-icons";
import { useSelector } from 'react-redux';


import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";


const { width, height } = Dimensions.get('window')

const ChartPage = ({ navigation }) => {

    const { user } = useSelector((store) => store.auth);

    const [loading, setLoading] = useState(false)
    const [flatList, setflatList] = useState()
    const [AppointData, setAppointData] = useState(false)
    const [sendData, setsendData] = useState();
    const [OnlineUsers, setOnlineUsers] = useState([])
    const [Messages, setMessages] = useState([]);
    const [backendtime, setBackendTime] = useState();
    const [currenttime, setCurrentTime] = useState();


    const Send = () => {
        if (sendData) {
            let msg = {
                sender: user.email,
                receiver: 'groomer.email',
                text: sendData
            };
            ROOT.Socket.emit("send msg", msg)
            setMessages(prev => (
                [...prev, msg]
            ))
            setsendData();
        }
    }

    const convertTZ = (date) => {
        if (typeof date === "string") {
            let senddateval = new Date(date).valueOf();
            let timestring = new Date().toString().split(new Date().toString().split("T")[1][0])[1].split(" ")[0];
            if (new Date().toString().split("T")[1][0] == "-") {
                if (timestring[0] != 0) {
                    senddateval += timestring[0] * 12 * 3600 * 1000;
                }
                if (timestring[1] != 0) {
                    senddateval += timestring[1] * 3600 * 1000;
                }
                if (timestring[2] != 0) {
                    senddateval += timestring[2] * 60 * 1000;
                }
                if (timestring[3] != 0) {
                    senddateval += timestring[3] * 1000;
                }
            }
            else if (new Date().toString().split("T")[1][0] == "+") {
                if (timestring[0] != 0) {
                    senddateval -= timestring[0] * 12 * 3600 * 1000;
                }
                if (timestring[1] != 0) {
                    senddateval -= timestring[1] * 3600 * 1000;
                }
                if (timestring[2] != 0) {
                    senddateval -= timestring[2] * 60 * 1000;
                }
                if (timestring[3] != 0) {
                    senddateval -= timestring[3] * 1000;
                }
            }

            if (Number(backendtime) > Number(currenttime))
                senddateval -= (Number(backendtime) - Number(currenttime));
            else
                senddateval += (Number(currenttime) - Number(backendtime));
            let sendyear = (new Date(senddateval)).getFullYear();
            let sendmonth = (new Date(senddateval)).getMonth() + 1;
            let senddate = (new Date(senddateval)).getDate();

            let currentyear = (new Date()).getFullYear();
            let currentmonth = (new Date()).getMonth() + 1;
            let currentdate = (new Date()).getDate();
            if (sendyear == currentyear) {
                if (sendmonth != currentmonth) {
                    return sendmonth + "." + senddate + "  " + new Date(senddateval).getHours() + ":" + new Date(senddateval).getMinutes();
                }
                else {
                    if (senddate == currentdate) {
                        return new Date(senddateval).getHours() + ":" + new Date(senddateval).getMinutes();
                    }
                    else {
                        return sendmonth + "." + senddate + "  " + new Date(senddateval).getHours() + ":" + new Date(senddateval).getMinutes();
                    }
                }
            }
            else {
                return sendyear + "." + sendmonth + "." + senddate + "  " + new Date(senddateval).getHours() + ":" + new Date(senddateval).getMinutes();
            }
        }
        else
            return "";
    }

    const LoadAppointData = () => {
        let msg = {
            sender: user.email,
            receiver: 'groomer.email',
        };
        ROOT.Socket.emit("get msg", msg);
    }

    useEffect(() => {
        ROOT.Socket.emit("get user");
        ROOT.Socket.on("new user", function (data) {
            setOnlineUsers(data);
        });
        ROOT.Socket.on("receive msg", (data) => {
            setMessages(data?.data);
            setBackendTime(data?.time);
            setCurrentTime(new Date().valueOf());
        })
        LoadAppointData()
        return () => {
            ROOT.Socket.off("get user");
            ROOT.Socket.off("new user");
            ROOT.Socket.off("receive msg");
            ROOT.Socket.off("get msg");
        }
    }, []);

    return (
        <Box flex={1}>
            <Box
                px={2}
                pb={2}
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
                            <Avatar bg="white" alignSelf="center" size={"36"} source={Images.Profile1} />
                            <VStack space={1}>
                                <Text fontWeight="semibold" fontSize="xs">Name here</Text>
                                <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Online</Text>
                            </VStack>
                        </HStack>
                    </View>
                </Stack>
            </Box>

            <Box w="full" px={2} pb={0}>
                <Box py={0} h={height - 150}>
                    <FlatList
                        flex={1}
                        px={4}
                        data={Messages}
                        showsVerticalScrollIndicator={false}
                        ref={ref => setflatList(ref)}
                        onContentSizeChange={() => flatList.scrollToEnd()}
                        style={{ zIndex: 1, fontSize: 12 }}
                        renderItem={({ item }) => (
                            item?.sender === user.email ?
                                <Box mr={2} mb={2}>
                                    <HStack style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <VStack space={2} maxW={width - 50} background={COLOR.IBase} p={3} py={2} borderTopRadius={20} borderBottomLeftRadius={20}>
                                            <Text color={COLOR.white} fontWeight="medium" >
                                                {item?.text}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <HStack style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <VStack space={2} mt={-5} mr={-2} style={{
                                            width: 0,
                                            height: 0,
                                            borderRightWidth: 10,
                                            borderBottomWidth: 20,
                                            borderStyle: 'solid',
                                            backgroundColor: 'transparent',
                                            borderLeftColor: 'transparent',
                                            borderRightColor: 'transparent',
                                            borderBottomColor: COLOR.IBase
                                        }} background={COLOR.IBase}>
                                        </VStack>
                                    </HStack>
                                    <HStack style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <VStack space={5}>
                                            <Text color={COLOR.inPlaceholder} fontWeight="medium" >
                                                {convertTZ(item?.senddate)}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                                :
                                <Box mr={2} mb={2}>
                                    <HStack style={{ flexDirection: 'row', justifyContent: 'flex-start' }} ml={2}>
                                        <VStack space={1} maxW={width - 50} background={COLOR.inPlaceholder} p={3} pb={1} borderTopRadius={20} borderBottomRightRadius={20}>
                                            <Text color={COLOR.black} fontWeight="medium" >
                                                Lorem ipsum dolor sit amet{"\n"}
                                                Lorem ipsum dolor sit amet{"\n"}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <HStack style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <VStack space={1} mt={-5} style={{
                                            width: 0,
                                            height: 0,
                                            borderLeftWidth: 10,
                                            borderBottomWidth: 20,
                                            borderStyle: 'solid',
                                            backgroundColor: 'transparent',
                                            borderLeftColor: 'transparent',
                                            borderRightColor: 'transparent',
                                            borderBottomColor: COLOR.inPlaceholder
                                        }} background={COLOR.inPlaceholder}>
                                        </VStack>
                                    </HStack>
                                    <HStack style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <VStack space={5}>
                                            <Text color={COLOR.inPlaceholder} fontWeight="medium" >
                                                09:00AM
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                        )}
                        keyExtractor={(item, index) => `${index}`}
                    />
                </Box>
                <HStack alignItems="center" justifyContent="space-between" py={2} px={1}>

                    <Input
                        value={sendData}
                        onChangeText={setsendData}
                        w="80%"
                        h="37"
                        InputRightElement={
                            <Icon size="md" mr={2} color={COLOR.ChatInputMessageIconcolor}>
                                {LAYOUT.attachmenticon}
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
                        placeholder="Type your message"
                    />
                    <IconButton w={42} h={42} borderRadius={100}
                        bg="black" colorScheme="dark" onPress={Send}
                        icon={<Icon size={5} as={<Ionicons name="md-send" />} color="white" />}
                    />
                </HStack>
            </Box>
        </Box >
    )
}

export default ChartPage;