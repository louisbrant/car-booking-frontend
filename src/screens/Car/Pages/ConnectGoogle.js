import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, Modal } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT } from "../../../constants";

const ConnectGooglePage = ({ navigation }) => {

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
                        >Google</Text>
                    </View>
                </Stack>

            </Box>

            <Box w="full" px={5} py={3} pb={10}>
                <VStack space={2}>
                    <Box py={3}>
                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                            Connect your Google account to log in more easily, see mutual friends, automatically update your profile photo and more.
                        </Text>
                    </Box>
                    <Box>
                        <TouchableOpacity>
                            <Box
                                borderStyle="solid"
                                borderWidth={1}
                                borderColor={COLOR.inpBorderColor}
                                rounded={5}
                                py={3}
                            >
                                <HStack space={2} alignItems="center" justifyContent="center">
                                    <Image source={Images.Google} resizeMode="contain" alt="facebook" style={{ width: 20, height: 20 }} />
                                    <Text fontWeight="semibold" fontSize="xs">Google</Text>
                                </HStack>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                </VStack>
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
                            Save
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    )
}

export default ConnectGooglePage;