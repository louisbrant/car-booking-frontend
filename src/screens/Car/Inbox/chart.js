import React, { useCallback, useState, useEffect, useRef } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, TextArea, FlatList, useToast, IconButton } from "native-base";
import { Ionicons, FontAwesome5, Foundation } from "@expo/vector-icons";
import { useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';


import { COLOR, Images, LAYOUT, ROOT, convertTZ } from "../../../constants";

import * as ImagePicker from 'expo-image-picker';

import { Video, ResizeMode } from "expo-av";
import { useApi } from '../../../redux/services'
const { width, height } = Dimensions.get('window')

const ChartPage = ({ navigation }) => {

    const { user } = useSelector((store) => store.auth);
    const [receiver, setReceiver] = useState("");
    const Toast = useToast();
    const video = React.useRef(null);
    const Api = useApi();
    const [loading, setLoading] = useState(false)
    const [flatList, setflatList] = useState()
    const [AppointData, setAppointData] = useState(false)
    const [sendData, setsendData] = useState();
    const [OnlineUsers, setOnlineUsers] = useState([])
    const [Messages, setMessages] = useState([]);
    const [backendtime, setBackendTime] = useState();
    const [currenttime, setCurrentTime] = useState();

    const [file, setAddfile] = useState({
        data: [],
        selected: false
    });

    const getImages = (para) => {
        const array = [];
        const uri = para.uri;
        const name = uri.split("/").pop();
        const match = /\.(\w+)$/.exec(name);
        const type = match ? `image/${match[1]}` : `image`;
        array.push({
            uri, name, type
        });
        return array;
    }

    const onUpload = async () => {
        console.log('ddd');
        try {
            let result = await ImagePicker.launchImageLibraryAsync
                ({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: false
                })
            if (!result.cancelled) {
                let newFile = file.data;
                newFile.push(result);
                console.log(newFile);
                setAddfile({
                    ...file,
                    data: newFile,
                    selected: true
                });
            }
            else {
                return Toast.show({ title: "Upload error!", placement: 'bottom', status: 'error', w: 300 })
            }
        }
        catch (E) {
            console.log(E)
        }
    }


    const Send = async () => {
        let msg = {
            sender: user.email,
            receiver: receiver,
            text: sendData,
            file: file.data
        };
        if (sendData) {
            const promises = file.data
                .filter(({ type }) => type)
                .map(onStartUpload);

            const results = await Promise.all(promises);
            console.log('results91', results); // array of resolved data values

            ROOT.Socket.emit("send msg", msg)
            setMessages(prev => [...prev, msg])
            setsendData();
        }
    }

    const onStartUpload = (add_file) => {
        console.log('add_file100=>', add_file);
        return new Promise((resolve, reject) => {
            if (add_file.type) {
                const formData = new FormData();
                if (typeof (add_file.data) === 'object') {
                    const photos = getImages(add_file.data)
                    photos.forEach(photo => formData.append("photo", photo));
                }
                formData.append("data", JSON.stringify({ email: user.email }));

                fetch(`${ROOT.BACKEND_URL}chat/addFile`, {
                    method: "POST",
                    body: formData,
                })
                    .then(response => {
                        console.log('response=>', response);
                        if (response.ok) {
                            resolve(1);
                        } else {
                            reject(0);
                        }
                    })
                    .catch(error => {
                        reject(0);
                    });
            }
        })
    }

    const delete_file = (i) => {
        let file_data = file.data;
        delete file_data[i];
        setAddfile({
            ...file,
            data: file_data
        });
    }

    const LoadAppointData = () => {
        if (receiver) {
            let msg = {
                sender: user.email,
                receiver: receiver,
            };
            ROOT.Socket.emit("get msg", msg);
        }
    }

    const fetchData = async () => {
        const receiver = await AsyncStorage.getItem('withchat');
        setReceiver(receiver);

        ROOT.Socket.on("new user", function (data) {
            setOnlineUsers(data);
        });

        ROOT.Socket.on("receive msg", (data) => {
            setMessages(data?.data);
            setBackendTime(data?.time);
            setCurrentTime(new Date().valueOf());
        })

        const [appointData] = await Promise.all([
            LoadAppointData()
        ]);

        setAppointData(appointData);
    }

    useEffect(() => {
        fetchData();

        return () => {
            ROOT.Socket.off("new user");
            ROOT.Socket.off("receive msg");
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

            <Box w="full" pb={0}>
                <Box py={0} h={height - 180}>
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
                                                {convertTZ(item?.senddate, backendtime)}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                                :
                                <Box mr={2} mb={2}>
                                    <HStack style={{ flexDirection: 'row', justifyContent: 'flex-start' }} ml={2}>
                                        <VStack space={1} maxW={width - 50} background={COLOR.inPlaceholder} p={3} pb={1} borderTopRadius={20} borderBottomRightRadius={20}>
                                            <Text color={COLOR.black} fontWeight="medium" >
                                                {item?.text}
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
                                                {convertTZ(item?.senddate)}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                        )}
                        keyExtractor={(item, index) => `${index}`}
                    />
                </Box>

                <Box position={'absolute'} mt={height - 250} zIndex={1} px={2}>
                    <ScrollView horizontal={true} style={{ flex: 1 }}  >
                        {file.data.map((file_data, i) => {
                            console.log("file_data=>", file_data.type);
                            if (file_data?.type == "video")
                                return (
                                    <HStack justifyContent="space-between" key={i}>
                                        <Box opacity={0.7}>
                                            <Video
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    borderRadius: 10
                                                }}
                                                ref={video}
                                                source={{
                                                    uri: file_data?.uri,
                                                }}
                                                useNativeControls
                                                resizeMode={ResizeMode.CONTAIN}
                                                isLooping
                                            />
                                        </Box>
                                        <View ml={-5}>
                                            <TouchableOpacity onPress={() => delete_file(i)}>
                                                <Icon color={COLOR.slowblack} size="md" as={<Ionicons name="close" />} />
                                            </TouchableOpacity>
                                        </View>
                                    </HStack>
                                )
                            else if (file_data?.type == "image") {
                                return (
                                    <HStack justifyContent="space-between" key={i}>
                                        <Box opacity={0.7}>
                                            <Image borderRadius={10} source={{ uri: file_data.uri }} w={75} height={75} alt="car" />
                                        </Box>
                                        <View ml={-5}>
                                            <TouchableOpacity onPress={() => delete_file(i)}>
                                                <Icon color={COLOR.slowblack} size="md" as={<Ionicons name="close" />} />
                                            </TouchableOpacity>
                                        </View>
                                    </HStack>
                                )
                            }
                        })}
                    </ScrollView>
                </Box>
                <HStack alignItems="center" justifyContent="space-between" py={2} px={2}>
                    <Input
                        value={sendData}
                        onChangeText={setsendData}
                        w="80%"
                        h="37"
                        InputRightElement={
                            <Pressable onPress={() => onUpload()}>
                                <Icon size="md" mr={2} color={COLOR.ChatInputMessageIconcolor}>
                                    {LAYOUT.attachmenticon}
                                </Icon>
                            </Pressable>}
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