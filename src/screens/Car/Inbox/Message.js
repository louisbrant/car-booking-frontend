import React, { useCallback, useState, useEffect } from 'react';

import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, useToast, Input, AspectRatio, Center, Actionsheet, useColorModeValue } from "native-base";
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"
import { useDispatch, useSelector } from 'react-redux';

import { TabView, SceneMap } from 'react-native-tab-view';

import { COLOR, Images, LAYOUT, ROOT, convertTZ } from "../../../constants";
import { useApi } from '../../../redux/services'

import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')


const MessagePage = ({ navigation }) => {

    const { user } = useSelector((store) => store.auth);

    const Toast = useToast();
    const Api = useApi();
    const [backendtime, setBackendTime] = useState("");
    const [chatList, setChatList] = useState([]);
    const onDetail = () => {
        navigation.navigate("ChartPageScreen");
    }

    const getChatList = async () => {
        try {
            const { data } = await Api.getChatList({ email: user.email });
            if (data.status && data?.list) {
                const promises = data.list.map(getUserInfo);
                const results = await Promise.all(promises);
                setBackendTime(data?.time);
                setChatList(results);
                console.log('results36', results);
            } else {
                Toast.show({
                    title: data.message || "Error!",
                    placement: "bottom",
                    status: "error",
                    w: 300,
                });
            }
        } catch (error) {
            console.log("error=>", error);
            if (error.response && error.response.status === 400) {
                Toast.show({
                    title: error.response.data,
                    placement: "bottom",
                    status: "error",
                    w: 300,
                });
            } else {
                Toast.show({
                    title: "Error!",
                    placement: "bottom",
                    status: "error",
                    w: 300,
                });
            }
        }
    };

    const getUserInfo = async (data) => {
        try {
            let email = data.sender;
            if (email == user.email) email = data.receiver;
            let userData = await Api.GetUserInfor({ email });
            console.log('userData70=>', userData);
            if (userData?.status == 200 && userData?.data?.status) {
                userData = userData.data?.data;
                userData.avatar = ROOT.IMAGE_URL + "users/" + userData.avatar;
                let chat_data = await Api.getEndChatInfor({
                    sender: data.sender,
                    receiver: data.receiver,
                });
                if (chat_data?.status == 200 && chat_data?.data?.status) {
                    chat_data = chat_data.data?.data;
                    return { ...data, userData, chat_data };
                }
                else {
                    Toast.show({
                        title: "Error!",
                        placement: "bottom",
                        status: "error",
                        w: 300,
                    });
                }
            }
            else {
                Toast.show({
                    title: "Error!",
                    placement: "bottom",
                    status: "error",
                    w: 300,
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Toast.show({
                    title: error.response.data,
                    placement: "bottom",
                    status: "error",
                    w: 300,
                });
            } else {
                Toast.show({
                    title: "Error!",
                    placement: "bottom",
                    status: "error",
                    w: 300,
                });
            }
        }
        return {};
    };

    useEffect(() => {
        getChatList();
    }, []);

    return (
        <Box w="full">
            <VStack space={3}>
                {chatList.map((item, idx) => {
                    return (
                        <TouchableOpacity key={idx} onPress={onDetail}>
                            <HStack space={2}>
                                <Avatar bg="white" alignSelf="center" size="md" source={{ uri: item?.userData?.avatar }} />
                                <VStack
                                    flex={1}
                                    space={1}
                                    pb={2}
                                    style={{
                                        borderStyle: 'solid',
                                        borderBottomWidth: 1,
                                        borderColor: COLOR.inpBorderColor,
                                    }}
                                >
                                    <HStack justifyContent="space-between" alignItems="center">
                                        <Text fontWeight="semibold" fontSize="xs">{item?.userData?.username}</Text>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">{convertTZ(item?.chat_data?.senddate, backendtime)}</Text>
                                    </HStack>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">{item?.chat_data?.text}</Text>
                                </VStack>
                            </HStack>
                        </TouchableOpacity>
                    )
                })}
            </VStack>
        </Box>
    )
}

export default MessagePage;