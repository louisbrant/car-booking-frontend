import React, { Fragment, useEffect, useState } from 'react'
import { Touchable, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Checkbox, useToast, Spinner } from 'native-base'
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { SliderBox } from 'react-native-image-slider-box'
import normalize from 'react-native-normalize'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { service_book_store } from '../../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const SetScheduleScreen = ({ navigation }) => {
    const Api = useApi()
    const [loading, setLoading] = useState(false)
    const [loadingNext, setLoadingNext] = useState(false)
    const { bookdata, user } = useSelector((store) => store.auth);
    const Toast = useToast();
    const dispatch = useDispatch();
    const [matted, setmatted] = useState(false)
    const [totalPayment, settotalPayment] = useState(0)
    const [ShampooType, setShampooType] = useState(1)
    let [Services, setServices] = useState(JSON.parse(JSON.stringify(LAYOUT.InitialServices)));
    const CalcuPayment = (state, payment, i, mats) => {
        if (i === 'matted') {
            if (matted === mats) {
                return;
            }
            setmatted(mats);
        } else {
            Services[i].checked = state;
        }
        if (state) {
            settotalPayment(totalPayment + payment);
        } else {
            settotalPayment(totalPayment - payment);
        }
    }

    const Next = () => {
        setLoading(true);
        setLoadingNext(true)
        if (totalPayment === 0) {
            return Toast.show({ title: "Please select a service!", placement: 'bottom', status: 'error', w: 400 })
        } else {
            dispatch(service_book_store({
                matted, totalPayment, services: Services
            }));
        }
        navigation.navigate("SetTimeScreen");
        setLoading(false);
        setLoadingNext(false)

    }

    useEffect(() => {
        setLoading(true);
        settotalPayment(() => {
            if (bookdata.packageType === "Full") {
                return LAYOUT.ServicePackages[0].price[bookdata.dogSize];
            } else if (bookdata.packageType === "Mini") {
                return LAYOUT.ServicePackages[1].price[bookdata.dogSize];
            } else {
                return LAYOUT.ServicePackages[2].price[bookdata.dogSize];
            }
        })
        setLoading(false);
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1}>
            {loading && <Loading />}
            <Headers
                title={'SCHEDULE APPOINTMENT'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Stack flex={1} pt={2} px={8} pb={5}>
                    {/* <Stack borderBottomWidth={1} borderColor="gray.300" pb={4}>
                        <Text fontSize="sm" mb={2} color={COLOR.black}>{"Select an organic shampoo"}</Text>
                        <TouchableOpacity onPress={() => setShampooType(1)}>
                            <Stack bg={COLOR.white} borderWidth={2} borderColor={ShampooType === 1 ? COLOR.base : COLOR.bg1} borderRadius={12}>
                                <HStack alignItems="center" p={2}>
                                    <Image size="sm" mr={1} source={Images.Shampoo} resizeMode="contain" />
                                    <Stack borderLeftWidth={1} borderColor="gray.200">
                                        <Text fontSize="xs" pl={4} color={COLOR.base}>{"Lavender & Sweet Almond"}</Text>
                                        <Text fontSize={10} pl={4} color={COLOR.black}>{"Dog Shampoo & Conditioner"}</Text>
                                        <Text fontSize="10px" pl={4} color="gray.400">{"Lorem ipsum dolor sit amet,"}</Text>
                                        <Text fontSize="10px" pl={4} color="gray.400">{"consectetur adipiscing elit"}</Text>
                                    </Stack>
                                </HStack>
                            </Stack>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShampooType(2)}>
                            <Stack bg={COLOR.white} borderWidth={2} borderColor={ShampooType === 2 ? COLOR.base : COLOR.bg1} my={1} borderRadius={12}>
                                <HStack alignItems="center" p={2}>
                                    <Image size="sm" mr={1} source={Images.Shampoo} resizeMode="contain" />
                                    <Stack borderLeftWidth={1} borderColor="gray.200">
                                        <Text fontSize="xs" pl={4} color={COLOR.base}>{"Lavender & Sweet Almond"}</Text>
                                        <Text fontSize={10} pl={4} color={COLOR.black}>{"Dog Shampoo & Conditioner"}</Text>
                                        <Text fontSize="10px" pl={4} color="gray.400">{"Lorem ipsum dolor sit amet,"}</Text>
                                        <Text fontSize="10px" pl={4} color="gray.400">{"consectetur adipiscing elit"}</Text>
                                    </Stack>
                                </HStack>
                            </Stack>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShampooType(3)}>
                            <Stack bg={COLOR.white} my={1} borderWidth={2} borderColor={ShampooType === 3 ? COLOR.base : COLOR.bg1} borderRadius={12}>
                                <HStack alignItems="center" p={2}>
                                    <Image size="sm" mr={1} source={Images.Shampoo} resizeMode="contain" />
                                    <Stack borderLeftWidth={1} borderColor="gray.200">
                                        <Text fontSize="xs" pl={4} color={COLOR.base}>{"Lavender & Sweet Almond"}</Text>
                                        <Text fontSize={10} pl={4} color={COLOR.black}>{"Dog Shampoo & Conditioner"}</Text>
                                        <Text fontSize="10px" pl={4} color="gray.400">{"Lorem ipsum dolor sit amet,"}</Text>
                                        <Text fontSize="10px" pl={4} color="gray.400">{"consectetur adipiscing elit"}</Text>
                                    </Stack>
                                </HStack>
                            </Stack>
                        </TouchableOpacity>
                    </Stack> */}
                    <Stack>
                        <Text fontSize="sm" my={3} color={COLOR.black}>{"Select Add-Ons"}</Text>
                        <Text fontSize={11} color={COLOR.black}>{"Is your dog matted?"}</Text>
                        <HStack my={3}>
                            <Button onPress={() => CalcuPayment(true, 20, "matted", true)} shadow={2} w="25%" bg={matted ? COLOR.base : COLOR.white} colorScheme="orange" borderRadius={15} h={45}><Text fontSize="sm" pt={1} color={matted ? COLOR.white : COLOR.black}>Yes</Text></Button>
                            <Button onPress={() => CalcuPayment(false, 20, "matted", false)} shadow={2} w="25%" bg={!matted ? COLOR.base : COLOR.white} colorScheme="orange" borderRadius={15} h={45} ml={2} ><Text fontSize="sm" pt={1} color={!matted ? COLOR.white : COLOR.black}>No</Text></Button>
                        </HStack>
                        <Text fontSize={10} color="gray.400">+ $20.00</Text>
                        <Stack mt={5} pb={4} borderBottomWidth={1} borderColor="gray.300">

                            {
                                Services.map((item, ids) => {
                                    if (item.type === 0) {
                                        return <HStack key={ids} alignItems="center" justifyContent="space-between" bg={COLOR.white} my={1} p={3} pr={5} w="100%" borderRadius={10}>
                                            <View w="60%" alignItems="flex-start">
                                                <Checkbox
                                                    value={COLOR.base}
                                                    colorScheme="orange"
                                                    aria-label="check"
                                                    size="md"
                                                    onChange={(state) => CalcuPayment(state, item.price, ids)}
                                                    icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                                >
                                                    <Text ml={3} fontSize="xs" color={COLOR.black}>
                                                        {item.name}
                                                    </Text>
                                                </Checkbox>
                                            </View>
                                            <HStack>
                                                <Text fontSize="xs" color={COLOR.black} >${item.price}</Text>
                                            </HStack>
                                        </HStack>
                                    }
                                })
                            }
                        </Stack>
                        <Stack mt={5}>
                            <HStack alignItems="center" mb={2}>
                                <Text fontSize="xs" color={COLOR.black}>Poop butler service</Text>
                                <Text fontSize={10} color="gray.500">  (Only for in home service)</Text>
                            </HStack>
                            {
                                Services.map((item, ids) => {
                                    if (item.type === 1) {
                                        return <HStack key={ids} alignItems="center" justifyContent="space-between" bg={COLOR.white} my={1} p={3} pr={5} w="100%" borderRadius={10}>
                                            <View w="60%" alignItems="flex-start">
                                                <Checkbox
                                                    value={COLOR.base}
                                                    colorScheme="orange"
                                                    aria-label="check"
                                                    size="md"
                                                    onChange={(state) => CalcuPayment(state, item.price, ids)}
                                                    icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                                >
                                                    <Text ml={3} fontSize="xs" color={COLOR.black}>
                                                        {item.name}
                                                    </Text>
                                                </Checkbox>
                                            </View>
                                            <HStack>
                                                <Text fontSize="xs" color={COLOR.black} >${item.price}</Text>
                                            </HStack>
                                        </HStack>
                                    }
                                })
                            }
                        </Stack>
                    </Stack>
                    <HStack alignItems="center" justifyContent="space-between" my={5}>
                        <Text fontSize={10} color={COLOR.black}>Total Amounts</Text>
                        <Text color={COLOR.base} fontSize="lg">${totalPayment}</Text>
                    </HStack>

                    <Button onPress={Next} disabled={loadingNext} variant="ghost" mb={5} bg={COLOR.base} colorScheme="orange" borderRadius={15} h={45}>
                        {
                            loadingNext ? <Spinner size="sm" /> :
                                <Text color={COLOR.white} fontSize="md" pt={1}>Continue</Text>
                        }
                    </Button>
                </Stack>
            </ScrollView>
        </Box >
    )
}

export default SetScheduleScreen