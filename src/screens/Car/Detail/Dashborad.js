import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet } from "native-base";
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons"

import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

import { COLOR, Images, LAYOUT } from "../../../constants";

const Dashboard = ({ navigation }) => {

    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        setIsOpen(false);
    }

    const onBookNow = () => {
        setIsOpen(true);
    }

    const onContinue = useCallback(() => {
        setIsOpen(false);
        navigation.navigate("DetailRequestScreen")
    }, [isOpen])


    return (
        <Box
            flex={1}
            bg={{
                linearGradient: {
                    colors: ['#FFFFFF', '#F3F3F3'],
                    start: [0, 0],
                    end: [0, 1]
                }
            }}
        >
            <Image source={Images.DetailDashboard} resizeMode="cover" width="100%" height="100%" alt="image" />
            <Center position="absolute" w="full">
                <Box pt={10} pb={2} px={5} bg="transparent" w="full" >
                    <Stack direction="row" alignItems="center">
                        <View style={{ position: 'absolute' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon color={COLOR.white} size="md" as={<Ionicons name="arrow-back" />} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text
                                color={COLOR.white}
                                fontWeight="semibold"
                                fontSize="md"
                            >Lamborghini</Text>
                        </View>
                    </Stack>
                </Box>
            </Center>
            <Box
                style={{
                    position: 'absolute',
                    bottom: 35,
                    width: '100%',
                    display: 'flex',

                }}
                px={5}
            >
                <Box
                    style={{
                        width: '100%',
                        backgroundColor: 'rgba(62, 62, 66, 0.6)',
                        backdropFilter: 'blur(19px)',
                        borderRadius: 10,
                    }}
                    p={3}
                >
                    <HStack>
                        <VStack space={1} w="1/4">
                            <Text
                                color={COLOR.white}
                                fontWeight="semibold"
                                fontSize="sm"
                            >V12</Text>
                            <HStack alignItems="center" space={1}>
                                <Icon color={COLOR.white} size="sm">
                                    {LAYOUT.engineIcon1}
                                </Icon>
                                <Text
                                    color={COLOR.inPlaceholder}
                                    fontWeight="medium"
                                    fontSize="xs"
                                >
                                    Engine
                                </Text>
                            </HStack>
                        </VStack>
                        <VStack space={1} w="1/4">
                            <Text
                                color={COLOR.white}
                                fontWeight="semibold"
                                fontSize="sm"
                            >2</Text>
                            <HStack alignItems="center" space={1}>
                                <Icon color={COLOR.white} size="sm">
                                    {LAYOUT.seatIcon1}
                                </Icon>
                                <Text
                                    color={COLOR.inPlaceholder}
                                    fontWeight="medium"
                                    fontSize="xs"
                                >
                                    Seats
                                </Text>
                            </HStack>
                        </VStack>
                        <VStack space={1} w="1/4">
                            <Text
                                color={COLOR.white}
                                fontWeight="semibold"
                                fontSize="sm"
                            >2</Text>
                            <HStack alignItems="center" space={1}>
                                <Icon color={COLOR.white} size="sm">
                                    {LAYOUT.doorIcon1}
                                </Icon>
                                <Text
                                    color={COLOR.inPlaceholder}
                                    fontWeight="medium"
                                    fontSize="xs"
                                >
                                    Doors
                                </Text>
                            </HStack>
                        </VStack>
                        <VStack space={1} w="1/4">
                            <Text
                                color={COLOR.white}
                                fontWeight="semibold"
                                fontSize="sm"
                            >Automatic</Text>
                            <HStack alignItems="center" space={1}>
                                <Icon color={COLOR.white} size="sm">
                                    {LAYOUT.gearIcon1}
                                </Icon>
                                <Text
                                    color={COLOR.inPlaceholder}
                                    fontWeight="medium"
                                    fontSize="xs"
                                >
                                    Gear
                                </Text>
                            </HStack>
                        </VStack>
                    </HStack>
                </Box>

                <TouchableOpacity onPress={onBookNow}>
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
                            Book Now
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Box w="100%" bg={COLOR.white}>
                        <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                            <Box w="full" p={3} pb={10}>

                                <HStack justifyContent="flex-start">
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="semibold"
                                        fontSize="md"
                                    >Lamborghini Urus 2022</Text>
                                </HStack>

                                <HStack space={2} style={{ alignItems: 'center' }} mt={1}>
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

                                <Stack alignItems="center" justifyContent='center' pb={1}>
                                    <Swiper
                                        // style={styles.wrapper}
                                        height={240}
                                        loop={false}
                                        showsButtons={false}
                                        dot={
                                            <View
                                                style={{
                                                    backgroundColor: 'rgba(24, 91, 222, 0.2)',
                                                    width: 5,
                                                    height: 5,
                                                    borderRadius: 4,
                                                    marginLeft: 3,
                                                    marginRight: 3,
                                                    marginTop: 3,
                                                    marginBottom: 3
                                                }}
                                            />
                                        }
                                        activeDot={
                                            <View
                                                mt={-5}
                                                style={{
                                                    backgroundColor: 'rgba(24, 91, 222, 1)',
                                                    width: 5,
                                                    height: 5,
                                                    borderRadius: 4,
                                                    marginLeft: 3,
                                                    marginRight: 3,
                                                    marginTop: 3,
                                                    marginBottom: 3
                                                }}
                                            />
                                        }
                                        paginationStyle={{
                                            bottom: 15,
                                            // left: null,
                                            // right: null
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                backgroundColor: 'transparent',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Image
                                                resizeMode="contain"
                                                style={{
                                                    width: width - 100,
                                                    flex: 1
                                                }}
                                                source={Images.Slider1}
                                            />
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                backgroundColor: 'transparent',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Image
                                                resizeMode="contain"
                                                style={{
                                                    width: width - 100,
                                                    flex: 1
                                                }}
                                                source={Images.Slider1}
                                            />
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                backgroundColor: 'transparent',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Image
                                                resizeMode="contain"
                                                style={{
                                                    width: width - 100,
                                                    flex: 1
                                                }}
                                                source={Images.Slider1}
                                            />
                                        </View>
                                        <View
                                            style={{
                                                flex: 1,
                                                backgroundColor: 'transparent',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Image
                                                resizeMode="contain"
                                                style={{
                                                    width: width - 100,
                                                    flex: 1
                                                }}
                                                source={Images.Slider1}
                                            />
                                        </View>
                                    </Swiper>
                                </Stack>

                                <HStack mt={1}>
                                    <Text
                                        color={COLOR.black}
                                        fontWeight="semibold"
                                        fontSize="sm"
                                        textTransform="uppercase"
                                    >Car Details</Text>
                                </HStack>

                                <VStack mt={3} space={2}>
                                    <HStack>
                                        <VStack space={1} w="1/3">
                                            <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">V8 Engine</Text>
                                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Engine</Text>
                                        </VStack>
                                        <VStack space={1} w="1/3">
                                            <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">4 Seats</Text>
                                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Seats</Text>
                                        </VStack>
                                        <VStack space={1} w="1/3">
                                            <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">4 Doors</Text>
                                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Doors</Text>
                                        </VStack>
                                    </HStack>
                                    <HStack>
                                        <VStack space={1} w="1/3">
                                            <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">Premium Gas</Text>
                                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Fuel</Text>
                                        </VStack>
                                        <VStack space={1} w="1/3">
                                            <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">14MPG</Text>
                                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Mileage</Text>
                                        </VStack>
                                        <VStack space={1} w="1/3">
                                            <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">Automatic</Text>
                                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Gear</Text>
                                        </VStack>
                                    </HStack>
                                </VStack>

                                <VStack mt={3} space={1}>
                                    <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs">FEATURES</Text>
                                    <HStack alignItems="center" justifyContent="space-between">
                                        <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">Leather Seats</Text>
                                        <Box style={{ width: 4, height: 4, borderRadius: 4, backgroundColor: COLOR.inPlaceholder }} />
                                        <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">Heated Seats</Text>
                                        <Box style={{ width: 4, height: 4, borderRadius: 4, backgroundColor: COLOR.inPlaceholder }} />
                                        <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">Electric Power Steering</Text>
                                    </HStack>
                                </VStack>

                                <HStack mt={3} alignItems="center" justifyContent="space-between">
                                    <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">Pick up & Drop off</Text>
                                    <TouchableOpacity>
                                        <Text color={COLOR.IBasePlaceholder} fontWeight="semibold" fontSize="xs">Edit</Text>
                                    </TouchableOpacity>
                                </HStack>

                                <Box
                                    mt={3}
                                    p={3}
                                    style={{
                                        borderStyle: 'solid',
                                        borderWidth: 1,
                                        borderColor: COLOR.inpBorderColor,
                                        borderRadius: 5,
                                    }}
                                >
                                    <HStack alignItems="center" justifyContent="space-between">
                                        <VStack>
                                            <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">Nowhere Airport</Text>
                                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                                                Sat, 11 Jun 22, 10:00
                                            </Text>
                                        </VStack>
                                        <Icon color={COLOR.inIconColor} size="xs" as={<AntDesign name="right" />} />
                                        <VStack>
                                            <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">Gatewick Airport</Text>
                                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                                                Sat, 11 Jun 22, 10:00
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>

                                <VStack mt={3} space={1}>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Includes 100miles per day</Text>
                                    <Text color={COLOR.IBase} fontWeight="medium" fontSize={8}>$5 fee per additional mile</Text>
                                </VStack>

                                <VStack mt={3} space={1}>
                                    <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">requirements</Text>
                                    <VStack space={1}>
                                        <HStack alignItems="center" space={2}>
                                            <Icon color={COLOR.IBase} size="xs" as={<Ionicons name="checkbox" />} />
                                            <Text fontWeight="semibold" fontSize="xs">Valid ID and Insurance</Text>
                                        </HStack>
                                        <HStack alignItems="center" space={2}>
                                            <Icon color={COLOR.IBase} size="xs" as={<Ionicons name="checkbox" />} />
                                            <Text fontWeight="semibold" fontSize="xs">2k refundable hold</Text>
                                        </HStack>
                                    </VStack>
                                </VStack>

                                <VStack mt={3} space={1}>
                                    <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">Host Details</Text>
                                    <HStack alignItems="center" space={2}>
                                        <Avatar bg="green.500" alignSelf="center" size="sm" source={Images.User1} />
                                        <VStack justifyContent="center" space={1}>
                                            <Text fontWeight="semibold" fontSize="xs">John Smith</Text>
                                            <HStack alignItems="center">
                                                <Icon color={COLOR.inPlaceholder} size="xs" as={<EvilIcons name="location" />} />
                                                <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Houston, Texas</Text>
                                            </HStack>
                                        </VStack>
                                    </HStack>
                                </VStack>

                                <VStack mt={3} space={1}>
                                    <HStack alignItems="center" justifyContent="space-between">
                                        <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">Reviews</Text>
                                        <TouchableOpacity>
                                            <Text color={COLOR.IBasePlaceholder} fontWeight="semibold" fontSize="xs">View all</Text>
                                        </TouchableOpacity>
                                    </HStack>
                                    <VStack space={2}>

                                        <VStack
                                            space={1}
                                            pb={2}
                                            style={{
                                                borderStyle: "solid",
                                                borderBottomWidth: 1,
                                                borderColor: COLOR.inpBorderColor,
                                            }}
                                        >
                                            <HStack justifyContent="space-between" alignItems="flex-start">
                                                <HStack alignItems="center" space={2}>
                                                    <Avatar bg="green.500" alignSelf="center" size="sm" source={Images.User2} />
                                                    <VStack justifyContent="center" space={1}>
                                                        <Text fontWeight="semibold" fontSize="xs">Scott Bailey</Text>
                                                        <HStack alignItems="center">
                                                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">2 hours ago</Text>
                                                        </HStack>
                                                    </VStack>
                                                </HStack>

                                                <HStack space={2} style={{ alignItems: 'center' }} mt={1}>
                                                    <FontAwesome name="star" size={14} color={COLOR.yellow} />
                                                    <HStack space={1}>
                                                        <Text
                                                            color={COLOR.black}
                                                            fontWeight="semibold"
                                                            fontSize="xs"
                                                        >5.0</Text>
                                                    </HStack>
                                                </HStack>
                                            </HStack>
                                            <Text color={COLOR.inIconColor} fontWeight="medium" fontSize="xs">
                                                Best car service I’ve ever had
                                            </Text>
                                        </VStack>

                                        <VStack pb={2} space={1}>
                                            <HStack justifyContent="space-between" alignItems="flex-start">
                                                <HStack alignItems="center" space={2}>
                                                    <Avatar bg="green.500" alignSelf="center" size="sm" source={Images.User3} />
                                                    <VStack justifyContent="center" space={1}>
                                                        <Text fontWeight="semibold" fontSize="xs">Gabriel Bertin</Text>
                                                        <HStack alignItems="center">
                                                            <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">2 hours ago</Text>
                                                        </HStack>
                                                    </VStack>
                                                </HStack>

                                                <HStack space={2} style={{ alignItems: 'center' }} mt={1}>
                                                    <FontAwesome name="star" size={14} color={COLOR.yellow} />
                                                    <HStack space={1}>
                                                        <Text
                                                            color={COLOR.black}
                                                            fontWeight="semibold"
                                                            fontSize="xs"
                                                        >5.0</Text>
                                                    </HStack>
                                                </HStack>
                                            </HStack>
                                            <Text color={COLOR.inIconColor} fontWeight="medium" fontSize="xs">
                                                I use to use turo and I’ve made the switch to izra
                                            </Text>
                                        </VStack>

                                    </VStack>
                                </VStack>

                                <HStack mt={3} alignItems="center">
                                    <VStack space={1} w="1/2">
                                        <Text color={COLOR.inPlaceholder} fontWeight="semibold" fontSize="xs" textTransform="uppercase">total</Text>
                                        <Text color={COLOR.IBase} fontWeight="bold" fontSize="md">
                                            $100/day
                                        </Text>
                                    </VStack>
                                    <Box w="1/2">
                                        <TouchableOpacity onPress={onContinue}>
                                            <Box
                                                w="full"
                                                h={45}
                                                py={2}
                                                style={{
                                                    backgroundColor: COLOR.IBase,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 5,
                                                }}
                                            >
                                                <Text color={COLOR.white} fontWeight="bold" fontSize="md">Continue</Text>
                                            </Box>
                                        </TouchableOpacity>
                                    </Box>

                                </HStack>
                            </Box>
                        </ScrollView>
                    </Box>
                </Actionsheet.Content >
            </Actionsheet >
        </Box >
    )
}

export default Dashboard;