import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, Modal,useToast } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT } from "../../../constants";
import { setNavigator, useApi } from '../../../redux/services'

import { BottomTab } from '../../../components';
import { useSelector } from 'react-redux'

const ChangePassPage = ({ navigation }) => {

    const [currentpassword, setCTPass] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setCFPass] = useState('')
    const [showModal, setShowModal] = useState(false);
    const Toast = useToast()
    const Api = useApi()
    const { user } = useSelector((store) => store.auth);


    const onShowProfile = () => {
        navigation.navigate("EditProfileScreen")
    }
    const onChangePass = ()=>{
        if (currentpassword && password && confirmpassword) {
            if (password === confirmpassword) {
                Api.ResetPassword({ email: user.email, password, old: confirmpassword }).then(({ data }) => {
                    if (data.status) {
                        setShowModal(true);
                    } else {
                        return Toast.show({ title: data.msg, placement: 'bottom', status: 'error' , w: 300 })
                    }
                })
            } else {
                return Toast.show({ title: "ConfirmPassword is incorrect!", placement: 'bottom', status: 'error' , w: 300 })
            }
        } else {
            return Toast.show({ title: "Something is incorrect!", placement: 'bottom', status: 'error', w: 300  })
        }
    }
    const onForgotPass =()=>{
        navigation.navigate("ForgotPassScreen");
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
                        >Change Password</Text>
                    </View>
                </Stack>

            </Box>

            <Box w="full" px={5} py={3} pb={10}>
                <VStack space={2}>
                    <VStack w="full" space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="semibold"
                            fontSize="xs"
                        >
                            Current Password
                        </Text>
                        <Input
                            type="password"
                            value={currentpassword}
                            onChangeText={setCTPass}
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
                            placeholder="Password"
                        />
                    </VStack>
                    <VStack w="full" space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="semibold"
                            fontSize="xs"
                        >
                            New Password
                        </Text>
                        <Input
                            type="password"
                            value={password}
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
                            placeholder="Password"
                        />
                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="9">
                            Your password must include at least 8 character
                        </Text>
                    </VStack>
                    <VStack w="full" space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="semibold"
                            fontSize="xs"
                        >
                            Re-enter New Password
                        </Text>
                        <Input
                            type="password"
                            value={confirmpassword}
                            onChangeText={setCFPass}
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
                            placeholder="Password"
                        />
                        <Text color={COLOR.green} fontWeight="medium" fontSize="9">
                            Password matches!
                        </Text>
                    </VStack>
                </VStack>
            </Box>

            <Box position="absolute" bottom={30} w="full" px={5}>
                <VStack space={2}>
                    <TouchableOpacity onPress={onChangePass}>
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
                                Change
                            </Text>
                        </Box>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onForgotPass}>
                        <HStack justifyContent="center">
                            <Text color={COLOR.IBase} fontWeight="bold" fontSize="md">Forgot password?</Text>
                        </HStack>
                    </TouchableOpacity>
                </VStack>
            </Box>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }}
            >
                <Modal.Content
                    style={{
                        backgroundColor: 'rgba(30, 30, 30, 0.75)',
                        borderRadius: 14,
                    }}
                >
                    <Modal.Body
                        style={{
                            backgroundColor: 'rgba(30, 30, 30, 0.75)',
                        }}
                    >
                        <VStack justifyContent="center" alignItems="center" space={2}>
                            <Text color={COLOR.white} fontWeight="semibold" fontSize={15}>Link sent!</Text>
                            <Text color={COLOR.white} fontWeight="normal" fontSize={11} textAlign="center">
                                We've sent you an email with instructions to reset your password. It may take a minute or two to arrive.
                            </Text>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer
                        style={{
                            backgroundColor: 'rgba(30, 30, 30, 0.75)',
                            borderColor: 'rgba(84, 84, 88, 0.65)',
                            borderStyle: 'solid',
                            borderTopWidth: 0.5
                        }}
                    >
                        <HStack justifyContent="center" alignItems="center" flex={1}>
                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <Text color={'#0A84FF'} fontWeight="semibold" fontSize={15}>
                                    OK
                                </Text>
                            </TouchableOpacity>
                        </HStack>
                    </Modal.Footer>

                </Modal.Content>
            </Modal>

        </Box>
    )
}

export default ChangePassPage;