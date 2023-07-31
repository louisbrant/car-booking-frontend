import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT } from "../../../constants";

import { BottomTab, CenterModal } from '../../../components';
import { useSelector, useDispatch } from 'react-redux'
import { setUserInfo } from '../../../redux/actions/authActions';

const InfoPage = ({ navigation }) => {

    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch()
    const [closeModal, setCloseModal] = useState(false);

    const onShowProfile = () => {
        navigation.navigate("EditProfileScreen")
    }

    const oncloseAccount = () => {
        setCloseModal(true);
    }

    const closeAccount = () => {
        dispatch(setUserInfo(""));
        navigation.navigate("SignInScreen");
    }


    useEffect(() => {

    }, []);

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
                        >Personal Information</Text>
                    </View>
                </Stack>

            </Box>

            <Box w="full" px={5} py={3} pb={10}>
                <VStack mt={3}>
                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                        <VStack space={1}>
                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Email</Text>
                            <HStack justifyContent="space-between" alignItems="center">
                                <Text fontWeight="semibold" fontSize="xs">{user?.email}</Text>
                                <Text color={COLOR.green} fontWeight="semibold" fontSize={9}>verified</Text>
                            </HStack>
                        </VStack>
                    </Box>
                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                        <VStack space={1}>
                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Mobile Number</Text>
                            <HStack justifyContent="space-between" alignItems="center">
                                {
                                    user?.phone ?
                                        <Text fontWeight="semibold" fontSize="xs">{user?.phone}</Text> : <Text fontWeight="semibold" fontSize="xs">none</Text>
                                }
                                {
                                    user?.phone ?
                                        <Text color={COLOR.IRed} fontWeight="semibold" fontSize={9}>Not verified</Text> : <Text fontWeight="semibold" fontSize="xs"></Text>
                                }

                            </HStack>
                        </VStack>
                    </Box>
                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                        <VStack space={1}>
                            <HStack justifyContent="space-between" alignItems="center">
                                <Text fontWeight="semibold" fontSize="sm">Facebook</Text>
                                <HStack space={2} alignItems="center">
                                    {
                                        user?.facebook ?
                                            <Text fontWeight="semibold" fontSize={9}>Connected</Text> : <Text fontWeight="semibold" fontSize={9}>Not Connected</Text>
                                    }
                                    <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                                </HStack>
                            </HStack>
                        </VStack>
                    </Box>
                    <Box py={2}>
                        <VStack space={1}>
                            <HStack justifyContent="space-between" alignItems="center">
                                <Text fontWeight="semibold" fontSize="sm">Google</Text>
                                <HStack space={2} alignItems="center">
                                    {
                                        user?.google ?
                                            <Text fontWeight="semibold" fontSize={9}>Connected</Text> : <Text fontWeight="semibold" fontSize={9}>Not Connected</Text>
                                    }
                                    <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                                </HStack>
                            </HStack>
                        </VStack>
                    </Box>
                </VStack>
            </Box>

            <Box position="absolute" bottom={125} w="full">
                <TouchableOpacity onPress={oncloseAccount}>
                    <HStack flex={1} justifyContent="center" alignItems="center">
                        <Text color={COLOR.red} fontWeight="semibold" fontSize="md">Close my account</Text>
                    </HStack>
                </TouchableOpacity>
            </Box>

            <BottomTab navigation={navigation} />
            < CenterModal isOpen={closeModal} setIsOpen={setCloseModal} OK={closeAccount} Cancel={() => { setCloseModal(false) }} content={{ title: "Are you sure you want to close?", ok: "Yes", cancel: "Cancel" }} />

        </Box>
    )
}

export default InfoPage;