import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, FlatList, Modal, Input, TextArea, useToast, Spinner } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Rating, AirbnbRating } from 'react-native-ratings';

const AppointmentsScreen = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast()
    const { user } = useSelector((store) => store.auth);
    const [loading, setLoading] = useState(false)
    const [screenloading, setScreenloading] = useState(false)
    const [activeTab, setactiveTab] = useState(true)
    const [AppointData, setAppointData] = useState(false)
    const [open, setOpen] = useState(false)
    const [rate, setrate] = useState(5)
    const [title, settitle] = useState()
    const [text, settext] = useState()
    const [groomer, setgroomer] = useState()
    const [shopId, setshopId] = useState()

    const LoadAppointData = () => {
        setLoading(true)
        Api.LoadAppointData({ client: user.email }).then(({ data }) => {
            setLoading(false)
            setScreenloading(false)
            setAppointData(data)

        }).catch(error => {
            setLoading(false)
            setScreenloading(false)
            console.log(`LoadAppointData`, error)
        })
    }

    const handleTab = (tab) => {
        setactiveTab(tab === 1 ? true : false);
    }

    const styles = {
        bottom: {
            marginBottom: 12,
            marginTop: "auto",
        },
    }

    const ReviewSave = () => {
        if (title && text) {
            setLoading(true)
            Api.CreateReview({ rate, title, text, client: user.email, groomer, shopId }).then(({ data }) => {
                if (data.status) {
                    Toast.show({ title: data.message, placement: 'bottom', status: 'success', w: 400 })
                    setOpen(false);
                    settitle()
                    settext()
                } else {
                    Toast.show({ title: data.message, placement: 'bottom', status: 'error', w: 400 })
                }
                setLoading(false)
            })
        } else {
            return Toast.show({ title: 'Title or review text is incorrect!', placement: 'bottom', status: 'error', w: 400 })
        }
    }

    useEffect(() => {
        setScreenloading(true)
        LoadAppointData()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {screenloading && <Loading />}
            <Headers
                title={'Appointments'}
                left={
                    <TouchableOpacity onPress={navigation.openDrawer}>
                        <Icon borderRadius={8} bg={COLOR.base} size='md' color={COLOR.white} >{LAYOUT.drawerIcon}</Icon>
                    </TouchableOpacity>
                }
            />
            <Box px={4} mt={5} flex={1}>
                <HStack mx={2} justifyContent="center">
                    <Button borderRadius={15} h={45} w="50%" bg={activeTab ? COLOR.base : COLOR.bg1} colorScheme="orange" variant='ghost' onPress={() => { setactiveTab(true) }}>
                        <Text color={activeTab ? COLOR.white : COLOR.base} fontSize="md" pt={1}>Upcoming</Text>
                    </Button>
                    <Button borderRadius={15} h={45} w="50%" bg={!activeTab ? COLOR.base : COLOR.bg1} colorScheme="orange" variant="ghost" onPress={() => { setactiveTab(false) }}>
                        <Text color={!activeTab ? COLOR.white : COLOR.base} fontSize="md" pt={1}>Completed</Text>
                    </Button>
                </HStack>
                <Stack flex={1}>
                    {AppointData.length ?
                        activeTab ?
                            <FlatList
                                data={AppointData}
                                showsVerticalScrollIndicator={false}
                                style={{ marginTop: 10 }}
                                renderItem={({ item, index }) => (
                                    <Box mb={AppointData.length === index + 1 ? 30 : 0} >
                                        {
                                            item.type !== 'complete' ?
                                                <Box mx={2} my={2} bg={COLOR.white} borderRadius={15} shadow={3}>
                                                    <HStack px={5} py={3} alignItems="center" borderBottomWidth={1} borderColor="gray.200">
                                                        <Image borderRadius={100} source={item.pets[0].avatar ? { uri: `${ROOT.IMAGE_URL}profile/` + item.pets[0].avatar } : Images.Dog} size="sm" />
                                                        <Stack ml={4}>
                                                            <Text color={COLOR.base} mb={1} fontSize="sm">{item.pets[0].name}</Text>
                                                            <Text color="gray.400" fontSize="xs">{item.serviceType === "home" ? "In Home" : "Mobile Van"}</Text>
                                                        </Stack>
                                                    </HStack>
                                                    <HStack px={5} py={2} alignItems="center" justifyContent="space-between" borderBottomWidth={1} borderColor="gray.200">
                                                        <Text color="gray.400" fontSize={13}>Groomer</Text>
                                                        <HStack alignItems="center" space={3}>
                                                            <Image borderRadius={100} source={item.groomerInfo.length ? item.groomerInfo[0].avatar ? { uri: ROOT.IMAGE_URL + "users/" + item.groomerInfo[0].avatar } : Images.GroomerAvata : Images.GroomerAvata} size={8} />
                                                            <Text color={COLOR.black} fontSize={13}>{item.groomerInfo.length ? item.groomerInfo[0].username : "Groomer"}</Text>
                                                        </HStack>
                                                    </HStack>
                                                    <HStack px={5} py={2} justifyContent="space-between" borderBottomWidth={1} borderColor="gray.200">
                                                        <Text color="gray.400" fontSize={13}>Total amount</Text>
                                                        <Text color={COLOR.black} fontSize={13}>${item.totalPayment}</Text>
                                                    </HStack>
                                                    <HStack px={5} py={2} justifyContent="space-between" borderBottomWidth={1} borderColor="gray.200">
                                                        <Text color="gray.400" fontSize={13}>Date</Text>
                                                        <Text color={COLOR.black} fontSize={13}>{moment(item.day).format('DD MMMM YYYY') + " " + item.time}</Text>
                                                    </HStack>
                                                    {
                                                        item.locationShareState ?
                                                            <TouchableOpacity onPress={() => navigation.navigate("TrackgroomerScreen", item.groomerInfo[0].email)}>
                                                                <Text px={5} py={3} textAlign="center" borderBottomRadius={15} bg={COLOR.black} color={COLOR.white} fontSize="sm">Track groomer</Text>
                                                            </TouchableOpacity>
                                                            :
                                                            <TouchableOpacity onPress={() => navigation.navigate("ServicesScreen", { _id: item._id })}>
                                                                <Text px={5} py={3} textAlign="center" borderBottomRadius={15} bg="#3498db" color={COLOR.white} fontSize="sm">Reschedule</Text>
                                                            </TouchableOpacity>
                                                    }
                                                </Box>
                                                : null
                                        }
                                    </Box>
                                )}
                                refreshing={loading}
                                onRefresh={LoadAppointData}
                                keyExtractor={(item, index) => `${index}`}
                            />
                            :
                            <FlatList
                                data={AppointData}
                                showsVerticalScrollIndicator={false}
                                style={{ marginTop: 10 }}

                                renderItem={({ item, index }) => (
                                    <Box mb={AppointData.length === index + 1 ? 30 : 0} >
                                        {
                                            item.type === 'complete' ?
                                                <Box mx={2} my={2} bg={COLOR.white} borderRadius={15} shadow={3}>
                                                    <HStack px={5} py={3} alignItems="center" borderBottomWidth={1} borderColor="gray.200">
                                                        <Icon position="absolute" right={5} top={4} color={COLOR.base} size="sm" as={<AntDesign name="hearto" />} />
                                                        <Image borderRadius={100} source={item.pets[0].avatar ? { uri: `${ROOT.IMAGE_URL}profile/` + item.pets[0].avatar } : Images.Dog} size="sm" />
                                                        <Stack ml={4}>
                                                            <Text color={COLOR.base} mb={1} fontSize="sm">{item.pets[0].name}</Text>
                                                            <Text color="gray.400" fontSize="xs">{item.serviceType === "home" ? "In Home" : "Mobile Van"}</Text>
                                                        </Stack>
                                                    </HStack>
                                                    <HStack px={5} py={2} alignItems="center" justifyContent="space-between" borderBottomWidth={1} borderColor="gray.200">
                                                        <Text color="gray.400" fontSize={13}>Groomer</Text>
                                                        <HStack alignItems="center" space={3}>
                                                            <Image borderRadius={100} source={item.groomerInfo[0].avatar ? { uri: ROOT.IMAGE_URL + "users/" + item.groomerInfo[0].avatar } : Images.Profile} size={8} />
                                                            <Text color={COLOR.black} fontSize={13}>{item.groomerInfo[0].username}</Text>
                                                        </HStack>
                                                    </HStack>
                                                    <HStack px={5} py={2} justifyContent="space-between" borderBottomWidth={1} borderColor="gray.200">
                                                        <Text color="gray.400" fontSize={13}>Total amount</Text>
                                                        <Text color={COLOR.black} fontSize={13}>${item.totalPayment}</Text>
                                                    </HStack>
                                                    <HStack px={5} py={2} justifyContent="space-between" >
                                                        <Text color="gray.400" fontSize={13}>Date</Text>
                                                        <Text color={COLOR.black} fontSize={13}>{moment(item.day).format('DD MMMM YYYY') + " " + item.time}</Text>
                                                    </HStack>
                                                    <Text fontSize="sm" py={2} textAlign="center" color='#62d894'>Completed</Text>
                                                    <TouchableOpacity onPress={() => { setOpen(true); setgroomer(item.groomerInfo[0].email); setshopId(item._id) }}>
                                                        <Text px={5} py={3} textAlign="center" borderBottomRadius={15} bg="#ffc400" color={COLOR.white} fontSize="sm">Write review</Text>
                                                    </TouchableOpacity>
                                                </Box>
                                                : null
                                        }
                                    </Box>
                                )}
                                refreshing={loading}
                                onRefresh={LoadAppointData}
                                keyExtractor={(item, index) => `${index}`}
                            />

                        :
                        <Fragment>
                            <Box alignItems="center" p={10}>
                                <Image source={Images.Appointment} w="100%" h={220} resizeMode="contain" />
                                <Text fontSize="xs" color={COLOR.black}>{activeTab ? "No history appointments." : "No Upcoming appointments."}</Text>
                            </Box>
                            <Button mx={3} borderRadius={15} onPress={() => navigation.navigate("ServicesScreen")} bg={COLOR.base} mt={5} colorScheme="orange">
                                <Text color={COLOR.white} fontSize="md" fontWeight={700}>Schedule Appointment</Text>
                            </Button>
                        </Fragment>
                    }
                </Stack>
            </Box>
            <Footers routeName={`AppointmentsScreen`} />
            <Modal isOpen={open} onClose={() => setOpen(false)} mt={12} size="full">
                <Modal.Content maxWidth="400px" borderTopRadius={15} {...styles["bottom"]}>
                    <Modal.CloseButton />
                    <Modal.Body>
                        <Text fontSize="lg" color={COLOR.black} bold textAlign="center">Write Review</Text>
                        <Text fontSize="xs" color="gray.700" textAlign="center">Rate and review about your experience.</Text>
                        <Rating
                            style={{ marginTop: 20, marginBottom: 20 }}
                            ratingCount={5}
                            imageSize={50}
                            startingValue={5}
                            onFinishRating={setrate}
                        />
                        <Input h={45} mt={3} value={title} onChangeText={settitle} size="sm" borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.200" }} placeholder="Title"
                            _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                        />
                        <TextArea bg={COLOR.white} value={text} onChangeText={settext} placeholderTextColor="#cccccc" size="sm" textAlignVertical='top' _focus={{ borderColor: "gray.200" }} h={32} borderRadius={15} placeholder="Write here..." my={3} />

                        <Button
                            variant="ghost"
                            mt={12}
                            mb={3}
                            bg={COLOR.base}
                            onPress={ReviewSave}
                            h={50}
                            colorScheme="orange"
                            borderRadius={15}
                            disabled={loading}
                        >
                            {
                                loading ?
                                    <Spinner size="sm" />
                                    :
                                    <Text fontSize="md" pt={1} color={COLOR.white}>Save</Text>
                            }
                        </Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Box>
    )
}

export default AppointmentsScreen