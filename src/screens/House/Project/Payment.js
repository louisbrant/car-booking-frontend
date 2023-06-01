import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet } from "native-base";
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT } from "../../../constants";

import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')


const PaymentPage = ({ navigation }) => {

    const [currentcard, setCurrentCard] = useState("visa");
    console.log(currentcard);

    const onAddCard = () => {
        navigation.navigate("AddCardScreen")
    }



    return (
        <Box
            flex={1}
            bg={COLOR.white}
        // bg={{
        //     linearGradient: {
        //         colors: ['rgba(255, 255, 255, 0.2)', 'rgba(243, 243, 243, 0.2)'],
        //         start: [0, 0],
        //         end: [0, 1]
        //     }
        // }}
        >
            <Box
                px={5}
                pb={3}
                pt={5}
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
                        >Payment</Text>
                    </View>
                </Stack>
            </Box>

            <Box w="full" px={5} py={3} pb={10}>

                <VStack space={1}>
                    <TouchableOpacity onPress={() => { setCurrentCard("visa"); console.log("SSS") }}>
                        <Box
                            style={{
                                borderStyle: 'solid',
                                borderBottomWidth: 1,
                                borderColor: COLOR.inpBorderColor
                            }}
                            py={2}
                        >
                            <HStack justifyContent="space-between" alignItems="center">
                                <HStack alignItems="center" space={2}>
                                    <Image source={Images.Visa} resizeMode="contain" alt="car" />
                                    <VStack space={1}>
                                        <Text fontWeight="semibold" fontSize="md">Visa</Text>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="xs">Ending with **** 7180</Text>
                                    </VStack>
                                </HStack>
                                {(() => {
                                    if (currentcard == "visa")
                                        return (
                                            <Icon color={COLOR.green} size="md" as={<AntDesign name="checkcircle" />} />
                                        )
                                    else {
                                        return (
                                            <Icon color={'rgba(116, 116, 116, 0.2)'} size="md" as={<AntDesign name="checkcircle" />} />
                                        )
                                    }
                                })()}
                            </HStack>
                        </Box>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { setCurrentCard("maestro") }}>
                        <Box
                            style={{
                                borderStyle: 'solid',
                                borderBottomWidth: 1,
                                borderColor: COLOR.inpBorderColor
                            }}
                            py={2}
                        >
                            <HStack justifyContent="space-between" alignItems="center">
                                <HStack alignItems="center" space={2}>
                                    <Image source={Images.Maestro} resizeMode="contain" alt="car" />
                                    <VStack space={1}>
                                        <Text fontWeight="semibold" fontSize="md">Maestro</Text>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="xs">Ending with **** 7180</Text>
                                    </VStack>
                                </HStack>
                                {(() => {
                                    if (currentcard == "maestro")
                                        return (
                                            <Icon color={COLOR.green} size="md" as={<AntDesign name="checkcircle" />} />
                                        )
                                    else {
                                        return (
                                            <Icon color={'rgba(116, 116, 116, 0.2)'} size="md" as={<AntDesign name="checkcircle" />} />
                                        )
                                    }
                                })()}
                            </HStack>
                        </Box>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onAddCard}>
                        <Box py={2}>
                            <HStack alignItems="center" space={2}>
                                <Icon color={COLOR.IBase} size="md" as={<Ionicons name="add-circle" />} />
                                <Text color={COLOR.IBase} fontWeight="semibold" fontSize="md" textTransform="capitalize">Add new card</Text>
                            </HStack>
                        </Box>
                    </TouchableOpacity>
                </VStack>

            </Box>

            <Box position="absolute" bottom={35} w="full" px={5}>
                <VStack w="full" space={1} mb={20}>
                    <Text
                        color={COLOR.inPlaceholder}
                        fontWeight="medium"
                        fontSize="xs"
                    >
                        Location
                    </Text>
                    <Input
                        w="full"
                        InputLeftElement={
                            <Icon
                                as={<EvilIcons name="location" />}
                                size="sm"
                                ml="2"
                                color={COLOR.inIconColor}
                            />
                        }
                        bg={COLOR.white}
                        p={.5}
                        borderStyle="solid"
                        borderWidth={1}
                        borderColor={COLOR.inpBorderColor}
                        borderRadius={5}
                        fontSize="xs"
                        color={COLOR.black}
                        placeholder="Nowhere Street, New York"
                    />
                </VStack>

                <TouchableOpacity>
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
                            Next
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>

        </Box>
    )
}

export default PaymentPage;