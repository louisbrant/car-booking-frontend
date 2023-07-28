import React, { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { COLOR, Images, LAYOUT } from "../../constants";
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Ionicons } from "@expo/vector-icons"
import { Image, Input, Icon, Text, Box, Stack, HStack, Button, IconButton, useToast, View, Spinner, VStack, Checkbox } from "native-base";
// import {    GoogleSignin} from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useApi } from '../../redux/services'
import { setUserInfo } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux'

// import { GoogleSignIn } from 'expo-google-sign-in';
// import * as Facebook from 'expo-facebook';

const SignUpScreen = ({ navigation }) => {
    const Api = useApi()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const Toast = useToast()
    const dispatch = useDispatch()


    const onSignIn = async () => {
        navigation.navigate("SignInScreen");
    }

    const onSignUp = async () => {
        if (email == '') {
            return Toast.show({ title: 'Email is required!', placement: 'bottom', status: 'error', w: 300 })
        }
        if (password == '') {
            return Toast.show({ title: 'Password is required!', placement: 'bottom', status: 'error', w: 300 })
        }
        if (password != confirmpassword) {
            return Toast.show({ title: 'Password is not correct!', placement: 'bottom', status: 'error', w: 300 })
        }
        Api.SignUp({
            email,
            password
        }).then(({ data }) => {
            dispatch(setUserInfo({ email: email }));
            if (data.status) {
                navigation.navigate("ReceiveCodeScreen");
                return Toast.show({ title: "Please enter verify code!", placement: 'top', status: 'error', w: 300 })
            }
            else {
                return Toast.show({ title: data.message, placement: 'top', status: 'error', w: 300 })
            }
        }).catch(error => {
            console.log(error);
            if (error.response && error.response.status === 400) {
                return Toast.show({ title: error.response.data, placement: 'top', status: 'error', w: 300 })
            } else {
                return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 })
            }
        })
    }



    const onGoogleSignUp = async () => {
        console.log('AppleAuthentication=>', AppleAuthentication);
        const response = await AppleAuthentication.signInAsync({
            requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
        });
        console.log(response);
        // try {
        //     await GoogleSignIn.askForPlayServicesAsync()
        //     const { type, user } = await GoogleSignIn.signInAsync()
        //     if (type === 'success') {
        //         GoGoogleSignUp()
        //     }
        // } catch ({ message }) {
        //     console.log('login: Error:' + message)
        // }
    }

    const GoGoogleSignUp = async () => {
        // const user = await GoogleSignIn.signInSilentlyAsync();
        // if (user.email) {
        //     setEmail(user.email)
        //     Api.ThirdSignUp({
        //         email,
        //         password: ""
        //     }).then(({ data }) => {
        //         // console.log(data)
        //         if (data.status) {
        //             navigation.navigate("SignInScreen");
        //             return Toast.show({ title: "Success Sign Up", placement: 'top', status: 'error', w: 300 })
        //         }
        //         else {
        //             return Toast.show({ title: data.message, placement: 'top', status: 'error', w: 300 })
        //         }
        //     }).catch(error => {
        //         if (error.response && error.response.status === 400) {
        //             return Toast.show({ title: error.response.data, placement: 'top', status: 'error', w: 300 })
        //         } else {
        //             return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 })
        //         }
        //     })
        // }
        // else {
        //     return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 });
        // }
    };

    const onFacebookSignUp = async () => {
        // try {
        //     await Facebook.initializeAsync({
        //         appId: '1:106199221549:android:141149dba9400eda4abfa4',
        //     });
        //     const { type, token, expirationDate, permissions, declinedPermissions } =
        //         await Facebook.logInWithReadPermissionsAsync({
        //             permissions: ['public_profile'],
        //         });
        //     if (type === 'success') {
        //         // Get the user's name using Facebook's Graph API
        //         const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        //         const email = (await response.json()).email;
        //         setEmail(email);
        //         if (user.email)
        //             Api.ThirdSignUp({
        //                 email,
        //                 password: ""
        //             }).then(({ data }) => {
        //                 // console.log(data)
        //                 if (data.status) {
        //                     navigation.navigate("SignInScreen");
        //                     return Toast.show({ title: "Success Sign Up", placement: 'top', status: 'error', w: 300 })
        //                 }
        //                 else {
        //                     return Toast.show({ title: data.message, placement: 'top', status: 'error', w: 300 })
        //                 }
        //             }).catch(error => {
        //                 if (error.response && error.response.status === 400) {
        //                     return Toast.show({ title: error.response.data, placement: 'top', status: 'error', w: 300 })
        //                 } else {
        //                     return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 })
        //                 }
        //             })
        //         else {
        //             return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 });
        //         }
        //     } else {
        //         return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 });
        //     }
        // } catch ({ message }) {
        //     alert(`Facebook Login Error: ${message}`);
        // }
    }

    return (
        <Box
            flex={1}
            bg={{
                linearGradient: {
                    colors: ['#FFFFFF', '#F3F3F3'],
                    start: [0, 1],
                    end: [0, 0]
                }
            }}
        >
            <Box py={10} px={5}>
                <VStack space={1} mt={5}>
                    <Text fontWeight="semibold" fontSize="sm">Hi, Welcome Back 👋</Text>
                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Hello again, you've been missed!</Text>
                </VStack>
                <Box mt={5}>
                    <VStack space={2}>
                        <VStack w="full" space={1}>
                            <Text
                                color={COLOR.black}
                                fontWeight="semibold"
                                fontSize="xs"
                            >
                                Email
                            </Text>
                            <Input
                                value={email}
                                onChangeText={setEmail}
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
                                placeholder="Email"
                            />
                        </VStack>
                        <VStack w="full" space={1}>
                            <Text
                                color={COLOR.black}
                                fontWeight="semibold"
                                fontSize="xs"
                            >
                                Password
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
                        </VStack>
                        <VStack w="full" space={1}>
                            <Text
                                color={COLOR.black}
                                fontWeight="semibold"
                                fontSize="xs"
                            >
                                Confirm Password
                            </Text>
                            <Input
                                type="password"
                                value={confirmpassword}
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
                                placeholder="Password"
                            />
                        </VStack>
                    </VStack>
                    <Box mt={7}>
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
                                py={2}
                                onTouchStart={onSignUp}
                            >
                                <Text
                                    color={COLOR.white}
                                    fontWeight="bold"
                                    fontSize="md"
                                >
                                    Sign Up
                                </Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>

                    <HStack mt={7} justifyContent="space-between" alignItems="center">
                        <Box borderStyle="solid" borderWidth={0.5} borderColor={COLOR.inpBorderColor} flex={1} h={0} />
                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs" px={3}>or login with</Text>
                        <Box borderStyle="solid" borderWidth={0.5} borderColor={COLOR.inpBorderColor} h={0} flex={1} />
                    </HStack>

                    <HStack mt={5} justifyContent="space-between">
                        <Box w="30%">
                            {/* <AppleAuthentication.AppleAuthenticationButton
                                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                                cornerRadius={5}
                                style={{ width: 250, height: 50 }}
                                onPress={async () => {
                                    try {
                                        const credential = await AppleAuthentication.signInAsync({
                                            requestedScopes: [
                                                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                                AppleAuthentication.AppleAuthenticationScope.EMAIL,
                                            ],
                                        });
                                        // signed in
                                    } catch (e) {
                                        if (e.code === 'ERR_REQUEST_CANCELED') {
                                            // handle that the user canceled the sign-in flow
                                        } else {
                                            // handle other errors
                                        }
                                    }
                                }}
                            /> */}
                        </Box>
                        <Box w="30%">
                            <TouchableOpacity onPress={onFacebookSignUp}>
                                <Box
                                    borderStyle="solid"
                                    borderWidth={1}
                                    borderColor={COLOR.inpBorderColor}
                                    rounded={5}
                                    py={2}
                                >
                                    <HStack space={2} alignItems="center" justifyContent="center">
                                        <Image source={Images.Facebook} alt="facebook" style={{ width: 20, height: 20 }} />
                                        <Text fontWeight="semibold" fontSize="xs">Facebook</Text>
                                    </HStack>
                                </Box>
                            </TouchableOpacity>
                        </Box>
                        <Box w="30%">
                            <TouchableOpacity onPress={onGoogleSignUp}>
                                <Box
                                    borderStyle="solid"
                                    borderWidth={1}
                                    borderColor={COLOR.inpBorderColor}
                                    rounded={5}
                                    py={2}
                                >
                                    <HStack space={2} alignItems="center" justifyContent="center">
                                        <Image source={Images.Google} alt="facebook" style={{ width: 20, height: 20 }} />
                                        <Text fontWeight="semibold" fontSize="xs">Google</Text>
                                    </HStack>
                                </Box>
                            </TouchableOpacity>
                        </Box>
                    </HStack>



                </Box>
            </Box>

            <Box position="absolute" bottom={30} w="full" px={5}>
                <VStack justifyContent="center" alignItems="center" space={1}>
                    <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs">Don't have an account?</Text>
                    <TouchableOpacity onPress={onSignIn}>
                        <Text color={COLOR.IBase} fontWeight="semibold" fontSize="xs" underline>
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </VStack>
            </Box>
        </Box>
    );
};
export default SignUpScreen;