import React, { useCallback, useState, useEffect } from 'react';
import { Image, ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, Modal, useToast } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../components'
import { COLOR, Images, LAYOUT, ROOT, CarStyle } from "../../constants";

import { BottomTab } from '../../components';
import { useApi } from '../../redux/services'
import { useSelector } from 'react-redux'
import { borderRadius, height } from 'styled-system';

const transmissionitems = CarStyle.transmissionitems;

const MyHousesPage = ({ navigation }) => {
    const { user } = useSelector((store) => store.auth)
    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [reload, setReload] = useState(false);
    const [carid, setCarId] = useState('');

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);


    const onShowProfile = () => {
        navigation.navigate("EditProfileScreen")
    }

    const [allHouses, setAllHouses] = useState([]);

    const onSetDeleteCarId = (_id) => {
        setCarId(_id);
        setModalVisible(true);
    }

    const onDeleteHouse = (_id) => {
        setModalVisible(false);
        setLoading(true);
        Api.DeleteMyHouse({ _id }).then(({ data }) => {
            if (data.status) {
                setReload(!reload);
                return Toast.show({ title: "Delete Car!", placement: 'bottom', status: 'error', w: 300 });
            }
            else {
                return Toast.show({ title: data.message, placement: 'bottom', status: 'error', w: 300 });
            }
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                return Toast.show({ title: error.response.data, placement: 'bottom', status: 'error', w: 300 })
            } else {
                return Toast.show({ title: "Error!", placement: 'bottom', status: 'error', w: 300 })
            }
        })
    }

    useEffect(() => {
        setLoading(true);
        Api.GetMyHouses({ email: user.email }).then(({ data }) => {
            if (data.status) {
                data = data.data;
                let newcars = [];
                for (let i = 0; i < data.length; i++) {
                    let stars = 0;
                    for (let j = 0; j < data[i]["review"].length; j++) {
                        stars += data[i]["review"][j]["star"];
                    }
                    const newcar = {
                        _id: data[i]._id,
                        name: data[i].name,
                        img: ROOT.IMAGE_URL + "houses/" + data[i].img,
                        days: data[i].daysval,
                        engine: data[i].engine,
                        seats: data[i].seats,
                        doors: data[i].doors,
                        automatic: data[i].automatic,
                        star: stars / Number(data[i]["review"].length)
                    }
                    newcars.push(newcar);
                }
                setAllHouses(newcars);
                setLoading(false);
            }
            else {
                setLoading(false);
                return Toast.show({ title: data.message, placement: 'bottom', status: 'error', w: 300 });
            }
        }).catch(error => {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                return Toast.show({ title: error.response.data, placement: 'bottom', status: 'error', w: 300 })
            } else {
                return Toast.show({ title: "Error!", placement: 'bottom', status: 'error', w: 300 })
            }
        })
    }, [reload])
    return (
        <Box flex={1}>
            {loading && <Loading />}
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
                        >All Houses</Text>
                    </View>
                </Stack>

            </Box>

            <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                <Box w="full" px={5} py={3} pb={10}>
                    <VStack space={2}>
                        {allHouses.map((item, idx) => {
                            return (
                                <ScrollView
                                    key={idx}
                                    horizontal={true}
                                    style={{
                                        flex: 1
                                    }}>
                                    <HStack justifyContent="space-between">
                                        <Box
                                            style={{
                                                backgroundColor: COLOR.smBoxColor,
                                                borderStyle: 'solid',
                                                borderWidth: 1,
                                                borderColor: COLOR.smBoxBoderColor,
                                                borderRadius: 10,
                                            }}
                                            p={3}
                                            w={300}
                                        >
                                            <VStack space={2}>
                                                <Box borderRadius={10} w="full" >
                                                    <Image source={{ uri: item.img }} borderRadius={10} alt="car" style={{ width: 275, height: 150 }} />
                                                </Box>
                                                <HStack justifyContent="space-between" alignItems="center">
                                                    <Text color={COLOR.black} pl={3} fontWeight="semibold" fontSize="sm"> {`Park Square, NY`}</Text>
                                                    <Text color={COLOR.IBase} fontWeight="bold" fontSize="sm">${`450`}/night</Text>
                                                </HStack>
                                                <HStack space={2} pl={3} style={{ alignItems: 'center' }}>
                                                    <HStack space={1}>
                                                        <Text
                                                            color={COLOR.inPlaceholder}
                                                            fontWeight="semibold"
                                                            fontSize="xs"
                                                        >3BHK</Text>
                                                    </HStack>
                                                </HStack>
                                            </VStack>
                                        </Box>
                                        <Box
                                            px={5}
                                            width={"30%"}
                                            py={12}
                                        >
                                            <Stack direction="row"
                                                onTouchStart={(() => onSetDeleteCarId(item._id))}
                                                style={{
                                                    width: 70,
                                                    height: 70,
                                                    backgroundColor: COLOR.red,
                                                    borderRadius: 100,
                                                    display: 'flex',
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Icon color={COLOR.IBase} style={{
                                                    height: 24,
                                                    width: 24
                                                }}>
                                                    {LAYOUT.deleteIcon}
                                                </Icon>
                                            </Stack>
                                        </Box>
                                    </HStack>
                                </ScrollView>

                                // <Box key={idx}>
                                //     <TouchableOpacity onPress={() => onDatail(item)}>
                                //         <VStack space={2}>
                                //             <Box borderRadius={10} w="full">
                                //                 <Image source={{ uri: item.img }}  alt="car" style={{ width: 450, height: 190 }} />
                                //             </Box>
                                //             <HStack justifyContent="space-between" alignItems="center">
                                //                 <Text color={COLOR.black} fontWeight="semibold" fontSize="sm"> {`Park Square, NY`}</Text>
                                //                 <Text color={COLOR.IBase} fontWeight="bold" fontSize="sm">${`450`}/night</Text>
                                //             </HStack>
                                //             <HStack space={2} style={{ alignItems: 'center' }}>
                                //                 <FontAwesome name="star" size={14} color={COLOR.yellow} />
                                //                 <HStack space={1}>
                                //                     <Text
                                //                         color={COLOR.black}
                                //                         fontWeight="semibold"
                                //                         fontSize="xs"
                                //                     >{`${item.star}`}</Text>
                                //                     <Text
                                //                         color={COLOR.inPlaceholder}
                                //                         fontWeight="semibold"
                                //                         fontSize="xs"
                                //                     >3BHK</Text>
                                //                 </HStack>
                                //             </HStack>
                                //         </VStack>
                                //     </TouchableOpacity>
                                // </Box>
                            )
                        })}
                    </VStack>
                </Box>
            </ScrollView>

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
                                    Delete Car
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
                                    Are you sure you want to delete?
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
                    }} p={0}>
                        <Box
                            style={{
                                width: '50%',
                                borderRightWidth: 0.3,
                                borderRightColor: COLOR.ModalBordercolor
                            }}
                            p={2}>
                            <TouchableOpacity onPress={() => { setModalVisible(false) }}>
                                <Box
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        color={COLOR.IBase}
                                        fontWeight="bold"
                                        fontSize={17}
                                    >
                                        Cancel
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                        </Box>
                        <Box
                            style={{
                                width: '50%',
                            }}
                            p={2}>
                            <TouchableOpacity onPress={() => onDeleteHouse(carid)}>
                                <Box
                                    style={{
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
            </Modal >
        </Box >
    )
}

export default MyHousesPage;