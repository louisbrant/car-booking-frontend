import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, Modal, useToast } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"
import { useDispatch, useSelector } from 'react-redux'

import { useApi } from '../../../redux/services'
import { setUserInfo } from '../../../redux/actions/authActions';
import { COLOR, Images, LAYOUT } from "../../../constants";

import { BottomTab } from '../../../components';

const ResetPassPage = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast()
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const onResetPassword = () => {
        if (password == '')
            return Toast.show({ title: 'Password is required!', placement: 'bottom', status: 'error', w: 300 })
        if (password != confirmpassword)
            return Toast.show({ title: 'Password is not correct!', placement: 'bottom', status: 'error', w: 300 })
        else {
            dispatch(setUserInfo({ password: password, email: user.email }));
            navigation.navigate("SendCodeScreen");
        }
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
                    <Image source={Images.ResetPass} h={280} resizeMode="contain" alt="car" />
                </Stack>

                <VStack space={1}>
                    <Text color={COLOR.black} fontWeight="semibold" fontSize="xl">Reset Password</Text>
                </VStack>

                <VStack space={1} mt={3}>
                    <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">
                        New Password
                    </Text>
                    <Input
                        type='password'
                        onChangeText={setPassword}
                        w="full"
                        h="45"
                        bg={COLOR.white}
                        pl={3}

                        borderStyle="solid"
                        borderWidth={1}
                        borderColor={COLOR.inpBorderColor}
                        borderRadius={5}

                        fontWeight="medium"
                        fontSize="xs"
                        color={COLOR.black}
                        placeholder="New Password"
                    />
                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize={9}>
                        Your password must include at least 8 character
                    </Text>
                </VStack>
                <VStack space={1} mt={2}>
                    <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">
                        Re-enter New Password
                    </Text>
                    <Input
                        type='password'
                        onChangeText={setConfirmPassword}
                        w="full"
                        h="45"
                        bg={COLOR.white}
                        pl={3}

                        borderStyle="solid"
                        borderWidth={1}
                        borderColor={COLOR.inpBorderColor}
                        borderRadius={5}

                        fontWeight="medium"
                        fontSize="xs"
                        color={COLOR.black}
                        placeholder="Re-enter New Password"
                    />
                </VStack>

            </Box>
            <Box position="absolute" bottom={35} w="full" px={5}>
                <TouchableOpacity onPress={onResetPassword}>
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

export default ResetPassPage;