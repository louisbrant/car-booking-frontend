import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, Modal, useToast } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"
import { useDispatch } from 'react-redux'

import { COLOR, Images, LAYOUT } from "../../../constants";
import { useApi } from '../../../redux/services'
import { setUserInfo } from '../../../redux/actions/authActions';

import { BottomTab } from '../../../components';

const ForgotPassPage = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast()
    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false);
    const [userinfor, setUserInfor] = useState('')

    const onForgotpassSubmit = () => {
        Api.ForgotPass({
            userinfor
        }).then(({ data }) => {
            if (data.status) {
                dispatch(setUserInfo({ email: userinfor }));
                navigation.navigate("ResetPassScreen")
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
                pt={10}
                w="full"
            >
                <Stack direction="row" alignItems="center">
                    <Image source={Images.ForgotPass} h={300} resizeMode="contain" alt="car" />
                </Stack>

                <VStack space={1}>
                    <Text color={COLOR.black} fontWeight="semibold" fontSize="xl">Forgot password?</Text>
                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                        Don't worry! It happens. Please enter the address associated with your account.
                    </Text>
                </VStack>

                <VStack space={1} mt={3}>
                    <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">
                        Email/Mobile Number
                    </Text>
                    <Input
                        w="full"
                        h="45"
                        bg={COLOR.white}
                        pl={3}
                        onChangeText={setUserInfor}
                        borderStyle="solid"
                        borderWidth={1}
                        borderColor={COLOR.inpBorderColor}
                        borderRadius={5}

                        fontWeight="medium"
                        fontSize="xs"
                        color={COLOR.black}
                        placeholder="Email"
                    />
                </VStack>
            </Box>
            <Box position="absolute" bottom={35} w="full" px={5}>
                <TouchableOpacity onPress={onForgotpassSubmit}>
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

export default ForgotPassPage;