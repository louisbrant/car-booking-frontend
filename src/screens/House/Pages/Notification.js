import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, Modal, Switch } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT } from "../../../constants";
import { BottomTab } from '../../../components';

const NotificationPage = ({ navigation }) => {

    return (
        <Box flex={1}>
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
                        >Notification</Text>
                    </View>
                </Stack>

            </Box>

            <Box w="full" py={3} pb={1}>
                <Box bg={"white"} px={5} py={2}>
                    <VStack space={2}>
                        <VStack>
                            <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">
                                MOBILE NOTIFICATION
                            </Text>
                            <Box borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                                <HStack justifyContent="space-between" alignItems="center">
                                    <Text color={COLOR.black} fontWeight="medium" fontSize="sm">
                                        Enable text message notification
                                    </Text>
                                    <Switch size="sm" defaultIsChecked={false} colorScheme="emerald" />
                                </HStack>
                            </Box>
                        </VStack>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text color={COLOR.black} fontWeight="medium" fontSize="sm">
                                Push Notification
                            </Text>
                            <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                        </HStack>
                    </VStack>
                </Box>
            </Box>

            <Box bg={"white"} flex={1} px={5} py={2}>
                <VStack>
                    <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">
                        EMAIL NOTIFICATION
                    </Text>
                    <Box>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Text color={COLOR.black} fontWeight="medium" fontSize="sm">
                                Promotions and announcements
                            </Text>
                            <Switch size="sm" defaultIsChecked={true} colorScheme="emerald" />
                        </HStack>
                    </Box>
                </VStack>
            </Box>

            <BottomTab navigation={navigation} />
        </Box>
    )
}

export default NotificationPage;