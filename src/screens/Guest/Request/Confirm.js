import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT } from "../../../constants";

import { BottomTab } from '../../../components';

const ConfirmPage = ({ navigation }) => {

    const onShowProfile = () => {
        navigation.navigate("EditProfileScreen")
    }

    const onShowPayment = () => {
        navigation.navigate("MyPaymentScreen")
    }

    return (
        <Box flex={1}>
            <Box
                px={5}
                pb={3}
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
                        >Confirm and Pay</Text>
                    </View>
                </Stack>

            </Box>

            <Box w="full" px={5} py={3} pb={10}>
                <Box py={2}>
                    <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">PRICE DETAILS</Text>
                    <VStack mt={2} space={1}>
                        <HStack justifyContent="space-between">
                            <Text fontWeight="medium" fontSize="xs">$100/DAY X 3 Days</Text>
                            <Text fontWeight="medium" fontSize="xs">$300.00</Text>
                        </HStack>
                        <HStack justifyContent="space-between">
                            <Text fontWeight="medium" fontSize="xs">Service fees</Text>
                            <Text fontWeight="medium" fontSize="xs">$10.00</Text>
                        </HStack>
                        <HStack justifyContent="space-between">
                            <Text fontWeight="medium" fontSize="xs">Total</Text>
                            <Text fontWeight="medium" fontSize="xs">$310.00</Text>
                        </HStack>
                    </VStack>
                </Box>
                <Box py={2} mt={3}>
                    <VStack space={2}>
                        <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">PAY WITH</Text>
                        <HStack justifyContent="space-between" alignItems="center">
                            <HStack alignItems="center" space={2}>
                                <Image source={Images.Visa} w="24px" resizeMode="contain" alt="visa" />
                                <Text fontWeight="medium" fontSize="xs">**** 1234</Text>
                            </HStack>

                            <TouchableOpacity onPress={onShowPayment}>
                                <Text color={COLOR.IBasePlaceholder} fontWeight="semibold" fontSize="xs">Edit</Text>
                            </TouchableOpacity>
                        </HStack>
                        <Text color={COLOR.IBasePlaceholder} fontWeight="semibold" fontSize="xs">Enter a coupon</Text>
                    </VStack>
                </Box>
                <Box py={2} mt={3}>
                    <VStack space={2}>
                        <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">Cancellation Policy</Text>
                        <Text fontWeight="semibold" fontSize="xs">
                            Lorem ipsum dolor sit amet, consectetur adipis cing elit. Praesent interdum aliquet tincidunt. Morbi sed molestie orci.
                        </Text>
                    </VStack>
                </Box>
                <Box py={2} mt={3}>
                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                        Lorem ipsum dolor sit amet, consectetur adipis cing elit.
                        Praesent interdum aliquet tincidunt. sed molestie orci.
                    </Text>
                </Box>
            </Box>

            <Box position="absolute" bottom={35} w="full" px={5}>

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
                            Confirm and Pay
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>

        </Box>
    )
}

export default ConfirmPage;