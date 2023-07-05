import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useToast, useColorModeValue, Select, CheckIcon } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";

import { setUserInfo } from '../../../redux/actions/authActions';

import { BottomTab } from '../../../components';

const EditProfilePage = ({ navigation }) => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch()
    const Toast = useToast()

    const [sex, setSex] = useState(user.gender == undefined ? 0 : user.gender.toString());
    console.log(user, 'sex=>', sex)

    const [firstname, setFirstName] = useState(user.username.toString().split(" ")[0] != undefined && user.username.toString().split(" ")[0] != "" ? user.username.split(" ")[0] : "");

    const [secondname, setSecondName] = useState(user.username.toString().split(" ")[1] != undefined && user.username.toString().split(" ")[1] != "" ? user.username.split(" ")[1] : "");

    const onShowProfile = () => {
        navigation.navigate("PersonalScreen")
    }

    const getImages = (para) => {
        const array = [];
        const uri = para;
        const name = uri.split("/").pop();
        const match = /\.(\w+)$/.exec(name);
        const type = match ? `image/${match[1]}` : `image`;
        array.push({
            uri, name, type
        });
        return array;
    }

    const onEdit = async () => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        let avatarImage = await AsyncStorage.getItem('avatarImage');
        console.log('avatarImage46', avatarImage);
        if (avatarImage) {
            if (typeof (avatarImage) === 'string') {
                const photos = getImages(avatarImage)
                for (let i = 0; i < photos.length; i++) {
                    console.log('photos=>', photos[i]);
                    formData.append("photo", photos[i]);
                }
            }
        }
        formData.append("data", JSON.stringify({ email: user.email, username: firstname + " " + secondname, gender: sex }));
        xhr.open("POST", `${ROOT.BACKEND_URL}users/updateUser`);
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.onload = function () {
            if (xhr.status === 200) {
                let updatedUser = JSON.parse(xhr?.response);
                console.log('updatedUser=>', updatedUser);
                dispatch(setUserInfo(updatedUser));
                Toast.show({ title: "Successfully Updated!", placement: 'bottom', status: 'success', w: 300 })
            }
            else {
                return Toast.show({ title: "Personal Info Faild!", placement: 'bottom', status: 'error', w: 300 })
            }
        }
        xhr.send(formData);
    }

    const saveProfile = () => {
        onEdit();
    }

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
                <Stack direction="row" alignItems="center" justifyContent="space-between">

                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon color={COLOR.black} size="md" as={<Ionicons name="arrow-back" />} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text
                            onPress={onShowProfile}
                            color={COLOR.black}
                            fontWeight="semibold"
                            fontSize="md"
                        >Edit Personal Info</Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={onEdit}>
                            <Text color={COLOR.IBase} fontWeight="medium" fontSize="xs">Edit</Text>
                        </TouchableOpacity>
                    </View>

                </Stack>

            </Box>

            <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                <Box w="full" px={5} py={3} pb={10}>
                    <Box pt={2} pb={3} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                        <VStack space={3}>
                            <VStack w="full" space={1}>
                                <Text
                                    color={COLOR.inPlaceholder}
                                    fontWeight="medium"
                                    fontSize="xs"
                                >
                                    First Name
                                </Text>
                                <Input
                                    value={firstname}
                                    w="full"
                                    h="35"
                                    bg={COLOR.white}
                                    pl={3}
                                    onChangeText={setFirstName}

                                    borderStyle="solid"
                                    borderWidth={1}
                                    borderColor={COLOR.inpBorderColor}
                                    borderRadius={5}

                                    fontSize="xs"
                                    color={COLOR.black}
                                    placeholder="First Name"
                                />
                            </VStack>
                            <VStack w="full" space={1}>
                                <Text
                                    color={COLOR.inPlaceholder}
                                    fontWeight="medium"
                                    fontSize="xs"
                                >
                                    Last Name
                                </Text>
                                <Input
                                    value={secondname}
                                    w="full"
                                    h="35"
                                    bg={COLOR.white}
                                    pl={3}
                                    onChangeText={setSecondName}

                                    borderStyle="solid"
                                    borderWidth={1}
                                    borderColor={COLOR.inpBorderColor}
                                    borderRadius={5}

                                    fontSize="xs"
                                    color={COLOR.black}
                                    placeholder="Second Name"
                                />
                            </VStack>
                            <VStack w="full" space={1}>

                                <Select
                                    selectedValue={sex}
                                    h="35"
                                    w="full"
                                    bg={COLOR.white}

                                    borderStyle="solid"
                                    borderWidth={1}
                                    borderColor={COLOR.inpBorderColor}
                                    borderRadius={5}

                                    fontSize="xs"
                                    color={COLOR.black}

                                    minWidth="200"
                                    accessibilityLabel="Choose Service"
                                    placeholder="Choose Service"
                                    _selectedItem={{
                                        endIcon: <CheckIcon size="5" />
                                    }}
                                    mt={1}
                                    onValueChange={itemValue => setSex(itemValue)}
                                    defaultValue={sex}
                                >
                                    <Select.Item label="Gender" value="0" />
                                    <Select.Item label="Male" value="1" />
                                    <Select.Item label="Female" value="2" />
                                </Select>

                            </VStack>
                        </VStack>
                    </Box>
                    <Box py={3} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                        <VStack space={1}>
                            <HStack justifyContent="space-between">
                                <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Email</Text>
                                <TouchableOpacity>
                                    <Text color={COLOR.IBase} fontWeight="medium" fontSize="2xs">Edit</Text>
                                </TouchableOpacity>
                            </HStack>
                            <Text fontWeight="semibold" fontSize="xs">jo******h@example.com</Text>
                        </VStack>
                    </Box>
                    <Box py={3} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                        <VStack space={1}>
                            <HStack justifyContent="space-between">
                                <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Phone Number</Text>
                                <TouchableOpacity>
                                    <Text color={COLOR.IBase} fontWeight="medium" fontSize="2xs">Edit</Text>
                                </TouchableOpacity>
                            </HStack>
                            <Text fontWeight="semibold" fontSize="xs">+ 9 (***) *** 1234</Text>
                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize={8}>For notifications, reminders and help logging in.</Text>
                        </VStack>
                    </Box>
                    <Box py={3} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                        <VStack space={1}>
                            <HStack justifyContent="space-between">
                                <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Government ID</Text>
                                <TouchableOpacity>
                                    <Text color={COLOR.red} fontWeight="medium" fontSize="2xs">Remove</Text>
                                </TouchableOpacity>
                            </HStack>
                            <Text fontWeight="semibold" fontSize="xs">Provided</Text>
                        </VStack>
                    </Box>
                    <Box py={3}>
                        <VStack space={1}>
                            <HStack justifyContent="space-between">
                                <Text fontWeight="semibold" fontSize="xs">Emergency Contact</Text>
                                <TouchableOpacity>
                                    <Text color={COLOR.IBase} fontWeight="medium" fontSize="2xs">Edit</Text>
                                </TouchableOpacity>
                            </HStack>

                        </VStack>
                    </Box>
                </Box>
            </ScrollView>

            <Box position="absolute" bottom={50} w="full" px={5} >
                <TouchableOpacity onPress={saveProfile}>
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
            <BottomTab navigation={navigation} />
        </Box>
    )
}

export default EditProfilePage;