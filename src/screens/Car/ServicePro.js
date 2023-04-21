import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, Checkbox, Modal, TextArea, useToast } from 'native-base'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../components'
import { COLOR, Images, LAYOUT } from '../../constants'
import { useApi } from '../../redux/services'
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { register_service_store } from '../../redux/actions/authActions'
import { useDispatch } from 'react-redux'
import CurrencyInput from 'react-native-currency-input';

const ServiceProScreen = ({ navigation }) => {
    const Api = useApi()
    const dispatch = useDispatch()
    const Toast = useToast()
    const { service } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    let [Services, setServices] = useState(LAYOUT.InitialServices);
    const [ServiceName, setServiceName] = useState('')
    const [ServiceDescription, setServiceDescription] = useState('')
    const [ServicePrice, setServicePrice] = useState(0)
    const [ServiceType, setServiceType] = useState(0)
    const [ServicePackage, setServicePackage] = useState({
        Full: true,
        Mini: false,
        Bath: false,
    })
    const [Type, setType] = useState({
        dog: true,
        cat: false
    })

    const openModal = (type) => {
        setServiceType(type)
        setOpen(true)
    }
    const ChangeChecked = (state, index) => {
        Services[index].checked = state;
        setServices(Services);
    }
    const closeModal = () => {
        if (ServiceName && ServiceDescription && ServicePrice) {
            setServices([
                ...Services,
                {
                    name: ServiceName,
                    description: ServiceDescription,
                    price: ServicePrice,
                    type: ServiceType,
                    checked: true
                }
            ]);
            setServiceName('')
            setServiceDescription('')
            setServicePrice(0)
            setOpen(false)
        } else {
            return Toast.show({ title: 'Something was wrong!', placement: 'top', status: 'error' , w: 400  })
        }
    }

    const ChangeType = (state, type) => {
        setType((prev) => {
            return {
                ...prev,
                [type]: state
            }
        })
    }

    const setPackage = (key) => {
        setServicePackage(prev => {
            let temp = prev;
            temp[key] = !prev[key];
            return temp;
        })
    }

    const styles = {
        bottom: {
            marginBottom: 12,
            marginTop: "auto",
        },
    }

    const Next = () => {
        if (Services.length !== 0) {
            Api.Register_Service({ ...service, groomer: service.email, services: Services, pettype: Type, packageType: ServicePackage }).then((response) => {
                if (response.data.status) {
                    dispatch(register_service_store({
                        user: response.data.user
                    }));
                    navigation.navigate("ConfirmedScreen");
                } else {
                    return Toast.show({ title: response.data.message, placement: 'bottom', status: 'error' , w: 400  })
                }
            })
        } else {
            return Toast.show({ title: 'You need to add at least one service!', placement: 'bottom', status: 'error' , w: 400  })
        }
    }

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            <Headers
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={2} flex={1}>
                <Stack flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <Text color={COLOR.black} fontSize="lg">What kind of services are you provinding?</Text>
                        <Text fontSize="xs" mt={5} mb={2} color={COLOR.black}>Which pets do you provinding services?</Text>
                        <HStack justifyContent="space-around">
                            <Checkbox
                                colorScheme="orange"
                                aria-label="check"
                                size="md"
                                icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                onChange={() => setPackage("Full")}
                                defaultIsChecked={true}
                            >
                                <Text ml={3} fontSize="xs" color={COLOR.black}>
                                    Full Groom
                                </Text>
                            </Checkbox>
                            <Checkbox
                                value={COLOR.base}
                                colorScheme="orange"
                                aria-label="check"
                                onChange={() => setPackage("Mini")}
                                size="md"
                                icon={<Icon as={<AntDesign name="checksquareo" />} />}
                            >
                                <Text ml={3} fontSize="xs" color={COLOR.black}>
                                    Mini Groom
                                </Text>
                            </Checkbox>
                            <Checkbox
                                value={COLOR.base}
                                colorScheme="orange"
                                aria-label="check"
                                onChange={() => setPackage("Bath")}
                                size="md"
                                icon={<Icon as={<AntDesign name="checksquareo" />} />}
                            >
                                <Text ml={3} fontSize="xs" color={COLOR.black}>
                                    Bath
                                </Text>
                            </Checkbox>
                        </HStack>
                        <Text fontSize="xs" mt={5} mb={2} color={COLOR.black}>Which pets do you provinding services?</Text>
                        <HStack>
                            <Checkbox
                                colorScheme="orange"
                                aria-label="check"
                                size="md"
                                icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                onChange={(state) => ChangeType(state, "dog")}
                                defaultIsChecked={Type.dog}
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
                                onChange={(state) => ChangeType(state, "cat")}
                                size="md"
                                icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                defaultIsChecked={Type.cat}
                            >
                                <Text ml={3} fontSize="xs" color={COLOR.black}>
                                    Cats
                                </Text>
                            </Checkbox>
                        </HStack>
                        <Stack my={5} borderBottomWidth={1} borderColor="gray.300" pb={2}>
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
                                                    onChange={(state) => ChangeChecked(state, ids)}
                                                    icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                                    defaultIsChecked
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
                                Services.map((item, ids) => {
                                    if (item.type === 1) {
                                        return <HStack key={ids} alignItems="center" justifyContent="space-between" bg={COLOR.white} my={1} p={3} pr={5} w="100%" borderRadius={10}>
                                            <View w="50%" alignItems="flex-start">
                                                <Checkbox
                                                    value={COLOR.base}
                                                    colorScheme="orange"
                                                    aria-label="check"
                                                    size="md"
                                                    icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                                    onChange={(state) => ChangeChecked(state, ids)}
                                                    defaultIsChecked
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
                        <Button variant="ghost" my={15} bg={COLOR.base} onPress={Next} h={45} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.white}>Continue</Text></Button>
                    </ScrollView>
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

                                <Button variant="ghost" mt={16} mb={3} bg={COLOR.base} onPress={closeModal} h={45} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.white}>Save</Text></Button>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>
                </Stack>
            </Box>
        </Box>
    )
}

export default ServiceProScreen