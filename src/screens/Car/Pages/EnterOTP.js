import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, Modal, useToast } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"

import { useDispatch, useSelector } from 'react-redux'

import { useApi } from '../../../redux/services'
import { COLOR, Images, LAYOUT } from "../../../constants";

import { BottomTab } from '../../../components';

const EnterOTPPage = ({ navigation }) => {

    const [showModal, setShowModal] = useState(false);

    const Api = useApi()
    const Toast = useToast()
    const dispatch = useDispatch()
    const [stotp, setStOtp] = useState('');
    const [ndotp, setNdOtp] = useState('');
    const [rdotp, setRdOtp] = useState('');
    const [rthotp, setRthOtp] = useState('');
    const { user } = useSelector((store) => store.auth);

    const onOTPSubmit = () => {
        const otpCode = stotp + ndotp + rdotp + rthotp;
        Api.ResetPassword({
            email: user.email,
            password: user.password,
            otpCode
        }).then(({ data }) => {
            if (data.status) {
                Toast.show({ title: "Reset Password!", placement: 'bottom', status: 'success', w: 300 })
                navigation.navigate("SignInScreen")
            }
            else {
                return Toast.show({ title: data.message, placement: 'bottom', status: 'error', w: 300 })
            }
        }).catch(error => {
            console.log(error);
            if (error.response && error.response.status === 400) {
                return Toast.show({ title: error.response.data, placement: 'bottom', status: 'error', w: 300 })
            } else {
                return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 })

            }
        })
    }

    return (
        <Box flex={1} bg={COLOR.white}>
            <Box
                px={5}
                pb={3}
                pt={5}
                w="full"
            >
                <Stack direction="row" alignItems="center">
                    <Image source={Images.EnterOTP} h={280} resizeMode="contain" alt="car" />
                </Stack>

                <VStack space={1}>
                    <Text color={COLOR.black} fontWeight="semibold" fontSize="xl">
                        Enter OTP
                    </Text>
                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                        A 4 digit code has been sent to +91 123*****34
                    </Text>
                </VStack>

                <HStack mt={5} justifyContent="space-between">
                    <HStack w="48%" justifyContent="space-between">
                        <Box w="46%">
                            <Input
                                onChangeText={setStOtp}
                                w="65"
                                h="65"
                                bg={COLOR.inpBorderColor}
                                pl={3}

                                borderRadius={8}
                                textAlign="center"

                                fontWeight="semibold"
                                fontSize="xl"
                                color={COLOR.black}
                            />
                        </Box>
                        <Box w="46%">
                            <Input
                                onChangeText={setNdOtp}
                                w="65"
                                h="65"
                                bg={COLOR.inpBorderColor}
                                pl={3}

                                borderRadius={8}
                                // opacity={0.35}
                                textAlign="center"

                                fontWeight="semibold"
                                fontSize="xl"
                                color={COLOR.black}
                            />
                        </Box>
                    </HStack>
                    <HStack w="48%" justifyContent="space-between">
                        <Box w="46%">
                            <Input
                                onChangeText={setRdOtp}
                                w="65"
                                h="65"
                                bg={COLOR.inpBorderColor}
                                pl={3}

                                borderRadius={8}
                                // opacity={0.35}
                                textAlign="center"

                                fontWeight="semibold"
                                fontSize="xl"
                                color={COLOR.black}
                            />
                        </Box>
                        <Box w="46%">
                            <Input
                                onChangeText={setRthOtp}
                                w="65"
                                h="65"
                                bg={COLOR.inpBorderColor}
                                pl={3}

                                borderRadius={8}
                                // opacity={0.35}
                                textAlign="center"

                                fontWeight="semibold"
                                fontSize="xl"
                                color={COLOR.black}
                            />
                        </Box>
                    </HStack>
                </HStack>


            </Box>
            <Box position="absolute" bottom={35} w="full" px={5}>
                <TouchableOpacity onPress={onOTPSubmit}>
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
                            Submit
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    )
}

export default EnterOTPPage;