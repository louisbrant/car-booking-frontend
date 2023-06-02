import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, Modal, useToast } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT } from "../../../constants";

import { BottomTab, Loading } from '../../../components';
import { useApi } from '../../../redux/services'
import { useSelector, useDispatch } from 'react-redux'
import { setCarInfo } from '../../../redux/actions/authActions';

const ConfigurationPage = ({ navigation }) => {

    const { user, car } = useSelector((store) => store.auth);
    const dispatch = useDispatch()

    const Toast = useToast()
    const Api = useApi()

    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const onShowProfile = () => {
        navigation.navigate("EditProfileScreen")
    }
    const [days, setDays] = useState();
    const [engine, setEngine] = useState();
    const [seats, setSeats] = useState();
    const [doors, setDoors] = useState();
    const onCarInforSave = () => {
        console.log(car, "DDDD", days)
        if (!days || !engine || !seats || !doors) {
            return Toast.show({ title: "Input All Car Infor!", placement: 'bottom', status: 'error', w: 300 })
        }
        else {
            setLoading(true);
            Api.AddCar({
                email: user.email, name: car.carname, px: car.px, py: car.py, days, engine, seats, doors, automatic: car.transmission, address: car.address, barcode: car.barcode, odmeter: car.odmeter, trim: car.trim, style: car.style
            }).then(({ data }) => {
                if (data.status) {
                    let newcar = {
                        address: car.address,
                        px: car.px,
                        py: car.py,
                        carname: car.carname,
                        barcode: car.barcode,
                        odmeter: car.odmeter,
                        transmission: car.transmission,
                        trim: car.trim,
                        style: car.style,
                        ipsum: car.ipsum,
                        branced: car.branced,
                        currentaddcar: true
                    };
                    dispatch(setCarInfo(newcar));
                    setLoading(false);
                    Toast.show({ title: "Success Car Addss!", placement: 'bottom', status: 'success', w: 300 });
                    return navigation.navigate("MyProfileScreen");
                }
                else {
                    setLoading(false);
                    return Toast.show({ title: data.message, placement: 'bottom', status: 'error', w: 300 });
                }
            }).catch(error => {
                setLoading(false);
                console.log("error->", error)
                if (error.response && error.response.status === 400) {
                    return Toast.show({ title: error.response.data, placement: 'bottom', status: 'error', w: 300 })
                } else {
                }
            })
        }
    }
    return (
        <Box flex={1}>
            {loading && <Loading />}
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
                        >Configuration</Text>
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
                            Days/$
                        </Text>
                        <Input
                            keyboardType='numeric'
                            w="full"
                            h="45"
                            bg={COLOR.white}
                            pl={3}
                            value={days}
                            onChangeText={(text) => { setDays(text.replace(/[^0-9]/g, '')) }}
                            borderStyle="solid"
                            borderWidth={1}
                            borderColor={COLOR.inpBorderColor}
                            borderRadius={5}

                            fontWeight="medium"
                            fontSize="xs"
                            color={COLOR.black}
                            placeholder="Input Days/$"
                        />
                    </VStack>
                    <VStack w="full" space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="semibold"
                            fontSize="xs"
                        >
                            Engine
                        </Text>
                        <Input
                            w="full"
                            h="45"
                            bg={COLOR.white}
                            pl={3}
                            value={engine}
                            onChangeText={setEngine}
                            borderStyle="solid"
                            borderWidth={1}
                            borderColor={COLOR.inpBorderColor}
                            borderRadius={5}

                            fontWeight="medium"
                            fontSize="xs"
                            color={COLOR.black}
                            placeholder="Input Engine Type"
                        />
                    </VStack>
                    <VStack w="full" space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="semibold"
                            fontSize="xs"
                        >
                            Seats
                        </Text>
                        <Input
                            keyboardType='numeric'
                            w="full"
                            h="45"
                            bg={COLOR.white}
                            pl={3}
                            value={seats}
                            onChangeText={(text) => { setSeats(text.replace(/[^0-9]/g, '')) }}
                            borderStyle="solid"
                            borderWidth={1}
                            borderColor={COLOR.inpBorderColor}
                            borderRadius={5}

                            fontWeight="medium"
                            fontSize="xs"
                            color={COLOR.black}
                            placeholder="Input Seats Number"
                        />
                    </VStack>
                    <VStack w="full" space={1}>
                        <Text
                            color={COLOR.black}
                            fontWeight="semibold"
                            fontSize="xs"
                        >
                            Doors
                        </Text>
                        <Input
                            keyboardType='numeric'
                            w="full"
                            h="45"
                            bg={COLOR.white}
                            pl={3}
                            value={doors}
                            onChangeText={(text) => { setDoors(text.replace(/[^0-9]/g, '')) }}
                            borderStyle="solid"
                            borderWidth={1}
                            borderColor={COLOR.inpBorderColor}
                            borderRadius={5}

                            fontWeight="medium"
                            fontSize="xs"
                            color={COLOR.black}
                            placeholder="Input Doors Number"
                        />
                    </VStack>
                </VStack>
            </Box>

            <Box position="absolute" bottom={30} w="full" px={5}>
                <TouchableOpacity >
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
                        onTouchStart={onCarInforSave}
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

        </Box>
    )
}

export default ConfigurationPage;