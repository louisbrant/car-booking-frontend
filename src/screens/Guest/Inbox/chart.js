import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, TextArea, FlatList, IconButton } from "native-base";
import { Ionicons, FontAwesome5, Foundation } from "@expo/vector-icons";

import { useSelector } from 'react-redux';

import io from 'socket.io-client';

import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";

const socket = io();

const { width } = Dimensions.get('window')

const ChartPage = ({ navigation }) => {

    const { user } = useSelector((store) => store.auth);


    const [loading, setLoading] = useState(false)
    const [flatList, setflatList] = useState()
    const [AppointData, setAppointData] = useState(false)
    const [sendData, setsendData] = useState()
    const [OnlineUsers, setOnlineUsers] = useState([])
    const [Messages, setMessages] = useState([]);

    const Send = () => {
        if (sendData) {
            let msg = {
                sender: user.email,
                receiver: 'groomer.email',
                text: sendData
            };
            setsendData();
            ROOT.Socket.emit("send msg", msg)
            setMessages(prev => (
                [...prev, msg]
            ))
        }
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
            setMessages(data);
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
                            <Avatar bg="white" alignSelf="center" size={"36"} source={Images.Profile1} />
                            <VStack space={1}>
                                <Text fontWeight="semibold" fontSize="xs">Name here</Text>
                                <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Online</Text>
                            </VStack>
                        </HStack>
                    </View>
                </Stack>
            </Box>

            <Box w="full" px={5} pt={3} pb={10}>
                <Box py={5} h={470}>
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
                                <Box mr={2}>
                                    <HStack style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <VStack space={3} maxW={width - 50} background={COLOR.IBase} p={3} borderTopRadius={20} borderBottomLeftRadius={20}>
                                            <Text color={COLOR.white} fontWeight="medium" >
                                                Lorem ipsum dolor sit amet{"\n"}
                                                Lorem ipsum dolor sit amet{"\n"}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <HStack style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <VStack space={5} mt={-5} mr={-2} style={{
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
                                                09:00AM
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                                :
                                <Box mr={2} >
                                    <HStack style={{ flexDirection: 'row', justifyContent: 'flex-start' }} ml={2}>
                                        <VStack space={3} maxW={width - 50} background={COLOR.inPlaceholder} p={3} borderTopRadius={20} borderBottomRightRadius={20}>
                                            <Text color={COLOR.black} fontWeight="medium" >
                                                Lorem ipsum dolor sit amet{"\n"}
                                                Lorem ipsum dolor sit amet{"\n"}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <HStack style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <VStack space={5} mt={-5} style={{
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
                    {/* <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false} style={{ zIndex: 1, fontSize: 12 }}>
                        <Box mr={2}>
                            <HStack style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <VStack space={3} maxW={width - 50} background={COLOR.IBase} p={3} borderTopRadius={20} borderBottomLeftRadius={20}>
                                    <Text color={COLOR.white} fontWeight="medium" >
                                        Lorem ipsum dolor sit amet{"\n"}
                                        Lorem ipsum dolor sit amet{"\n"}
                                    </Text>
                                </VStack>
                            </HStack>
                            <HStack style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <VStack space={5} mt={-5} mr={-2} style={{
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
                                        09:00AM
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                        <Box mr={2} >
                            <HStack style={{ flexDirection: 'row', justifyContent: 'flex-start' }} ml={2}>
                                <VStack space={3} maxW={width - 50} background={COLOR.inPlaceholder} p={3} borderTopRadius={20} borderBottomRightRadius={20}>
                                    <Text color={COLOR.black} fontWeight="medium" >
                                        Lorem ipsum dolor sit amet{"\n"}
                                        Lorem ipsum dolor sit amet{"\n"}
                                    </Text>
                                </VStack>
                            </HStack>
                            <HStack style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <VStack space={5} mt={-5} style={{
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
                    </ScrollView> */}
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
                        borderWidth={0}
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
                {/* <Box mt={3} direction="row" >
                    <Input
                        w="80%"
                        h="35"
                        InputRightElement={
                            <Icon size="md" mr={2} color={COLOR.ChatInputMessageIconcolor}>
                                {LAYOUT.attachmenticon}
                            </Icon>
                        }
                        bg={COLOR.ChatInputMessagebg}
                        pl={1.5}

                        borderStyle="solid"
                        borderWidth={0}
                        borderColor={COLOR.inpBorderColor}
                        borderRadius={5}

                        fontSize="xs"
                        color={COLOR.black}
                        placeholder="Type your message"
                    />
                    <IconButton w="20%" h={40} borderRadius={100}
                        bg="black" colorScheme="dark" onPress={Send}
                        icon={<Icon size={5} as={<Ionicons name="md-send" />} color="white" />}
                    />
                </Box> */}
            </Box>
        </Box >
    )
}

export default ChartPage;