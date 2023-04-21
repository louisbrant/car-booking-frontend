import React, { useCallback, useState, useEffect } from 'react';
import { COLOR, Images, LAYOUT, ROOT } from "../../constants";
import { ScrollView, TouchableOpacity } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, Menu, Pressable, useToast } from "native-base";
import Slider from 'rn-range-slider';
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Feather, FontAwesome } from "@expo/vector-icons"


import { useDispatch, useSelector } from 'react-redux'
import { BottomTab } from '../../components';


import { useApi } from '../../redux/services'

import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../components'

const markStyle = { dayTextStyle: { color: 'white', fontSize: 14, fontWeight: 'bold' }, dayBackgroundColor: '#08a' };

const HouseGuestPage = ({ navigation }) => {
    const { car } = useSelector((store) => store.auth)
    const dispatch = useDispatch()

    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('')


    const gogetStarted = () => {
        return navigation.navigate("HouseTellScreen");
    }

    const onClose = () => {
        return navigation.navigate("CarHomeScreen");
    }
    useEffect(() => {
        setLoading(false);
    }, [])
    return (
        <Box
            flex={1}
            bg={{
                linearGradient: {
                    colors: [COLOR.InputBlackWhiteBg, COLOR.InputBlackWhiteBg],
                    start: [0, 1],
                    end: [0, 0]
                }
            }}
            height={'100%'}
        >
            {loading && <Loading />}
            <Box
                pt={10}
                pb={2}
                px={5}
                style={{
                    backgroundColor: COLOR.InputBlackWhiteBg,
                    width: '100%',
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
                <HStack justifyContent="space-between">
                    <TouchableOpacity onPress={onClose}>
                        <Icon color={COLOR.black} size="md" as={<AntDesign name="close" />} />
                    </TouchableOpacity>
                </HStack>
            </Box>

            <Box py={3} px={5}
                bg={COLOR.InputBlackWhiteBg}>
                <HStack justifyContent="space-between" pb={5}>
                    <VStack w="100%" space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            style={{ fontSize: 18 }}
                        >
                            What type of place will
                        </Text>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            style={{ fontSize: 18 }}
                        >
                            guests have?
                        </Text>
                    </VStack>
                </HStack>
                <HStack
                    py={3}
                >
                    <HStack
                        w={'100%'}
                        style={{
                            paddingRight: 10,
                            display: 'flex',
                        }}
                        borderColor={COLOR.inpBorderColor}
                        borderWidth={1}
                        borderRadius={5}
                    >
                        <Box
                            p={3}
                            w="4/5"
                        >
                            <Text color={COLOR.black} style={{
                                paddingTop: 5
                            }} fontWeight="medium" fontSize={14}>An entire place</Text>
                            <Text color={COLOR.inPlaceholder} style={{
                                paddingTop: 3
                            }} fontWeight="medium" fontSize={12}>Guests will have the whole place
                                to themselves.</Text>
                        </Box>
                        <Box
                            p={7}
                            w="1/5"
                        >
                            {LAYOUT.HgethouseIcon}
                        </Box>
                    </HStack>
                </HStack>
                <HStack
                    py={3}
                >
                    <HStack
                        w={'100%'}
                        style={{
                            paddingRight: 10,
                            display: 'flex',
                        }}
                        borderColor={COLOR.inpBorderColor}
                        borderWidth={1}
                        borderRadius={5}
                    >
                        <Box
                            p={3}
                            w="4/5"
                        >
                            <Text color={COLOR.black} style={{
                                paddingTop: 5
                            }} fontWeight="medium" fontSize={14}>A private room</Text>
                            <Text color={COLOR.inPlaceholder} style={{
                                paddingTop: 3
                            }} fontWeight="medium" fontSize={12}>Guests will have the whole place
                                to themselves.</Text>
                        </Box>
                        <Box
                            p={7}
                            w="1/5"
                        >
                            {LAYOUT.BedIcon}
                        </Box>
                    </HStack>
                </HStack>
                <HStack
                    py={3}
                >
                    <HStack
                        w={'100%'}
                        style={{
                            paddingRight: 10,
                            display: 'flex',
                        }}
                        borderColor={COLOR.inpBorderColor}
                        borderWidth={1}
                        borderRadius={5}
                    >
                        <Box
                            p={3}
                            w="4/5"
                        >
                            <Text color={COLOR.black} style={{
                                paddingTop: 5
                            }} fontWeight="medium" fontSize={14}>A shared room</Text>
                            <Text color={COLOR.inPlaceholder} style={{
                                paddingTop: 3
                            }} fontWeight="medium" fontSize={12}>Guests will have the whole place
                                to themselves.</Text>
                        </Box>
                        <Box
                            p={7}
                            w="1/5"
                        >
                            {LAYOUT.SharedRoomIcon}
                        </Box>
                    </HStack>
                </HStack>


            </Box>

            <Box position="absolute" bottom={2} w="full" px={5}>
                <TouchableOpacity onPress={gogetStarted}>
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
                            Get Started
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    );
};
export default HouseGuestPage;