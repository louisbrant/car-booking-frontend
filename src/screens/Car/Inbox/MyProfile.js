import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import {
    Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue,
    Modal, useToast
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";

import { BottomTab, CenterModal } from '../../../components';
import { backgroundColor, borderColor } from 'styled-system';
import { setCarInfo } from '../../../redux/actions/authActions';
import { LinearGradient } from 'expo-linear-gradient'

import { setUserInfo } from '../../../redux/actions/authActions';

import * as ImagePicker from 'expo-image-picker';

const MyProfilePage = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [delModal, setDelModal] = useState(false);

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const { user, car } = useSelector((store) => store.auth);
    const dispatch = useDispatch()
    const Toast = useToast()

    const onShowProfile = () => {
        navigation.navigate("EditProfileScreen")
    }

    const onPersonInfor = () => {
        navigation.navigate("PersonalScreen");
    }

    const onPayment = () => {
        navigation.navigate("MyPaymentScreen");
    }

    const onNotification = () => {
        navigation.navigate("NotificationScreen");
    }

    const [imageInfor, setImageInfor] = useState({
        img: user.avatar != "" ? typeof (user.avatar) == 'string' ? { uri: ROOT.IMAGE_URL + "users/" + user.avatar } : user.avatar : Images.Profile8,
        selected: false
    });

    console.log('imageInfor=>', imageInfor);

    const onUpload = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync
                ({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: false
                })
            if (!result.cancelled) {
                await AsyncStorage.setItem('avatarImage', result?.uri);
                setImageInfor({
                    ...imageInfor,
                    img: result,
                    selected: true
                });
            }
            else {
                return Toast.show({ title: "Upload error!", placement: 'bottom', status: 'error', w: 300 })
            }
        }
        catch (E) {
            console.log(E)
            // return Toast.show({ title: "Upload errors!", placement: 'bottom', status: 'error', w: 300 })
        }
    }

    const logOut = async () => {
        dispatch(setUserInfo(""))
        navigation.navigate("HomeScreen")
    }

    const onCheckAddCar = () => {
        let newcar = {
            address: car.address,
            carname: car.carname,
            barcode: car.barcode,
            odmeter: car.odmeter,
            transmission: car.transmission,
            trim: car.trim,
            style: car.style,
            ipsum: car.ipsum,
            branced: car.branced,
            currentaddcar: false
        };
        setModalVisible(false);
        dispatch(setCarInfo(newcar));
        navigation.navigate("AllCarsScreen");
    }

    const onDeleteAccount = () => {
        setDelModal(true);
    }

    const deleteAccount = () => {

    }

    useEffect(() => {
        const fetchData = async () => {
            if (car?.currentaddcar) {
                setModalVisible(true);
            }
            await AsyncStorage.setItem('avatarImage', '');
        };

        fetchData();
    }, []);
    return (
        <Box flex={1}>
            <Box
                px={5}
                pb={3}
                pt={5}
                bg={COLOR.white}
                w="full"
            // style={{
            //     shadowColor: "#B1A9A9",
            //     shadowOffset: {
            //         width: 0,
            //         height: 4,
            //     },
            //     shadowOpacity: 0.15,
            //     shadowRadius: 24,
            //     // elevation: 1,
            // }}
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
                        >My Profile</Text>
                    </View>

                    <View >
                        <TouchableOpacity onPress={() => logOut()}>
                            <Icon color={COLOR.black} size="lg" as={<Ionicons name="log-out-outline" />} />
                        </TouchableOpacity>
                    </View>
                </Stack>

            </Box>

            <LinearGradient
                colors={['#ebe9e9', '#F1F1F1']}
            >
                <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                    <Box w="full" px={5} py={3} pb={10}>
                        <TouchableOpacity onPress={onUpload}>
                            <Box py={2}>
                                <Image source={imageInfor.img} w="80px" h="80px" alt="car" rounded="full" />
                            </Box>
                        </TouchableOpacity>
                        <VStack>
                            <Text fontWeight="semibold" fontSize="md">{user.username}</Text>
                            <TouchableOpacity onPress={onShowProfile}>
                                <Text fontWeight="medium" fontSize="xs" underline>Show Profile</Text>
                            </TouchableOpacity>
                        </VStack>
                        <VStack mt={5} space={2}>
                            <Text fontWeight="bold" fontSize="md">Account Settings</Text>
                            <VStack>
                                <HStack alignItems="center" space={2} onTouchStart={onPersonInfor}>
                                    <Icon color={COLOR.black} size="md" as={<Ionicons name="person-outline" />} />
                                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between" >
                                            <Text fontWeight="medium" fontSize="md">Personal Information</Text>
                                            <Icon color={COLOR.black} size="md" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                                <HStack alignItems="center" space={2} onTouchStart={onPayment}>
                                    <Icon color={COLOR.black} size="md" as={<Ionicons name="card-outline" />} />
                                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between" >
                                            <Text fontWeight="medium" fontSize="md">Payments and Payouts</Text>
                                            <Icon color={COLOR.black} size="md" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                                <HStack alignItems="center" space={2}>
                                    <Icon color={COLOR.black} size="md" as={<MaterialIcons name="translate" />} />
                                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between" >
                                            <Text fontWeight="medium" fontSize="md">Traslation</Text>
                                            <Icon color={COLOR.black} size="md" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                                <HStack alignItems="center" space={2} onTouchStart={onNotification}>
                                    <Icon color={COLOR.black} size="md" as={<Ionicons name="notifications-outline" />} />
                                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between" >
                                            <Text fontWeight="medium" fontSize="md">Notifications</Text>
                                            <Icon color={COLOR.black} size="md" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                                <HStack alignItems="center" space={2} onTouchStart={onPayment}>
                                    <Icon color={COLOR.black} size="md" as={<MaterialIcons name="lock-outline" />} />
                                    <Box py={2} borderStyle="solid" borderBottomWidth={0} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between" >
                                            <Text fontWeight="medium" fontSize="md">Privacy and Sharing</Text>
                                            <Icon color={COLOR.black} size="md" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                            </VStack>

                            <Text fontWeight="bold" fontSize="md">Account Activity</Text>
                            <VStack>
                                <HStack alignItems="center" space={2}>
                                    <Box py={2} borderStyle="solid" borderBottomWidth={0} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between" >
                                            <Text fontWeight="medium" fontSize="md">My Vehicles</Text>
                                            <Icon color={COLOR.black} size="md" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                            </VStack>

                            <HStack alignItems="center" space={2} onTouchStart={onDeleteAccount}>
                                <Icon color={COLOR.red} size="md" as={<AntDesign name="delete" />} />
                                <Box py={2} borderStyle="solid"  >
                                    <HStack alignItems="center" justifyContent="space-between" >
                                        <Text color={COLOR.red} fontSize="md">Delete Account</Text>
                                    </HStack>
                                </Box>
                            </HStack>
                        </VStack>
                    </Box>
                </ScrollView>
            </LinearGradient>
            < CenterModal isOpen={modalVisible} setIsOpen={setModalVisible} OK={onCheckAddCar} content={{ title: "Car confirmation", text: ["Lorem ipsum dolor sit amet,", "consectetur adipiscing elit. Nulla nec", "ipsum ac quam auctor dapibus."], ok: "OK" }} />

            < CenterModal isOpen={delModal} setIsOpen={setDelModal} OK={deleteAccount} content={{ title: "Are you sure you want to delete your account?", text: ["This cannot be reveresed."], ok: "Yes", cancel: "Cancel" }} />
            <BottomTab navigation={navigation} />

        </Box>
    )
}

export default MyProfilePage;