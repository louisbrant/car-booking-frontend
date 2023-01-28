import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity, Dimensions } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, useToast, Spinner, Modal } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { service_book_store } from '../../../redux/actions/authActions';
import { useDispatch } from 'react-redux';
import Swiper from "react-native-swiper";
import * as Location from 'expo-location'
import { counterEvent } from 'react-native/Libraries/Performance/Systrace';

const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync()
    if (!enabled)
        Alert.alert(
            'Location Service not enabled',
            'Please enable your location services to continue',
            [{ text: 'OK' }],
            { cancelable: false }
        )
}

const ServicesScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [loadingNext, setloadingNext] = useState(false);
    const Toast = useToast();
    const dispatch = useDispatch();
    const [serviceType, setserviceType] = useState("home")
    const [petType, setpetType] = useState("dog");
    const [address, setAddress] = useState();
    const [dogSize, setDogSize] = useState();
    const [modalVisible, setModalVisible] = useState(false)
    const [packageType, setpackageType] = useState();
    const Next = () => {
        if (!dogSize) {
            return Toast.show({ title: "Please select dog size!", placement: 'bottom', status: 'error', w: 400 });
        }
        if (!packageType) {
            return Toast.show({ title: "Please select a service package!", placement: 'bottom', status: 'error', w: 400 })
        } else {
            setloadingNext(true)
            if (navigation.state.params) {
                if (navigation.state.params._id) {
                    dispatch(service_book_store({
                        packageType, petType, serviceType, dogSize, _id: navigation.state.params._id, groomplace: address, reschedule: true
                    }));
                } else {
                    dispatch(service_book_store({
                        packageType, petType, serviceType, dogSize, groomplace: address, reschedule: false
                    }));
                }
            } else {
                dispatch(service_book_store({
                    packageType, petType, serviceType, dogSize, groomplace: address, reschedule: false
                }));
            }
            setloadingNext(false)
            navigation.navigate("SetScheduleScreen");
        }
    }

    const ChangePetType = type => {
        setpetType(type);
    }

    const ChangeServiceType = type => {
        setserviceType(type);
    }

    const PackageDom = ({ data }) => {
        return (
            <Box p={4} bgColor={COLOR.white} h={"86%"} borderRadius="xl" shadow={1}>
                <HStack borderBottomWidth={1} borderColor="gray.200" alignItems="center" pb={3} justifyContent="space-between">
                    <Text textAlign="center" fontSize="md" color={COLOR.base} >{data.name}</Text>
                </HStack>
                <Stack>
                    {
                        data.services.map((item, i) => {
                            return <HStack key={i} pt={2}>
                                <HStack alignItems="center">
                                    <Icon color="#2ecc71" size="sm" as={<MaterialCommunityIcons name="checkbox-marked-circle-outline" />} />
                                    <Text fontSize="sm" ml={2} color={COLOR.black}>{item.name}</Text>
                                </HStack>
                            </HStack>
                        })
                    }
                </Stack>
                <HStack pt={4} alignItems="flex-end" justifyContent="space-between" flex={1}>
                    <Button bg={COLOR.base} variant="ghost" onPress={() => setpackageType(data.type)} colorScheme="orange" w="50%" borderRadius={15} h={45}><Text color={COLOR.white} pt={1} fontSize="md">{packageType === data.type ? "Selected" : "Select"}</Text></Button>
                    <Text color={COLOR.black} fontSize="xl" mr={3}>${data.price[dogSize ? dogSize : 1]}</Text>
                </HStack>
            </Box>
        )
    }

    useEffect(() => {
        CheckIfLocationEnabled();
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert(
                    'Permission not granted',
                    'Allow the app to use location service.',
                    [{ text: 'OK' }],
                    { cancelable: false }
                )
            }
            let { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            if (coords) {
                await fetch('http://api.positionstack.com/v1/reverse?access_key=b454a3c464717c71048904a0c104859a&query=' + coords.latitude + ',' + coords.longitude)
                    .then((response) => response.json())
                    .then((json) => {
                        var j = json.data.length;
                        if (!j) {
                            Toast.show({ title: "Appointment of this service is not available in your region.", placement: 'bottom', status: 'error', w: 400 });
                            navigation.navigate("HomeScreen");
                        }

                        if (json.data[0].locality !== "Dallas") {
                            Toast.show({ title: "Appointment of this service is not available in your region.", placement: 'bottom', status: 'error', w: 400 })
                            navigation.navigate("HomeScreen");
                        }
                        setAddress(json.data[0].label);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.error(error);
                    });
            } 
        })();
    }, [])

    return (
        <Box flex={1} bg={COLOR.bg1}>
            {loading && <Loading />}
            <Headers
                title={'SCHEDULE APPOINTMENT'}
                left={
                    <TouchableOpacity onPress={navigation.openDrawer}>
                        <Icon borderRadius={8} bg={COLOR.base} size='md' >{LAYOUT.drawerIcon}</Icon>
                    </TouchableOpacity>
                }
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Stack flex={1} pt={2} px={8} pb={5}>
                    <Stack>
                        {/* <Text fontSize="sm" color={COLOR.black}>{"Where do you like the service?"}</Text>
                        <HStack p={4} borderBottomWidth={2} borderColor="gray.200">
                            <HStack w="50%">
                                <TouchableOpacity onPress={() => ChangeServiceType("home")}>
                                    <HStack alignItems="center">
                                        <Icon bgColor={serviceType === "home" ? COLOR.base : COLOR.white} size='sm' borderColor={COLOR.base} borderWidth={1} borderRadius={100} w="42px" h="42px" viewBox="-18 -14 70 70">{LAYOUT.ServiceIcon1}</Icon>
                                        <Text fontSize="sm" ml={2} color={COLOR.black}>{"In Home"}</Text>
                                    </HStack>
                                </TouchableOpacity>
                            </HStack>
                            <HStack w="50%">
                                <TouchableOpacity onPress={() => ChangeServiceType("mobile")}>
                                    <HStack alignItems="center">
                                        <Icon bgColor={serviceType === "mobile" ? COLOR.base : COLOR.white} borderColor={COLOR.base} borderWidth={1} w="42px" h="42px" size='sm' borderRadius={100} viewBox="-16 -19 70 70">{LAYOUT.ServiceIcon2}</Icon>
                                        <Text fontSize="sm" ml={2} color={COLOR.black}>{"Mobile Van"}</Text>
                                    </HStack>
                                </TouchableOpacity>
                            </HStack>
                        </HStack> */}
                        <Text fontSize="sm" mt={3} color={COLOR.black}>{"Select Pet"}</Text>
                        <HStack p={4} borderBottomWidth={2} borderColor="gray.200">
                            <HStack w="50%">
                                <TouchableOpacity onPress={() => { ChangePetType("dog"); if (dogSize === 5) { setDogSize() }; setModalVisible(true) }}>
                                    <HStack alignItems="center">
                                        <Icon bgColor={petType === "dog" ? COLOR.base : COLOR.white} borderColor={COLOR.base} borderWidth={1} size='sm' borderRadius={100} w="42px" h="42px" viewBox="-20 -14 66 66">{LAYOUT.ServiceIcon3}</Icon>
                                        <Text fontSize="sm" ml={2} color={COLOR.black}>{"Dog"}</Text>
                                    </HStack>
                                </TouchableOpacity>
                            </HStack>
                            <HStack w="50%">
                                <TouchableOpacity onPress={() => { ChangePetType("cat"); setDogSize(5) }}>
                                    <HStack alignItems="center">
                                        <Icon bgColor={petType === "cat" ? COLOR.base : COLOR.white} borderColor={COLOR.base} borderWidth={1} w="42px" h="42px" size='sm' borderRadius={100} viewBox="-21 -17 70 70">{LAYOUT.ServiceIcon4}</Icon>
                                        <Text fontSize="sm" ml={2} color={COLOR.black}>{"Cat"}</Text>
                                    </HStack>
                                </TouchableOpacity>
                            </HStack>
                        </HStack>
                    </Stack>
                    <Stack>
                        <Text fontSize="sm" my={3} color={COLOR.black}>{"Choose a Service Package"}</Text>
                        <Swiper loop={false} style={{ height: 470 }} dotStyle={{ borderWidth: 1, borderColor: COLOR.base }} dotColor={COLOR.white} activeDotColor={COLOR.base}>
                            {
                                LAYOUT.ServicePackages.map((item, i) => (<PackageDom key={i} data={item} />))
                            }
                        </Swiper>
                        <Button
                            mb={8}
                            variant="ghost"
                            bg={COLOR.base}
                            onPress={Next}
                            colorScheme="orange"
                            borderRadius={15}
                            h={45}
                            disabled={loadingNext}
                        >

                            {loadingNext ?
                                <Spinner size='sm' /> :
                                <Text pt={1} fontSize="md" color={COLOR.white} >Continue</Text>
                            }

                        </Button>
                    </Stack>
                </Stack>
            </ScrollView>
            <Footers routeName={`ServicesScreen`} />
            <Modal isOpen={modalVisible} onClose={setModalVisible} size="lg">
                <Modal.Content bgColor={COLOR.bg1}>
                    <Modal.Header _text={{ marginTop: -1, textAlign: "center", color: COLOR.base }} >SELECT DOG SIZE</Modal.Header>
                    <Modal.Body>
                        <Stack space={5} mt={3}>
                            <HStack px={3}>
                                <HStack w="50%">
                                    <TouchableOpacity onPress={() => { setDogSize(0); setModalVisible(false) }}>
                                        <HStack space={3} alignItems="center">
                                            <Image w={6} resizeMode="contain" source={dogSize === 0 ? Images.ActiveDogSize : Images.DogSize} />
                                            <Stack justifyContent="center" space={2}>
                                                <Text fontSize="xs" bold>Small</Text>
                                                <Text fontSize="xs">{"1~15 LBS"}</Text>
                                            </Stack>
                                        </HStack>
                                    </TouchableOpacity>
                                </HStack>
                                <HStack w="50%">
                                    <TouchableOpacity onPress={() => { setDogSize(1); setModalVisible(false) }}>
                                        <HStack space={3} alignItems="center">
                                            <Image w={8} resizeMode="contain" source={dogSize === 1 ? Images.ActiveDogSize : Images.DogSize} />
                                            <Stack justifyContent="center" space={2}>
                                                <Text fontSize="xs" bold>Medium</Text>
                                                <Text fontSize="xs">{"16~30 LBS"}</Text>
                                            </Stack>
                                        </HStack>
                                    </TouchableOpacity>
                                </HStack>
                            </HStack>
                            <HStack px={3}>
                                <HStack w="50%">
                                    <TouchableOpacity onPress={() => { setDogSize(2); setModalVisible(false) }}>
                                        <HStack space={3} alignItems="center">
                                            <Image w={8} resizeMode="contain" source={dogSize === 2 ? Images.ActiveDogSize : Images.DogSize} />
                                            <Stack justifyContent="center" space={2}>
                                                <Text fontSize="xs" bold>Large</Text>
                                                <Text fontSize="xs">{"31~50 LBS"}</Text>
                                            </Stack>
                                        </HStack>
                                    </TouchableOpacity>
                                </HStack>
                                <HStack w="50%">
                                    <TouchableOpacity onPress={() => { setDogSize(3); setModalVisible(false) }}>
                                        <HStack space={3} alignItems="center">
                                            <Image w={9} resizeMode="contain" source={dogSize === 3 ? Images.ActiveDogSize : Images.DogSize} />
                                            <Stack justifyContent="center" space={2}>
                                                <Text fontSize="xs" bold>X-Large</Text>
                                                <Text fontSize="xs">{"51~100 LBS"}</Text>
                                            </Stack>
                                        </HStack>
                                    </TouchableOpacity>
                                </HStack>
                            </HStack>
                            <HStack px={3} justifyContent="flex-start">
                                <HStack w="50%">
                                    <TouchableOpacity onPress={() => { setDogSize(4); setModalVisible(false) }}>
                                        <HStack space={3} alignItems="center">
                                            <Image w={10} resizeMode="contain" source={dogSize === 4 ? Images.ActiveDogSize : Images.DogSize} />
                                            <Stack justifyContent="center" space={2}>
                                                <Text fontSize="xs" bold>XX-Large</Text>
                                                <Text fontSize="xs">{"101~150 LBS"}</Text>
                                            </Stack>
                                        </HStack>
                                    </TouchableOpacity>
                                </HStack>
                            </HStack>
                        </Stack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Box>
    )
}

export default ServicesScreen