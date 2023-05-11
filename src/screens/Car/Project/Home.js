import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useToast } from "native-base";
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";
import { BottomTab } from '../../../components';
import { useApi } from '../../../redux/services'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { setCarInfo } from '../../../redux/actions/authActions';
import { setHouseInfor } from '../../../redux/actions/houseActions';
import { setTab } from '../../../redux/actions/houseActions';
import { useDispatch, useSelector } from 'react-redux'

const ProjectHomePage = ({ navigation }) => {

    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);
    const [allCars, setAllCars] = useState([]);
    const [allHouses, setAllHouses] = useState([]);
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState("car");

    const onDatail = (item) => {
        if (activeTab == 'car') {
            dispatch(setCarInfo(item))
            navigation.navigate("RequestBookScreen")
        }
        else {
            dispatch(setHouseInfor(item))
            navigation.navigate("HouseRequestScreen")
        }
    }

    const tabChange = (tab) => {
        setActiveTab(tab);
        dispatch(setTab(tab));
        if (tab == 'car') {
            getCars();
        }
        else {
            getHouses();
        }
    }
    const getHouses = () => {
        Api.GetAllHouses().then(({ data }) => {
            if (data.status) {
                data = data.data;
                let newhouses = [];
                for (let i = 0; i < data.length; i++) {
                    let stars = 0;
                    for (let j = 0; j < data[i]["review"].length; j++) {
                        stars += data[i]["review"][j]["star"];
                    }
                    const newhouse = {
                        _id: data[i]._id,
                        name: data[i].name,
                        img: ROOT.IMAGE_URL + "houses/" + data[i].img,
                        days: data[i].daysval,
                        engine: data[i].engine,
                        seats: data[i].seats,
                        doors: data[i].doors,
                        automatic: data[i].automatic,
                        star: stars / Number(data[i]["review"].length),
                        adddate: data[i].adddate,
                        address: data[i].address,
                        barcode: data[i].barcode,
                        email: data[i].email,
                        odmeter: data[i].odmeter,
                        review: data[i].review,
                        style: data[i].style,
                        trim: data[i].trim,
                    }
                    newhouses.push(newhouse);
                }
                setAllHouses(newhouses);
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
    }
    const getCars = () => {
        Api.GetAllCars().then(({ data }) => {
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
                        img: ROOT.IMAGE_URL + "cars/" + data[i].img,
                        days: data[i].daysval,
                        engine: data[i].engine,
                        seats: data[i].seats,
                        doors: data[i].doors,
                        automatic: data[i].automatic,
                        star: stars / Number(data[i]["review"].length),
                        adddate: data[i].adddate,
                        address: data[i].address,
                        barcode: data[i].barcode,
                        email: data[i].email,
                        odmeter: data[i].odmeter,
                        review: data[i].review,
                        style: data[i].style,
                        trim: data[i].trim,
                    }
                    newcars.push(newcar);
                }
                setAllCars(newcars);
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
    }
    useEffect(() => {
        setLoading(true);
        getCars();
    }, [])
    return (
        <Box
            flex={1}
            bg={{
                linearGradient: {
                    colors: ['rgba(255, 255, 255, 0.2)', 'rgba(243, 243, 243, 0.2)'],
                    start: [0, 0],
                    end: [0, 1]
                }
            }}
        >
            {loading && <Loading />}
            <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                <Box
                    pt={10}
                    px={5}
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
                    <HStack justifyContent="space-between">
                        <Input
                            w="85%"
                            InputLeftElement={
                                <Icon
                                    as={<EvilIcons name="search" />}
                                    size="md"
                                    ml="2"
                                    color={COLOR.searchIconColor}
                                />
                            }
                            p={.5}
                            pl={1.5}

                            bg={COLOR.white}
                            color={COLOR.black}

                            borderStyle="solid"
                            borderWidth={1}
                            borderColor={COLOR.inpBorderColor}
                            borderRadius={5}

                            placeholder="Search Jets, Yacht and Car"
                        // onFocus={onFocus}
                        />
                        <Box px={2}
                            style={{
                                backgroundColor: COLOR.IBase,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 5
                            }}
                        >
                            <Icon color={COLOR.IBase} size="md">
                                {LAYOUT.filterIcon}
                            </Icon>
                        </Box>
                    </HStack>
                    {
                        activeTab == "house" &&
                        <HStack>
                            <Box
                                w="1/3"
                                py={2}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onTouchStart={() => { tabChange('house') }}
                            >
                                <VStack justifyContent="center" alignItems="center" >
                                    <Box>
                                        {LAYOUT.basehomeIcon}
                                    </Box>
                                    <Text color={COLOR.IBase} fontWeight="medium" fontSize={9}>Home</Text>
                                </VStack>

                                <Box
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,

                                        width: '100%',
                                        height: 3,
                                        backgroundColor: COLOR.IBase,

                                        shadowColor: COLOR.inPlaceholder,
                                        shadowOffset: {
                                            width: 0,
                                            height: 4,
                                        },
                                        shadowOpacity: 0.15,
                                        shadowRadius: 24,

                                        borderTopLeftRadius: 30,
                                        borderTopRightRadius: 50,
                                    }}
                                />
                            </Box>
                            <Box
                                w="1/3"
                                py={2}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onTouchStart={() => { tabChange('car') }}
                            >
                                <VStack justifyContent="center" alignItems="center">
                                    <Box>
                                        {LAYOUT.carIcon}
                                    </Box>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize={9}>Cars</Text>
                                </VStack>
                            </Box>
                            <Box
                                w="1/3"
                                py={2}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <VStack justifyContent="center" alignItems="center">
                                    <Box>
                                        {LAYOUT.boatIcon}
                                    </Box>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize={9}>Yacht</Text>
                                </VStack>
                            </Box>
                        </HStack>
                    }
                    {
                        activeTab == "car" &&
                        <HStack>
                            <Box
                                w="1/3"
                                py={2}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onTouchStart={() => { tabChange('house') }}
                            >
                                <VStack justifyContent="center" alignItems="center" >
                                    <Box>
                                        {LAYOUT.homeIcon}
                                    </Box>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize={9}>Home</Text>
                                </VStack>
                            </Box>
                            <Box
                                w="1/3"
                                py={2}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onTouchStart={() => { tabChange('car') }}
                            >
                                <VStack justifyContent="center" alignItems="center">
                                    <Box>
                                        {LAYOUT.basecarIcon}
                                    </Box>
                                    <Text color={COLOR.IBase} fontWeight="medium" fontSize={9}>Cars</Text>
                                </VStack>
                                <Box
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,

                                        width: '100%',
                                        height: 3,
                                        backgroundColor: COLOR.IBase,

                                        shadowColor: COLOR.inPlaceholder,
                                        shadowOffset: {
                                            width: 0,
                                            height: 4,
                                        },
                                        shadowOpacity: 0.15,
                                        shadowRadius: 24,

                                        borderTopLeftRadius: 30,
                                        borderTopRightRadius: 50,
                                    }}
                                />
                            </Box>
                            <Box
                                w="1/3"
                                py={2}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <VStack justifyContent="center" alignItems="center">
                                    <Box>
                                        {LAYOUT.boatIcon}
                                    </Box>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize={9}>Yacht</Text>
                                </VStack>
                            </Box>
                        </HStack>
                    }
                </Box>
                <VStack py={3} px={5} space={3}>

                    {activeTab == 'car' && allCars.map((item, idx) => {
                        return (
                            <Box key={idx}>
                                <TouchableOpacity onPress={() => onDatail(item)}>
                                    <VStack space={2}>
                                        <Box borderRadius={10} w="full">
                                            <Image source={{ uri: item.img }} borderRadius={10} alt="car" style={{ width: 450, height: 190 }} />
                                        </Box>
                                        <HStack justifyContent="space-between" alignItems="center">
                                            <Text color={COLOR.black} fontWeight="semibold" fontSize="sm"> {`${item.name}`}</Text>
                                            <Text color={COLOR.IBase} fontWeight="bold" fontSize="sm">${`${item.days}`}/day</Text>
                                        </HStack>
                                        <HStack space={2} style={{ alignItems: 'center' }}>
                                            <FontAwesome name="star" size={14} color={COLOR.yellow} />
                                            <HStack space={1}>
                                                <Text
                                                    color={COLOR.black}
                                                    fontWeight="semibold"
                                                    fontSize="xs"
                                                >{`${item.star}`}</Text>
                                                <Text
                                                    color={COLOR.inPlaceholder}
                                                    fontWeight="semibold"
                                                    fontSize="xs"
                                                >(24.2k)</Text>
                                            </HStack>
                                        </HStack>
                                    </VStack>
                                </TouchableOpacity>
                            </Box>
                        )
                    })}
                    {activeTab == 'house' && allHouses.map((item, idx) => {
                        return (
                            <Box key={idx}>
                                <TouchableOpacity onPress={() => onDatail(item)}>
                                    <VStack space={2}>
                                        <Box borderRadius={10} w="full">
                                            <Image source={{ uri: item.img }} borderRadius={10} alt="car" style={{ width: 450, height: 190 }} />
                                        </Box>
                                        <HStack justifyContent="space-between" alignItems="center">
                                            <Text color={COLOR.black} fontWeight="semibold" fontSize="sm"> {`Park Square, NY`}</Text>
                                            <Text color={COLOR.IBase} fontWeight="bold" fontSize="sm">${`${item.days}`}/night</Text>
                                        </HStack>
                                        <HStack space={2} style={{ alignItems: 'center' }}>
                                            <FontAwesome name="star" size={14} color={COLOR.yellow} />
                                            <HStack space={1}>
                                                <Text
                                                    color={COLOR.black}
                                                    fontWeight="semibold"
                                                    fontSize="xs"
                                                >{`${item.star}`}</Text>
                                                <Text
                                                    color={COLOR.inPlaceholder}
                                                    fontWeight="semibold"
                                                    fontSize="xs"
                                                >3BHK</Text>
                                            </HStack>
                                        </HStack>
                                    </VStack>
                                </TouchableOpacity>
                            </Box>
                        )
                    })}

                </VStack>
            </ScrollView>

            <BottomTab navigation={navigation} />
        </Box>
    )
}

export default ProjectHomePage;