import React, { useCallback, useState, useEffect } from 'react';
import { COLOR, Images, LAYOUT, ROOT } from "../../constants";
import { ScrollView, TouchableOpacity } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Menu, Pressable, useToast } from "native-base";
import Slider from 'rn-range-slider';
import { useDispatch } from 'react-redux'
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Feather, FontAwesome } from "@expo/vector-icons"

import { BottomTab } from '../../components';

import Thumb from './Slider/Thumb';
import Rail from './Slider/Rail';
import RailSelected from './Slider/RailSelected';
import Notch from './Slider/Notch';
import Label from './Slider/Label';
import { Logut } from '../../redux/actions/authActions'
import { useApi } from '../../redux/services'

import car2 from '../../assets/img/car2.png';
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../components'

const SecondPage = ({ navigation }) => {
    const dispatch = useDispatch()

    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);

    const [highBudget, setHighBudget] = useState(100000);
    const [lowBudget, setLowBudget] = useState(50000);

    const renderThumb = useCallback(
        () => <Thumb name={'low'} />,
        [],
    );
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const [shouldOverlapWithTrigger] = useState(false);

    const handleValueChange = useCallback((lowValue, highValue) => {
        setLowBudget(lowValue);
        setHighBudget(highValue);
    }, []);

    const onSignOut = () => {
        ROOT.Socket.emit("logout user");
        dispatch(Logut());
        navigation.navigate("SignInScreen");
    }

    const onMyProfile = () => {
        navigation.navigate("MyProfileScreen");
    }
    const [allCars, setAllCars] = useState([]);
    useEffect(() => {
        setLoading(true);
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
                        name: data[i].name,
                        img: ROOT.IMAGE_URL + "cars/" + data[i].img,
                        days: data[i].daysval,
                        engine: data[i].engine,
                        seats: data[i].seats,
                        doors: data[i].doors,
                        automatic: data[i].automatic,
                        star: stars / Number(data[i]["review"].length)
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
    }, [])
    return (
        <Box
            flex={1}
            bg={{
                linearGradient: {
                    colors: ['#F5F5F5', '#F5F5F5'],
                    start: [0, 1],
                    end: [0, 0]
                }
            }}
        >
            {loading && <Loading />}

            <BottomTab navigation={navigation} />

            <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                <Box
                    pt={10}
                    pb={2}
                    px={5}
                    style={{
                        backgroundColor: COLOR.white,

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
                        <TouchableOpacity>
                            <Icon color={COLOR.black} size="md" as={<Entypo name="menu" />} />
                        </TouchableOpacity>
                        <Text color={COLOR.black} fontWeight={600} fontSize={16}>IZRA</Text>

                        <Menu w="150"
                            mt={7} shouldOverlapWithTrigger={shouldOverlapWithTrigger} placement={"bottom right"} trigger={
                                triggerProps => {
                                    return <Pressable {...triggerProps}><Avatar bg="green.500" alignSelf="center" size="sm" source={Images.Profile} /></Pressable>;
                                }}>
                            <Menu.Item onPress={onMyProfile}>My Profile</Menu.Item>
                            <Menu.Item onPress={onSignOut}>Sign Out</Menu.Item>
                        </Menu>
                    </HStack>
                </Box>

                <Box py={3} px={5}>
                    <HStack justifyContent="space-between">
                        <VStack w="48%" space={1}>
                            <Text
                                color={COLOR.inPlaceholder}
                                fontWeight="medium"
                                fontSize="xs"
                            >
                                In
                            </Text>
                            <Input
                                w="full"
                                InputLeftElement={
                                    <Icon
                                        as={<AntDesign name="calendar" />}
                                        size="sm"
                                        ml="2"
                                        color={COLOR.inIconColor}
                                    />
                                }
                                bg={COLOR.white}
                                p={.5}
                                borderStyle="solid"
                                borderWidth={1}
                                borderColor={COLOR.inpBorderColor}
                                borderRadius={5}
                                color={COLOR.black}
                                placeholder="03/06/2022"
                            />
                        </VStack>
                        <VStack w="48%" space={1}>
                            <Text
                                color={COLOR.inPlaceholder}
                                fontWeight="medium"
                                fontSize="xs"
                            >
                                Out
                            </Text>
                            <Input
                                w="full"
                                InputLeftElement={
                                    <Icon
                                        as={<AntDesign name="calendar" />}
                                        size="sm"
                                        ml="2"
                                        color={COLOR.inIconColor}
                                    />
                                }
                                bg={COLOR.white}
                                p={.5}
                                borderStyle="solid"
                                borderWidth={1}
                                borderColor={COLOR.inpBorderColor}
                                borderRadius={5}
                                color={COLOR.black}
                                placeholder="03/06/2022"
                            />
                        </VStack>
                    </HStack>
                    <HStack justifyContent="flex-start" mt={2}>
                        <VStack w="full" space={1}>
                            <Text
                                color={COLOR.inPlaceholder}
                                fontWeight="medium"
                                fontSize="xs"
                            >
                                Location
                            </Text>
                            <Input
                                w="full"
                                InputLeftElement={
                                    <Icon
                                        as={<EvilIcons name="location" />}
                                        size="sm"
                                        ml="2"
                                        color={COLOR.inIconColor}
                                    />
                                }
                                bg={COLOR.white}
                                p={.5}
                                borderStyle="solid"
                                borderWidth={1}
                                borderColor={COLOR.inpBorderColor}
                                borderRadius={5}
                                color={COLOR.black}
                                placeholder="Nowhere Street, New York"
                            />
                        </VStack>
                    </HStack>

                    <HStack justifyContent="flex-start" mt={2}>
                        <VStack w="full" space={1}>
                            <Text
                                color={COLOR.inPlaceholder}
                                fontWeight="medium"
                                fontSize="xs"
                            >
                                Budget
                            </Text>

                            <Slider
                                style={{ backgroundColor: 'white' }}
                                low={lowBudget}
                                high={highBudget}

                                min={25000}
                                max={150000}

                                step={5}
                                disableRange={false}
                                floatingLabel={false}

                                renderThumb={renderThumb}
                                renderRail={renderRail}
                                renderRailSelected={renderRailSelected}

                                // renderLabel={renderLabel}
                                // renderNotch={renderNotch}

                                onValueChanged={handleValueChange}
                            />

                            <HStack justifyContent="space-between" px={5}>
                                <Text
                                    color={COLOR.black}
                                    fontWeight="medium"
                                    fontSize="xs"
                                >${lowBudget}</Text>
                                <Text
                                    color={COLOR.black}
                                    fontWeight="medium"
                                    fontSize="xs"
                                >${highBudget}</Text>
                            </HStack>

                        </VStack>
                    </HStack>
                </Box>

                <Box
                    bg={COLOR.white}
                    style={{
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,

                        shadowColor: "#B1A9A926",
                        shadowOffset: {
                            width: 0,
                            height: -6,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 24,
                        // elevation: 1,
                    }}
                    py={3}
                    px={5}
                >
                    {allCars.map((item, idx) => {
                        return (
                            <Box
                                style={{
                                    backgroundColor: COLOR.smBoxColor,
                                    borderStyle: 'solid',
                                    borderWidth: 1,
                                    borderColor: COLOR.smBoxBoderColor,
                                    borderRadius: 10,
                                }}
                                p={3}
                                key={idx}
                            >
                                <HStack justifyContent="space-between">
                                    <Text
                                        color={COLOR.IBase}
                                        fontWeight="bold"
                                        fontSize="sm"
                                    >
                                        ${`${item.days}`}/day
                                    </Text>
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="semibold"
                                        fontSize="sm"
                                    >
                                        {`${item.name}`}
                                    </Text>
                                </HStack>
                                <HStack mt={2}>
                                    <VStack space={1} w="1/2">
                                        <Stack space={2} direction="row" justifyContent="flex-start" alignItems="center">
                                            <Icon color={COLOR.IBase} size="xs">
                                                {LAYOUT.engineIcon}
                                            </Icon>
                                            <Text
                                                color={COLOR.inPlaceholder}
                                                fontWeight="medium"
                                                fontSize="xs"
                                            >
                                                {`${item.engine}`}
                                            </Text>
                                        </Stack>
                                        <Stack space={2} direction="row" justifyContent="flex-start" alignItems="center">
                                            <Icon color={COLOR.IBase} size="xs">
                                                {LAYOUT.seatIcon}
                                            </Icon>
                                            <Text
                                                color={COLOR.inPlaceholder}
                                                fontWeight="medium"
                                                fontSize="xs"
                                            >
                                                {`${item.seats}`} Seats
                                            </Text>
                                        </Stack>
                                        <Stack space={2} direction="row" justifyContent="flex-start" alignItems="center">
                                            <Icon color={COLOR.IBase} size="xs">
                                                {LAYOUT.doorIcon}
                                            </Icon>
                                            <Text
                                                color={COLOR.inPlaceholder}
                                                fontWeight="medium"
                                                fontSize="xs"
                                            >
                                                {`${item.doors}`} Doors
                                            </Text>
                                        </Stack>
                                        <Stack space={2} direction="row" justifyContent="flex-start" alignItems="center">
                                            <Icon color={COLOR.IBase} size="xs">
                                                {LAYOUT.autoIcon}
                                            </Icon>
                                            <Text
                                                color={COLOR.inPlaceholder}
                                                fontWeight="medium"
                                                fontSize="xs"
                                            >
                                                {`${item.automatic}`}
                                            </Text>
                                        </Stack>
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
                                    <Box
                                        w="1/2"
                                        // borderStyle="solid"
                                        // borderWidth={1}
                                        // borderColor={COLOR.inpBorderColor}
                                        borderRadius={5}
                                        bg={COLOR.white}
                                    >
                                        <Image source={{ uri: item.img }} resizeMode="contain" alt="car" style={{ width: 250, height: 100 }} />
                                    </Box>
                                </HStack>
                            </Box>
                        )
                    })}
                    {/* <Box
                        style={{
                            backgroundColor: COLOR.smBoxColor,
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderColor: COLOR.smBoxBoderColor,
                            borderRadius: 10,
                        }}
                        p={3}
                        mt={3}
                    >
                        <HStack justifyContent="space-between">
                            <Text
                                color={COLOR.IBase}
                                fontWeight="bold"
                                fontSize="sm"
                            >
                                $100/day
                            </Text>
                            <Text
                                color={COLOR.black}
                                fontWeight="semibold"
                                fontSize="sm"
                                textTransform="capitalize"
                            >
                                rolls royce cullinan 2021
                            </Text>
                        </HStack>
                        <HStack mt={2}>
                            <VStack space={1} w="1/2">
                                <Stack space={2} direction="row" justifyContent="flex-start" alignItems="center">
                                    <Icon color={COLOR.IBase} size="xs">
                                        {LAYOUT.engineIcon}
                                    </Icon>
                                    <Text
                                        color={COLOR.inPlaceholder}
                                        fontWeight="medium"
                                        fontSize="xs"
                                    >
                                        v12 Engine
                                    </Text>
                                </Stack>
                                <Stack space={2} direction="row" justifyContent="flex-start" alignItems="center">
                                    <Icon color={COLOR.IBase} size="xs">
                                        {LAYOUT.seatIcon}
                                    </Icon>
                                    <Text
                                        color={COLOR.inPlaceholder}
                                        fontWeight="medium"
                                        fontSize="xs"
                                    >
                                        4 Seats
                                    </Text>
                                </Stack>
                                <Stack space={2} direction="row" justifyContent="flex-start" alignItems="center">
                                    <Icon color={COLOR.IBase} size="xs">
                                        {LAYOUT.doorIcon}
                                    </Icon>
                                    <Text
                                        color={COLOR.inPlaceholder}
                                        fontWeight="medium"
                                        fontSize="xs"
                                    >
                                        4 Doors
                                    </Text>
                                </Stack>
                                <Stack space={2} direction="row" justifyContent="flex-start" alignItems="center">
                                    <Icon color={COLOR.IBase} size="xs">
                                        {LAYOUT.autoIcon}
                                    </Icon>
                                    <Text
                                        color={COLOR.inPlaceholder}
                                        fontWeight="medium"
                                        fontSize="xs"
                                    >
                                        Automatic
                                    </Text>
                                </Stack>
                                <HStack space={2} style={{ alignItems: 'center' }}>
                                    <FontAwesome name="star" size={14} color={COLOR.yellow} />
                                    <HStack space={1}>
                                        <Text
                                            color={COLOR.black}
                                            fontWeight="semibold"
                                            fontSize="xs"
                                        >5.0</Text>
                                        <Text
                                            color={COLOR.inPlaceholder}
                                            fontWeight="semibold"
                                            fontSize="xs"
                                        >(24.2k)</Text>
                                    </HStack>
                                </HStack>
                            </VStack>
                            <Box
                                w="1/2"
                                // borderStyle="solid"
                                // borderWidth={1}
                                // borderColor={COLOR.inpBorderColor}
                                borderRadius={5}
                                bg={COLOR.white}
                            >
                                <Image source={Images.Car2} resizeMode="contain" alt="car" />
                            </Box>
                        </HStack>
                    </Box> */}
                </Box>
            </ScrollView>

        </Box>
    );
};
export default SecondPage;