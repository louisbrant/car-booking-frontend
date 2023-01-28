import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"
import { LinearGradient } from 'expo-linear-gradient'

import { useSelector } from 'react-redux'

import * as ImagePicker from 'expo-image-picker';


import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";

import { BottomTab } from '../../../components';

const ProfilePage = ({ navigation }) => {

    const { user } = useSelector((store) => store.auth)

    const [imageInfor, setImageInfor] = useState({
        img: Images.Profile8,
        selected: false
    });

    const onShowProfile = () => {
        navigation.navigate("EditProfileScreen")
    }


    const getImages = (para) => {
        const array = [];
        const uri = para.uri;
        const name = uri.split("/").pop();
        const match = /\.(\w+)$/.exec(name);
        const type = match ? `image/${match[1]}` : `image`;
        array.push({
            uri, name, type
        });
        return array;
    }

    const onUpdateProfile = () => {
        if (imageInfor.selected) {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            if (typeof (imageInfor.img) === 'object') {
                const photos = getImages(imageInfor.img)
                for (let i = 0; i < photos.length; i++) {
                    formData.append("photo", photos[i]);
                }
            }
            formData.append("data", JSON.stringify({ email: user.email }));
            xhr.open("POST", `${ROOT.BACKEND_URL}users/insertProfileImage`);
            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    return navigation.navigate("ConfigurationScreen");
                }
            }

            xhr.send(formData);
        }
        else {
            return Toast.show({ title: "Select Car Image!", placement: 'bottom', status: 'error', w: 300 })
        }
    }
    const onUpload = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync
                ({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: false
                })
            if (!result.cancelled) {
                setImageInfor({
                    ...imageInfor,
                    img: result,
                    selected: true
                });
                console.log(user);
                // let newuser = user;
                // newuser.avatar = result;

            }
            else {
                return Toast.show({ title: "Upload error!", placement: 'bottom', status: 'error', w: 300 })
            }
        }
        catch (E) {
            // console.log(E)
            return Toast.show({ title: "Upload error!", placement: 'bottom', status: 'error', w: 300 })
        }
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
                        >My Profiles</Text>
                    </View>
                </Stack>

            </Box>
            <LinearGradient
                colors={['#ffa700', '#ff9300']}
            >

                <Box w="full" px={5} py={3} pb={10}>
                    <VStack justifyContent="center" alignItems="center">
                        <Box py={2}>
                            <TouchableOpacity onPress={onUpload}>
                                <Image source={user.Avatar == "" ? imageInfor.img : { uri: ROOT.IMAGE_URL + "users/" + user.avatar }} w="80px" resizeMode="contain" alt="car" rounded="full" />
                            </TouchableOpacity>
                        </Box>
                        <VStack justifyContent="center" alignItems="center">
                            <Text fontWeight="semibold" fontSize="md">{user.username}</Text>
                        </VStack>
                    </VStack>
                    <VStack mt={5} space={2}>
                        <VStack>
                            <TouchableOpacity onPress={() => navigation.navigate("PersonalScreen")}>
                                <HStack alignItems="center" space={2}>
                                    <Icon color={COLOR.black} size="xs" as={<Ionicons name="person-outline" />} />
                                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between" >
                                            <Text fontWeight="medium" fontSize="xs">Personal Information</Text>
                                            <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                            </TouchableOpacity>
                            <HStack alignItems="center" space={2}>
                                <Icon color={COLOR.black} size="xs" as={<Ionicons name="card-outline" />} />
                                <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                    <HStack alignItems="center" justifyContent="space-between" >
                                        <Text fontWeight="medium" fontSize="xs">Payments and Payouts</Text>
                                        <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                                    </HStack>
                                </Box>
                            </HStack>
                            <HStack alignItems="center" space={2}>
                                <Icon color={COLOR.black} size="xs" as={<MaterialIcons name="translate" />} />
                                <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                    <HStack alignItems="center" justifyContent="space-between" >
                                        <Text fontWeight="medium" fontSize="xs">Traslation</Text>
                                        <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                                    </HStack>
                                </Box>
                            </HStack>
                            <HStack alignItems="center" space={2}>
                                <Icon color={COLOR.black} size="xs" as={<MaterialIcons name="support-agent" />} />
                                <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                    <HStack alignItems="center" justifyContent="space-between" >
                                        <Text fontWeight="medium" fontSize="xs">Contact Support</Text>
                                        <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                                    </HStack>
                                </Box>
                            </HStack>
                            <HStack alignItems="center" space={2}>
                                <Icon color={COLOR.black} size="xs" as={<MaterialIcons name="lock-outline" />} />
                                <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                    <HStack alignItems="center" justifyContent="space-between" >
                                        <Text fontWeight="medium" fontSize="xs">Privacy and Sharing</Text>
                                        <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                                    </HStack>
                                </Box>
                            </HStack>
                            <HStack alignItems="center" space={2}>
                                <Icon color={COLOR.black} size="xs" as={<SimpleLineIcons name="logout" />} />
                                <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                    <HStack alignItems="center" justifyContent="space-between" >
                                        <Text fontWeight="medium" fontSize="xs">Logout</Text>
                                        <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                                    </HStack>
                                </Box>
                            </HStack>
                        </VStack>
                    </VStack>
                </Box>
            </LinearGradient>
            <BottomTab navigation={navigation} />

        </Box>
    )
}

export default ProfilePage;