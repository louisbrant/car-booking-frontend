import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, IconButton, FlatList } from 'native-base'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'

const ChatpageScreen = ({ navigation }) => {
    const Api = useApi()
    const { user } = useSelector((store) => store.auth);
    const { groomer } = navigation.state.params;
    const [loading, setLoading] = useState(false)
    const [flatList, setflatList] = useState()
    const [AppointData, setAppointData] = useState(false)
    const [sendData, setsendData] = useState()
    const [OnlineUsers, setOnlineUsers] = useState([])
    const [Messages, setMessages] = useState([])

    const Send = () => {
        if (sendData) {
            let msg = {
                sender: user.email,
                receiver: groomer.email,
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
            receiver: groomer.email,
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
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            <Headers
                title={groomer.username}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box py={2} flex={1}>
                <Stack flex={1} px={7}>
                    {
                        OnlineUsers ? OnlineUsers.indexOf(groomer.email) !== -1 ?
                            <HStack alignItems="center" justifyContent="center" mt={-5}>
                                <Box mx={1} mt={-1} w={2.5} h={2.5} borderRadius={50} bg="green.500"></Box>
                                <Text color="green.500" fontSize={9} mr={3}>Online</Text>
                            </HStack>
                            : null : null
                    }
                    <FlatList
                        flex={1}
                        px={4}
                        data={Messages}
                        showsVerticalScrollIndicator={false}
                        ref={ref => setflatList(ref)}
                        onContentSizeChange={() => flatList.scrollToEnd()}
                        renderItem={({ item }) => (
                            item.sender === user.email ?
                                <HStack my={2} justifyContent="flex-end">
                                    <Box bg={COLOR.base} maxW="70%" p={3} borderRadius={20} borderBottomRightRadius={0}>
                                        <Text fontSize="sm" color={COLOR.white}>
                                            {item.text}
                                        </Text>
                                    </Box>
                                </HStack>
                                :
                                <HStack my={2}>
                                    <Image w={8} h={8} borderRadius={100} alignSelf="flex-end" source={groomer.avatar ? { uri: ROOT.IMAGE_URL + "users/" + groomer.avatar } : user.roles === "customer" ? Images.GroomerAvata : Images.Profile} mr={2} mb={2} />
                                    <Box bg="#ebebeb" maxW="80%" p={3} borderRadius={20} borderBottomLeftRadius={0}>
                                        <Text fontSize="sm" color={COLOR.black}>
                                            {item.text}
                                        </Text>
                                    </Box>
                                </HStack>
                        )}
                        keyExtractor={(item, index) => `${index}`}
                    />
                </Stack>
                <HStack alignItems="center" justifyContent="space-between" bg={COLOR.white} py={3} px={7}>
                    <Input h={42} onChangeText={setsendData} value={sendData} w="80%" style={{ paddingLeft: 20, paddingRight: 20 }} my={2} size="sm" borderRadius="pill" bg={COLOR.white} _focus={{ borderColor: "gray.400", paddingLeft: "20px", paddingRight: "20px" }} placeholder="Type here..."
                        _light={{ placeholderTextColor: "#cccccc" }} _dark={{ placeholderTextColor: "#cccccc" }}
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

export default ChatpageScreen