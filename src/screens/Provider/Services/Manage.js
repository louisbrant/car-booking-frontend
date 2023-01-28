import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, Checkbox, Modal, TextArea, useToast, Spinner } from 'native-base'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from "@react-native-community/datetimepicker";
import moment from 'moment'
import { useSelector } from 'react-redux'

import CurrencyInput from 'react-native-currency-input';

const ManageScreen = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast();
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [AppointData, setAppointData] = useState(false)
    const [ServiceName, setServiceName] = useState('')
    const [ServiceDescription, setServiceDescription] = useState('')
    const [ServicePrice, setServicePrice] = useState(0)
    const [SType, setSType] = useState(0)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    // const [pettype, setpettype] = useState(navigation.state.params ? navigation.state.params.pettype : { "dog": true, "cat": false });
    // const [servicetype, setservicetype] = useState(navigation.state.params ? navigation.state.params.servicetype : {});
    const [SelectedWeek, setSelectedWeek] = useState()
    const [SelectedM, setSelectedM] = useState()
    const [Rerender, SetRerender] = useState(false);
    let openingHours = navigation.state.params ? navigation.state.params.openingHours : LAYOUT.DefaultTimes;
    let services = navigation.state.params ? navigation.state.params.services : LAYOUT.InitialServices;
    const { user } = useSelector((store) => store.auth);

    const openModal = (type) => {
        setSType(type)
        setOpen(true)
    }
    const closeModal = (placement) => {
        if (ServiceName && ServiceDescription && ServicePrice) {
            services.push({
                name: ServiceName,
                description: ServiceDescription,
                price: ServicePrice,
                type: SType,
                checked: true
            });
            setServiceName('')
            setServiceDescription('')
            setServicePrice(0)
            setOpen(false)
        } else {
            return Toast.show({ title: 'Something was wrong!', placement: 'top', status: 'error' , w: 400  })
        }
    }

    const showDatePicker = (week, M) => {
        setSelectedWeek(week);
        setSelectedM(M);
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const stateChange = (key) => {
        openingHours[key].status = !openingHours[key].status;
        SetRerender(!Rerender);
    };

    const toChange = (key, val) => {
        openingHours[key].to = val;
        SetRerender(!Rerender);
        return;
    };

    const fromChange = (key, val) => {
        openingHours[key].from = val;
        SetRerender(!Rerender);
        return;
    };

    // const changeservicetype = (state, type) => {
    //     setservicetype(prev => (
    //         {
    //             ...prev,
    //             [type]: state
    //         }
    //     ))
    // }

    // const changepettype = (state, type) => {
    //     setpettype(prev => (
    //         {
    //             ...prev,
    //             [type]: state
    //         }
    //     ))
    // }


    const handleConfirm = (date) => {
        let time = moment(date).format('hh:mm');
        hideDatePicker();
        if (SelectedM === 0) {
            fromChange(SelectedWeek, time);
        } else {
            toChange(SelectedWeek, time);
        }
    };

    const ChangeChecked = (state, index) => {
        services[index].checked = state;
    }

    const SaveData = () => {
        // if (servicetype.home || servicetype.mobile) {
        // if (pettype.dog || pettype.cat) {
        if (services.length !== 0) {
            setLoading(true);
            // Api.Edit_service({ servicetype, services, pettype, openingHours, groomer: user.email }).then((response) => {
            if (navigation.state.params) {
                Api.Edit_service({ services, openingHours, groomer: user.email }).then((response) => {
                    if (response.status) {
                        Toast.show({ title: "Edit successed!", placement: 'bottom', status: 'success', w: 400  })
                        setLoading(false);
                        return navigation.navigate("ServicesScreen", 111);
                    } else {
                        setLoading(false);
                        return Toast.show({ title: 'Network error.', placement: 'bottom', status: 'error' , w: 400  })
                    }
                })
            } else {
                Api.Register_Service({ services, openingHours, groomer: user.email }).then((response) => {
                    if (response.data.status) {
                        Toast.show({ title: "Edit successed!", placement: 'bottom', status: 'success', w: 400  })
                        setLoading(false);
                        return navigation.navigate("ServicesScreen", 111);
                    } else {
                        setLoading(false);
                        return Toast.show({ title: 'Network error.', placement: 'bottom', status: 'error' , w: 400  })
                    }
                })
            }
        } else {
            return Toast.show({ title: 'Something was wrong!', placement: 'bottom', status: 'error' , w: 400  })
        }
        // } else {
        //     return Toast.show({ title: 'Something was wrong!', placement: 'bottom', status: 'error' , w: 400  })
        // }
        // } else {
        //     return Toast.show({ title: 'Something was wrong!', placement: 'bottom', status: 'error' , w: 400  })
        // }
    }

    const LoadAppointData = () => {
        // setLoading(true)
        // Api.LoadAppointData().then(({ data }) => {
        //     setLoading(false)
        //     setAppointData(data.data)
        // }).catch(error => {
        //     setLoading(false)
        //     console.log(`LoadAppointData`, error)
        // })
    }

    const styles = {
        bottom: {
            marginBottom: 12,
            marginTop: "auto",
        },
    }

    useEffect(() => {
        LoadAppointData()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {/* {loading && <Loading />} */}
            <Headers
                title={"Manage your services"}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={2} flex={1}>
                <Stack flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* <Text fontSize="xs" mt={3} mb={2} color={COLOR.black}>Your prefer service type</Text>
                        <HStack borderBottomWidth={1} borderColor="gray.300" pb={4}>
                            <Checkbox
                                value={COLOR.base}
                                colorScheme="orange"
                                aria-label="check"
                                size="md"
                                onChange={(state) => changeservicetype(state, "home")}
                                icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                defaultIsChecked={servicetype.home}
                            >
                                <Text ml={3} fontSize="xs" color={COLOR.black}>
                                    In Home
                                </Text>
                            </Checkbox>
                            <Checkbox
                                ml={3}
                                value={COLOR.base}
                                colorScheme="orange"
                                aria-label="check"
                                onChange={(state) => changeservicetype(state, "mobile")}
                                size="md"
                                icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                defaultIsChecked={servicetype.mobile}

                            >
                                <Text ml={3} fontSize="xs" color={COLOR.black}>
                                    Mobile Van
                                </Text>
                            </Checkbox>
                        </HStack> */}
                        {/* <Text fontSize="xs" mt={5} mb={2} color={COLOR.black}>Which pets do you provinding services?</Text>
                        <HStack>
                            <Checkbox
                                value={COLOR.base}
                                colorScheme="orange"
                                aria-label="check"
                                onChange={(state) => changepettype(state, "dog")}
                                size="md"
                                icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                defaultIsChecked={pettype.dog}
                            >
                                <Text ml={3} fontSize="xs" color={COLOR.black}>
                                    Dogs
                                </Text>
                            </Checkbox>
                            <Checkbox
                                ml={3}
                                value={COLOR.base}
                                colorScheme="orange"
                                aria-label="check"
                                onChange={(state) => changepettype(state, "cat")}
                                size="md"
                                defaultIsChecked={pettype.cat}
                                icon={<Icon as={<AntDesign name="checksquareo" />} />}
                            >
                                <Text ml={3} fontSize="xs" color={COLOR.black}>
                                    Cats
                                </Text>
                            </Checkbox>
                        </HStack> */}
                        <Text color={COLOR.black} my={3} fontSize="lg">Manage services</Text>
                        <Stack mb={5} borderBottomWidth={1} borderColor="gray.300" pb={2}>
                            {
                                services.map((item, ids) => {
                                    if (item.type === 0) {
                                        return <HStack key={ids} alignItems="center" justifyContent="space-between" bg={COLOR.white} my={1} p={3} pr={5} w="100%" borderRadius={10}>
                                            <View w="60%" alignItems="flex-start">
                                                <Checkbox
                                                    value={COLOR.base}
                                                    colorScheme="orange"
                                                    aria-label="check"
                                                    size="md"
                                                    onChange={(state) => ChangeChecked(state, ids)}
                                                    icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                                    defaultIsChecked={item.checked}
                                                >
                                                    <Text ml={3} fontSize="xs" color={COLOR.black}>
                                                        {item.name}
                                                    </Text>
                                                </Checkbox>
                                            </View>
                                            <HStack>
                                                <Text fontSize="xs" color={COLOR.black} >${item.price}</Text>
                                            </HStack>
                                            <Icon size="xs" borderRadius={100} bg="gray.100" as={<Entypo name="chevron-right" />} />
                                        </HStack>
                                    }
                                })
                            }
                            <TouchableOpacity onPress={() => openModal(0)}>
                                <HStack alignItems="center" justifyContent="center" my={3} >
                                    <Icon size="sm" color={COLOR.black} as={<Ionicons name="add-circle-outline" />} />
                                    <Text fontSize="xs" pt={1} color={COLOR.black}>   Add Service</Text>
                                </HStack>
                            </TouchableOpacity>
                        </Stack>
                        <Text fontSize="xs" color={COLOR.black}>Which pets do you provinding services?</Text>
                        <Text fontSize="xs" color="gray.500">(Only for in home service)</Text>
                        <Stack my={3}>
                            {
                                services.map((item, ids) => {
                                    if (item.type === 1) {
                                        return <HStack key={ids} alignItems="center" justifyContent="space-between" bg={COLOR.white} my={1} p={3} pr={5} w="100%" borderRadius={10}>
                                            <View w="60%" alignItems="flex-start">
                                                <Checkbox
                                                    value={COLOR.base}
                                                    colorScheme="orange"
                                                    aria-label="check"
                                                    size="md"
                                                    onChange={(state) => ChangeChecked(state, ids)}
                                                    icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                                    defaultIsChecked={item.checked}
                                                >
                                                    <Text ml={3} fontSize="xs" color={COLOR.black}>
                                                        {item.name}
                                                    </Text>
                                                </Checkbox>
                                            </View>
                                            <HStack>
                                                <Text fontSize="xs" color={COLOR.black} >${item.price}</Text>
                                            </HStack>
                                            <Icon size="xs" borderRadius={100} bg="gray.100" as={<Entypo name="chevron-right" />} />
                                        </HStack>
                                    }
                                })
                            }
                            <TouchableOpacity onPress={() => openModal(1)}>
                                <HStack alignItems="center" justifyContent="center" my={3} >
                                    <Icon size="sm" color={COLOR.black} as={<Ionicons name="add-circle-outline" />} />
                                    <Text fontSize="xs" pt={1} color={COLOR.black}>   Add Service</Text>
                                </HStack>
                            </TouchableOpacity>
                        </Stack>
                        <Text color={COLOR.black} fontSize="lg">Your Opening Hours</Text>
                        <Text fontSize={13} color="gray.500">When can clients book with you?</Text>
                        <Stack mt={5} >
                            {
                                Object.keys(openingHours).map((item, ids) => {
                                    return <HStack key={ids} alignItems="center" justifyContent="space-between" bg={COLOR.white} my={1} p={3} pr={5} w="100%" borderRadius={10}>
                                        <View w="40%" alignItems="flex-start">
                                            <Checkbox
                                                onChange={() => stateChange(item)}
                                                value={COLOR.base}
                                                colorScheme="orange"
                                                aria-label="check"
                                                size="md"
                                                icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                                defaultIsChecked={openingHours[item].status}
                                            >
                                                <Text ml={3} fontSize="xs" color={COLOR.black}>
                                                    {item}
                                                </Text>
                                            </Checkbox>
                                        </View>
                                        <HStack>
                                            <Text fontSize="xs" onPress={() => showDatePicker(item, 0)} color={COLOR.black} >{openingHours[item].from}</Text>
                                            <Text fontSize="xs" color={COLOR.black} > - </Text>
                                            <Text fontSize="xs" onPress={() => showDatePicker(item, 1)} color={COLOR.black} >{openingHours[item].to}</Text>
                                        </HStack>
                                        <Icon size="xs" borderRadius={100} bg="gray.100" as={<Entypo name="chevron-right" />} />
                                    </HStack>
                                })
                            }
                        </Stack>
                        <Button
                            my={12}
                            variant="ghost"
                            bg={COLOR.base}
                            onPress={SaveData}
                            h={45}
                            colorScheme="orange"
                            borderRadius={15}
                            disabled={loading}
                        >
                            {
                                loading ?
                                    <Spinner size="sm" /> :
                                    <Text fontSize="md" pt={1} color={COLOR.white}>Save</Text>
                            }
                        </Button>
                    </ScrollView>
                    {
                        isDatePickerVisible &&
                        <DateTimePickerModal
                            mode="time"
                            onChange={(a, b) => handleConfirm(b)}
                            is24Hour={true}
                            value={new Date()}
                        />
                    }
                    <Modal isOpen={open} onClose={() => setOpen(false)} mt={12} size="full">
                        <Modal.Content maxWidth="400px" {...styles["bottom"]}>
                            <Modal.CloseButton />
                            <Modal.Body>
                                <Text fontSize="lg" color={COLOR.black}>Add New Service</Text>
                                <Text fontSize="xs" color="gray.700">You can add more details of the service later.</Text>
                                <Input h={45} mt={3} onChangeText={setServiceName} size="sm" borderRadius={15} bg={COLOR.white} py={10} _focus={{ borderColor: "gray.200" }} placeholder="Service Name"
                                    _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                                />
                                <TextArea bg={COLOR.white} onChangeText={setServiceDescription} placeholderTextColor="gray.400" size="sm" textAlignVertical='top' _focus={{ borderColor: "gray.300" }} h={32} borderRadius={15} placeholder="Service Description" my={3} />

                                <CurrencyInput
                                    value={ServicePrice}
                                    onChangeValue={setServicePrice}
                                    prefix="$"
                                    delimiter=","
                                    separator="."
                                    precision={2}
                                    style={{ backgroundColor: "white", height: 45, borderWidth: 1, borderColor: "#e4e4e7", borderRadius: 15, paddingLeft: 15 }}
                                />

                                <Button mt={16} mb={3} bg={COLOR.base} variant="ghost" onPress={closeModal} h={45} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.white}>Save</Text></Button>

                            </Modal.Body>
                        </Modal.Content>
                    </Modal>
                </Stack>
            </Box>
        </Box>
    )
}

export default ManageScreen