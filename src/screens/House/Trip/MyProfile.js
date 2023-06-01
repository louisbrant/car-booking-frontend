import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import {
    Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue,
    Modal, useToast
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"
import { useSelector, useDispatch } from 'react-redux'

import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";

import { BottomTab } from '../../../components';
import { backgroundColor, borderColor } from 'styled-system';
import { setCarInfo } from '../../../redux/actions/authActions';
import { LinearGradient } from 'expo-linear-gradient'

import { setUserInfo } from '../../../redux/actions/authActions';

import * as ImagePicker from 'expo-image-picker';

const MyProfilePage = ({ navigation }) => {

    const { user, car } = useSelector((store) => store.auth);
    const dispatch = useDispatch()
    const Toast = useToast()

    const onShowProfile = () => {
        navigation.navigate("EditProfileScreen")
    }

    const [imageInfor, setImageInfor] = useState({
        img: user.avatar != "" ? typeof (user.avatar) == 'string' ? { uri: ROOT.IMAGE_URL + "users/" + user.avatar } : user.avatar : Images.Profile8,
        selected: false
    });
    // console.log(imageInfor, user.avatar, Images.Profile8);

    const onUpload = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync
                ({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: false
                })
            let newuser = user;
            newuser.avatar = result;
            if (!result.cancelled) {
                setImageInfor({
                    ...imageInfor,
                    img: result,
                    selected: true
                });
                dispatch(setUserInfo(newuser))
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
    const [modalVisible, setModalVisible] = useState(false);

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    useEffect(() => {
        if (car.currentaddcar) {
            setModalVisible(true);
        }
    }, [])
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
                </Stack>

            </Box>

            <LinearGradient
                colors={['#ebe9e9', '#F1F1F1']}
            >
                <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                    <Box w="full" px={5} py={3} pb={10}>
                        <TouchableOpacity onPress={onUpload}>
                            <Box py={2}>
                                <Image source={imageInfor.img} w="80px" h="80px" resizeMode="contain" alt="car" rounded="full" />
                            </Box>
                        </TouchableOpacity>
                        <VStack>
                            <Text fontWeight="semibold" fontSize="md">{user.username}</Text>
                            <TouchableOpacity onPress={onShowProfile}>
                                <Text fontWeight="medium" fontSize="2xs" underline>Show Profile</Text>
                            </TouchableOpacity>
                        </VStack>
                        <VStack mt={5} space={2}>
                            <Text fontWeight="bold" fontSize="xs">Account Settings</Text>
                            <VStack>
                                <HStack alignItems="center" space={2}>
                                    <Icon color={COLOR.black} size="xs" as={<Ionicons name="person-outline" />} />
                                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between" >
                                            <Text fontWeight="medium" fontSize="xs">Personal Information</Text>
                                            <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
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
                                    <Icon color={COLOR.black} size="xs" as={<Ionicons name="notifications-outline" />} />
                                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between" >
                                            <Text fontWeight="medium" fontSize="xs">Notifications</Text>
                                            <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                                <HStack alignItems="center" space={2}>
                                    <Icon color={COLOR.black} size="xs" as={<MaterialIcons name="lock-outline" />} />
                                    <Box py={2} borderStyle="solid" borderBottomWidth={0} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between" >
                                            <Text fontWeight="medium" fontSize="xs">Privacy and Sharing</Text>
                                            <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                            </VStack>

                            <Text fontWeight="bold" fontSize="xs">Account Activity</Text>
                            <VStack>
                                <HStack alignItems="center" space={2}>
                                    <Box py={2} borderStyle="solid" borderBottomWidth={0} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between" >
                                            <Text fontWeight="medium" fontSize="xs">My Vehicles</Text>
                                            <Icon color={COLOR.black} size="xs" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                            </VStack>
                        </VStack>
                    </Box>
                </ScrollView>
            </LinearGradient>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef} _backdrop={true} backdropOpacity={0.5} backgroundColor={COLOR.ModalBgcolor} >
                <Modal.Content style={{
                    width: "80%",
                }}>
                    <Modal.Body style={{
                        backgroundColor: COLOR.ModalBlackBgcolor
                    }}>
                        <HStack justifyContent="space-between" pb={2}>
                            <VStack w="100%" space={1}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    color={COLOR.white}
                                    fontWeight="medium"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: 17
                                    }}
                                >
                                    Car confirmation
                                </Text>
                            </VStack>
                        </HStack>
                        <HStack justifyContent="space-between" pb={1}>
                            <VStack w="100%" space={1}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    color={COLOR.inPlaceholder}
                                    fontSize="xs"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    Lorem ipsum dolor sit amet,
                                </Text>
                                <Text
                                    color={COLOR.inPlaceholder}
                                    fontSize="xs"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    consectetur adipiscing elit. Nulla nec
                                </Text>
                                <Text
                                    color={COLOR.inPlaceholder}
                                    fontSize="xs"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    ipsum ac quam auctor dapibus.
                                </Text>
                            </VStack>
                        </HStack>
                    </Modal.Body>
                    <Modal.Footer style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLOR.ModalBlackBgcolor,
                        borderTopWidth: 0.3,
                        borderColor: COLOR.ModalBordercolor
                    }}>
                        <Box>
                            <TouchableOpacity onPress={onCheckAddCar}>
                                <Box
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        color={COLOR.IBase}
                                        fontWeight="bold"
                                        fontSize={17}
                                    >
                                        OK
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                        </Box>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <BottomTab navigation={navigation} />

        </Box>
    )
}

export default MyProfilePage;