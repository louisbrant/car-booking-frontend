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

const GetHousePage = ({ navigation }) => {
    const { car } = useSelector((store) => store.auth)
    const dispatch = useDispatch()

    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('')


    const gogetStarted = () => {
        return navigation.navigate("HouseDescribesScreen");
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
            <BottomTab navigation={navigation} />
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
                            It's easy to get started
                        </Text>
                    </VStack>
                </HStack>

                <HStack justifyContent="space-between" pb={2}>
                    <VStack w="5%" space={1} style={{
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderColor: COLOR.IBase,
                        borderRadius: 100,
                        textAlign: "center",
                        width: 20,
                        height: 20,
                    }}>
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="xs"
                            textAlign={"center"}
                        >
                            1
                        </Text>
                    </VStack>
                    <VStack w="95%" px={2} space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            style={{ fontSize: 18 }}
                        >
                            Tell us about your place
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={4}>
                    <VStack w="5%" px={2} space={1} >
                    </VStack>
                    <VStack w="95%" px={3} space={1}>
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec ipsum ac quam auctor dapibus at sed ante.
                        </Text>
                    </VStack>
                </HStack>

                <HStack justifyContent="space-between" pb={2}>
                    <VStack w="5%" space={1} style={{
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderColor: COLOR.IBase,
                        borderRadius: 100,
                        textAlign: "center",
                        width: 20,
                        height: 20,
                    }}>
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="xs"
                            textAlign={"center"}
                        >
                            2
                        </Text>
                    </VStack>
                    <VStack w="95%" px={2} space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            style={{ fontSize: 18 }}
                        >
                            Make it stand out
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={4}>
                    <VStack w="5%" px={2} space={1} >
                    </VStack>
                    <VStack w="95%" px={3} space={1}>
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec ipsum ac quam auctor dapibus at sed ante.
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={2}>
                    <VStack w="5%" space={1} style={{
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderColor: COLOR.IBase,
                        borderRadius: 100,
                        textAlign: "center",
                        width: 20,
                        height: 20,
                    }}>
                        <Text
                            color={COLOR.IBase}
                            fontWeight="medium"
                            fontSize="xs"
                            textAlign={"center"}
                        >
                            3
                        </Text>
                    </VStack>
                    <VStack w="95%" px={2} space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="medium"
                            style={{ fontSize: 18 }}
                        >
                            Finish and publish
                        </Text>
                    </VStack>
                </HStack>
                <HStack justifyContent="space-between" pb={4}>
                    <VStack w="5%" px={2} space={1} >
                    </VStack>
                    <VStack w="95%" px={3} space={1}>
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec ipsum ac quam auctor dapibus at sed ante.
                        </Text>
                    </VStack>
                </HStack>
            </Box>

            <Box position="absolute" bottom={50} w="full" px={5}>
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
export default GetHousePage;