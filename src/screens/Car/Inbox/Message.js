import React, { useCallback, useState, useEffect } from 'react';

import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, useToast, Input, AspectRatio, Center, Actionsheet, useColorModeValue } from "native-base";
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"
import { useDispatch, useSelector } from 'react-redux';

import { TabView, SceneMap } from 'react-native-tab-view';

import { COLOR, Images, LAYOUT } from "../../../constants";
import { useApi } from '../../../redux/services'

import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')


const MessagePage = ({ navigation }) => {

    const { user } = useSelector((store) => store.auth);

    const Toast = useToast();
    const Api = useApi();

    const [chatList, setChatList] = useState([]);
    const onDetail = () => {
        navigation.navigate("ChartPageScreen");
    }

    const getChatList = () => {
        Api.getChatList({ email: user.email }).then(async ({ data }) => {
            if (data.status) {
                if (data?.list) {
                    console.log('data?.list=>', data?.list);
                    const promises = data?.list
                        .map(getUserInfor);

                    const results = await Promise.all(promises);
                    console.log('results91', results); // array of resolved data values
                    setChatList(results);
                }
            }
            else {
                return Toast.show({ title: data.message, placement: 'bottom', status: 'error', w: 300 });
            }
        }).catch(error => {
            console.log('error=>', error);
            if (error.response && error.response.status === 400) {
                return Toast.show({ title: error.response.data, placement: 'bottom', status: 'error', w: 300 })
            } else {
                return Toast.show({ title: "Error!", placement: 'bottom', status: 'error', w: 300 })
            }
        })
    }

    const getUserInfor = (data) => {
        let email = data.sender;
        if (email == user.email)
            email = data.receiver;
        return new Promise((resolve, reject) => {
            Api.GetUserInfor({ email }).then(async ({ data }) => {
                if (data.status) {
                    resolve(data.data);
                }
                else {
                    reject([]);
                }
            }).catch(error => {
                if (error.response && error.response.status === 400) {
                    Toast.show({ title: error.response.data, placement: 'bottom', status: 'error', w: 300 });
                    reject([]);
                } else {
                    Toast.show({ title: "Error!", placement: 'bottom', status: 'error', w: 300 })
                    reject([]);
                }
            })
        })
    }

    useEffect(() => {
        getChatList();
    }, []);

    return (
        <Box w="full">
            <VStack space={3}>
                {new Array(7).fill().map((item, idx) => {
                    return (
                        <TouchableOpacity key={idx} onPress={onDetail}>
                            <HStack space={2}>
                                <Avatar bg="white" alignSelf="center" size="md" source={Images[`Profile${idx + 1}`]} />
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
                                        <Text fontWeight="semibold" fontSize="xs">Name here</Text>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">09:00AM</Text>
                                    </HStack>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Lorem ipsum dolor sit amet, consectetur.</Text>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Trip Completed: Mar 23 -30</Text>
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