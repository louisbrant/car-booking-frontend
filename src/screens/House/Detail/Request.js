import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet } from "native-base";
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT } from "../../../constants";


const Request = ({ navigation }) => {
    return (
        <Box
            flex={1}
        // bg={COLOR.white}
        // bg={{
        //     linearGradient: {
        //         colors: ['#FFFFFF', '#F3F3F3'],
        //         start: [0, 0],
        //         end: [0, 1]
        //     }
        // }}
        >
            <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                <Box
                    pt={10}
                    pb={3}
                    px={5}
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
                            >Request to Book</Text>
                        </View>
                    </Stack>
                </Box>

                <Box
                    py={3}
                    mx={5}
                    style={{
                        borderStyle: 'solid',
                        borderBottomWidth: 1,
                        borderColor: COLOR.inpBorderColor
                    }}
                >
                    <HStack justifyContent="space-between">
                        <VStack space={1}>
                            <Text color={COLOR.IBase} fontWeight="bold" fontSize="sm">$100/day</Text>
                            <Text color={COLOR.black} fontWeight="semibold" fontSize="sm">Lamborghini Urus 2022</Text>
                            <HStack space={2} style={{ alignItems: 'center' }}>
                                <FontAwesome name="star" size={14} color={COLOR.yellow} />
                                <HStack space={1}>
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="semibold"
                                        fontSize="xs"
                                    >5.0</Text>
                                    <Text
                                        color={COLOR.inPlaceholder}
                                        fontWeight="semibold"
                                        fontSize="xs"
                                    >(24.2k)</Text>
                                </HStack>
                            </HStack>
                        </VStack>
                        <Box
                            borderRadius={5}
                            bg={COLOR.white}
                            w={140}
                            h={75}
                        >
                            <Image source={Images.Car1} resizeMode="contain" style={{ width: '100%', height: '100%' }} alt="car" />
                        </Box>
                    </HStack>
                </Box>

                <VStack py={3} px={5} space={2}>
                    <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs">YOUR TRIP</Text>
                    <Box
                        p={3}
                        style={{
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderColor: COLOR.inpBorderColor,
                            borderRadius: 5,
                        }}
                    >
                        <HStack alignItems="center" justifyContent="space-between">
                            <VStack>
                                <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">Nowhere Airport</Text>
                                <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                                    Sat, 11 Jun 22, 10:00
                                </Text>
                            </VStack>
                            <Icon color={COLOR.inIconColor} size="xs" as={<AntDesign name="right" />} />
                            <VStack>
                                <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">Gatewick Airport</Text>
                                <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                                    Sat, 11 Jun 22, 10:00
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                </VStack>

                <Box
                    py={3}
                    mx={5}
                    style={{
                        borderStyle: 'solid',
                        borderBottomWidth: 1,
                        borderColor: COLOR.inpBorderColor
                    }}
                >
                    <VStack space={2}>
                        <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs">PRICE DETAILS</Text>
                        <VStack space={1}>
                            <HStack justifyContent="space-between" alignItems="center">
                                <Text fontWeight="medium" fontSize="xs">$100/DAY X 3 Days</Text>
                                <Text fontWeight="medium" fontSize="xs">$300.00</Text>
                            </HStack>
                            <HStack justifyContent="space-between" alignItems="center">
                                <Text fontWeight="medium" fontSize="xs">Service fees</Text>
                                <Text fontWeight="medium" fontSize="xs">$10.00</Text>
                            </HStack>
                            <HStack justifyContent="space-between" alignItems="center">
                                <Text fontWeight="medium" fontSize="xs">Total</Text>
                                <Text fontWeight="medium" fontSize="xs">$310.00</Text>
                            </HStack>
                        </VStack>
                    </VStack>
                </Box>

                <Box
                    py={3}
                    mx={5}
                    style={{
                        borderStyle: 'solid',
                        borderBottomWidth: 1,
                        borderColor: COLOR.inpBorderColor
                    }}
                >
                    <VStack space={2}>
                        <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs">PAY WITH</Text>
                        <VStack space={1}>
                            <HStack justifyContent="space-between">
                                <Text fontWeight="medium" fontSize="xs">Credit or Debit card or Apple Pay</Text>
                                <TouchableOpacity>
                                    <Text color={COLOR.IBasePlaceholder} fontWeight="semibold" fontSize="xs">Edit</Text>
                                </TouchableOpacity>
                            </HStack>
                            <HStack>
                                <TouchableOpacity>
                                    <Text color={COLOR.IBasePlaceholder} fontWeight="semibold" fontSize="xs">Enter a coupon</Text>
                                </TouchableOpacity>
                            </HStack>
                        </VStack>
                    </VStack>
                </Box>

                <VStack py={3} px={5} space={2}>
                    <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">requirements</Text>
                    <VStack space={1}>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.IBase} size="xs" as={<Ionicons name="checkbox" />} />
                            <Text fontWeight="semibold" fontSize="xs">Valid ID and Insurance</Text>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.IBase} size="xs" as={<Ionicons name="checkbox" />} />
                            <Text fontWeight="semibold" fontSize="xs">2k refundable hold</Text>
                        </HStack>
                    </VStack>
                </VStack>

                <VStack px={5} pt={5} pb={10} justifyContent="center" alignItems="center" space={2}>
                    <HStack space={1} alignItems="center" justifyContent="center">
                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">By selecting the button below, I agree to the</Text>
                        <Text fontWeight="medium" fontSize="2xs">Rules</Text>
                    </HStack>
                    <Box w="full">
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
                                // mt={5}
                                py={2}
                            >
                                <Text
                                    color={COLOR.white}
                                    fontWeight="bold"
                                    fontSize="md"
                                >
                                    Request to Book
                                </Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                </VStack>

            </ScrollView>

        </Box>
    )
}

export default Request;