import React, { useCallback, useState } from 'react';

import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue } from "native-base";
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"

import { TabView, SceneMap } from 'react-native-tab-view';

import { COLOR, Images, LAYOUT } from "../../../constants";

import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')


const NotificationPage = ({ navigation }) => {

    const onDetail = async () => {
        navigation.navigate("MyProfileScreen")
    }

    return (
        <Box w="full">
            <VStack space={3}>
                {new Array(7).fill().map((item, idx) => {
                    return (
                        <TouchableOpacity key={idx} onPress={onDetail}>
                            <HStack space={2}>
                                <Avatar bg="white" alignSelf="center" size="md" source={Images[`Noti${idx + 1}`]} opacity={idx > 4 ? "0.8" : "1"} />
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
                                        <HStack alignItems="center" space={2}>
                                            {idx < 2 &&
                                                <Box bg={COLOR.IBase} w="5.5" h="5.5" rounded="full" />
                                            }
                                            <Text fontWeight="semibold" fontSize="xs">Notification title here</Text>
                                        </HStack>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">09:00AM</Text>
                                    </HStack>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                                </VStack>
                            </HStack>
                        </TouchableOpacity>
                    )
                })}
            </VStack>
        </Box>
    )
}

export default NotificationPage;