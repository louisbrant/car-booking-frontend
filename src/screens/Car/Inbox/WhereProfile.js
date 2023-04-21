import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT } from "../../../constants";

import { BottomTab } from '../../../components';

const WhereProfilePage = ({ navigation }) => {

    const onShowProfile = () => {
        navigation.navigate("EditProfileScreen")
    }

    return (
        <Box flex={1}>
            <Box
                px={5}
                pb={3}
                mb={5}
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
                        >Where you've been</Text>
                    </View>
                </Stack>

            </Box>

            <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                <Box w="full" px={5} py={3} pb={10}>
                    <VStack space={3}>
                        {new Array(7).fill().map((item, idx) => {
                            return (
                                <TouchableOpacity key={idx}>
                                    <HStack space={2}>
                                        <Image source={idx > 0 ? Images.Wh2 : Images.Wh1} rounded="5" w="58px" h="58px" bg={"white"} resizeMode="cover" opacity={0.8} alt="car" />

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
            </ScrollView>

            <BottomTab navigation={navigation} />
        </Box>
    )
}

export default WhereProfilePage;