import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue } from "native-base";
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"

import { TabView, SceneMap } from 'react-native-tab-view';

import { COLOR, Images, LAYOUT } from "../../../constants";

import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

import HistoryPage from './History';
import BookedPage from './Booked';
import { BottomTab } from '../../../components';

const TripPage = ({ navigation }) => {

    const [activeTab, setActiveTab] = useState(1);

    const onAddCard = () => {
        navigation.navigate("AddCardScreen")
    }


    return (
        <Box flex={1}>
            <Box
                px={5}
                // pb={3}
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

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text
                            color={COLOR.black}
                            fontWeight="semibold"
                            fontSize="md"
                        >Trips</Text>
                    </View>
                </Stack>

                <Stack direction="row" justifyContent="center" alignItems="center" mt={1}>
                    <Box w="1/2">
                        <TouchableOpacity onPress={() => setActiveTab(1)}>
                            <Box
                                w="full"
                                py={3}

                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <VStack justifyContent="center" alignItems="center">
                                    <Text color={activeTab === 1 ? COLOR.IBase : COLOR.inPlaceholder} fontWeight="medium" fontSize="xs">Booked</Text>
                                </VStack>

                                {activeTab === 1 &&
                                    <Box
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,

                                            width: '100%',
                                            height: 3,
                                            backgroundColor: COLOR.IBase,

                                            shadowColor: COLOR.inPlaceholder,
                                            shadowOffset: {
                                                width: 0,
                                                height: 4,
                                            },
                                            shadowOpacity: 0.15,
                                            shadowRadius: 24,

                                            borderTopLeftRadius: 30,
                                            borderTopRightRadius: 50,
                                        }}
                                    />
                                }
                            </Box>
                        </TouchableOpacity>
                    </Box>
                    <Box w="1/2">
                        <TouchableOpacity onPress={() => setActiveTab(2)}>
                            <Box
                                w="full"
                                py={3}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >

                                <VStack justifyContent="center" alignItems="center">
                                    <Text color={activeTab === 2 ? COLOR.IBase : COLOR.inPlaceholder} fontWeight="medium" fontSize="xs">History</Text>
                                </VStack>

                                {activeTab === 2 &&
                                    <Box
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,

                                            width: '100%',
                                            height: 3,
                                            backgroundColor: COLOR.IBase,

                                            shadowColor: COLOR.inPlaceholder,
                                            shadowOffset: {
                                                width: 0,
                                                height: 4,
                                            },
                                            shadowOpacity: 0.15,
                                            shadowRadius: 24,

                                            borderTopLeftRadius: 30,
                                            borderTopRightRadius: 50,
                                        }}
                                    />
                                }

                            </Box>
                        </TouchableOpacity>
                    </Box>
                </Stack>
            </Box>

            <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                <Box w="full" px={5} py={3} pb={10}>
                    {activeTab === 1 ?
                        <BookedPage navigation={navigation} />
                        :
                        <HistoryPage navigation={navigation} />
                    }
                </Box>
            </ScrollView>

            <BottomTab navigation={navigation} />

        </Box>
    )
}

export default TripPage;