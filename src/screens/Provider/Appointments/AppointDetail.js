import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, useToast } from 'native-base'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'
import moment from 'moment'


const AppointDetailScreen = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast()
    const [loading, setLoading] = useState(false)
    const [Share, setShare] = useState(false)
    const [FavState, setFavState] = useState(true)
    let BookData = navigation.state.params;
    const { user } = useSelector((store) => store.auth);

    const AddFavourite = (favouriteid) => {
        setFavState(false);
        Api.AddFavourite({ favouriteid, email: user.email }).then(({ data }) => {
            Toast.show({ title: 'Added in Favorites successfully!', placement: 'bottom', status: 'success', w: 400 })
        }).catch(error => {
        })
    }

    const handleShareState = (state) => {
        setShare(state);
        Api.ChangeLocationState({ _id: BookData._id, state })
    }

    const handleComplete = () => {
        setLoading(true);
        Api.BookComplete({ _id: BookData._id }).then(({ data }) => {
            if (data) {
                Toast.show({ title: 'Appointment Completed!', placement: 'bottom', status: 'success', w: 400 });
                navigation.navigate("AppointmentsScreen", 123);
                setLoading(false);
            }
        })
    }

    const ChooseGroomer = () => {
        if (BookData.groomer !== "") {
            return <Stack>
                <Text my={5} pb={1} borderBottomWidth={1} borderColor="gray.300" fontSize="xs" color='gray.500'>Selected Groomoer</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SelectServiceScreen", BookData)}>
                    <HStack bg="white" borderRadius={16} my={2} p={3} alignItems="center" space={3}>
                        <Box position="absolute" right={5} top={3}>
                            <TouchableOpacity onPress={() => navigation.navigate("SelectServiceScreen", BookData)}>
                                <Icon size="xs" color={COLOR.base} as={<AntDesign name="edit" />} />
                            </TouchableOpacity>
                        </Box>
                        <Image size="sm" borderRadius={100} source={BookData.groomerInfo[0].avatar ? { uri: `${ROOT.IMAGE_URL}users/` + BookData.groomerInfo[0].avatar } : Images.GroomerAvata} />
                        <Stack>
                            <Text fontSize="sm" pl={4} color={COLOR.base}>{BookData.groomerInfo[0].username}</Text>
                            <Text fontSize="xs" my={1} pl={4} color="gray.400">{BookData.groomerInfo[0].email}</Text>
                            <Text fontSize="xs" pl={4} color={COLOR.black}>{BookData.groomerInfo[0].zipcode}</Text>
                        </Stack>
                    </HStack>
                </TouchableOpacity>
            </Stack>
        } else {
            return <Button mt={10} onPress={() => navigation.navigate("SelectServiceScreen", BookData)} variant="ghost" borderRadius={15} h={45} bg="#2ecc71" colorScheme="orange">
                <Text color={COLOR.white} fontSize="md" pt={1}>CHOOSE GROOMER</Text>
            </Button>
        }

    }

    useEffect(() => {
        Api.GetBookState({ _id: BookData._id }).then(({ data }) => {
            setShare(data.locationShareState);
        })
    }, [navigation])


    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            <Headers
                title={'Appointments'}
                left={
                    <TouchableOpacity onPress={() => navigation.navigate("AppointmentsScreen", 221)}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} mt={2} flex={1}>
                <Stack flex={1}>
                    <ScrollView pt={1} showsVerticalScrollIndicator={false}>
                        <Stack>
                            <HStack pb={3} alignItems="center" borderBottomWidth={1} borderColor="gray.300">
                                <Box position="absolute" right={0} top={0}>
                                    {
                                        BookData.fav.indexOf(BookData._id) === -1 && FavState ?
                                            <TouchableOpacity onPress={() => AddFavourite(BookData._id)}>
                                                <Icon color={COLOR.base} size="sm" as={<AntDesign name="hearto" />} />
                                            </TouchableOpacity>
                                            :
                                            <Icon color={COLOR.base} size="sm" as={<AntDesign name="heart" />} />
                                    }
                                </Box>
                                <Image source={Images.Profile} size="sm" />
                                <Stack ml={4}>
                                    <Text color={COLOR.base} mb={1} fontSize="sm">{BookData.userInfo[0].username}</Text>
                                    <Text color="gray.400" fontSize="xs">+7 583 946463</Text>
                                </Stack>
                            </HStack>
                            <Text my={5} pb={1} borderBottomWidth={1} borderColor="gray.300" fontSize="xs" color='gray.500'>Booked service for dog pet</Text>
                            {
                                BookData.pets.map((item, ids) => {
                                    return <HStack key={ids} pb={3} alignItems="center">
                                        <Image borderRadius={100} source={item.avatar ? { uri: `${ROOT.IMAGE_URL}profile/` + item.avatar } : Images.Dog} size="sm" />
                                        <Stack ml={4}>
                                            <Text color={COLOR.base} fontSize="sm">{item.name}</Text>
                                            <Text color="gray.400" fontSize="xs">{item.age} years old</Text>
                                            <Text color={COLOR.black} fontSize="xs">{item.breed}</Text>
                                        </Stack>
                                    </HStack>
                                })
                            }

                            <HStack mt={4} justifyContent="space-between">
                                <Text fontSize="sm" color={COLOR.black} mb={2}>{BookData.packageType === "Full" ? "Full groom pack" : BookData.packageType === "Mini" ? "Mini groom pack" : "Bath pack"}</Text>
                                <Text fontSize="sm" color={COLOR.black} mb={2}>Total - ${BookData.totalPayment}</Text>
                            </HStack>
                            {
                                BookData.services.map((item, i) => {
                                    if (item.checked) {
                                        return <HStack key={i} mt={1} justifyContent="space-between">
                                            <Text fontSize="sm" color={COLOR.black} mb={2}>{item.name}</Text>
                                            <Text fontSize="sm" color={COLOR.black} mb={2}>${item.price}</Text>
                                        </HStack>
                                    }
                                })
                            }
                            <HStack mt={1} justifyContent="space-between">
                                <Text fontSize="sm" color={COLOR.black} mb={2}>Is pets matted</Text>
                                <Text fontSize="sm" color={COLOR.black} mb={2}>{BookData.matted === "true" ? "Yes" : "No"}</Text>
                            </HStack>
                            <Text my={2} pb={1} borderBottomWidth={1} borderColor="gray.300" fontSize="xs" color='gray.500'>Address</Text>
                            <Text fontSize="sm" color={COLOR.black} mb={2}>{BookData.groomplace} ( {BookData.userInfo[0].zipcode} )</Text>
                            <Text my={2} pb={1} borderBottomWidth={1} borderColor="gray.300" fontSize="xs" color='gray.500'>Appointment Date</Text>
                            <Text fontSize="sm" color={COLOR.black} mb={2}>{moment(BookData.day).format('DD MMMM YYYY') + " " + BookData.time}</Text>
                            {/* <Text mb={2} mt={4} pb={1} borderBottomWidth={1} borderColor="gray.300" fontSize="xs" color='gray.500'>Note from client :</Text>
                            <Text fontSize="sm" color={COLOR.black} mb={2}>{BookData.note}</Text> */}
                        </Stack>
                        <Stack mb={10}>
                            {
                                user.roles === "admin" ? <ChooseGroomer /> :
                                    BookData.type !== "complete" ?
                                        <Stack>
                                            {
                                                !Share ? <Button onPress={() => handleShareState(true)} variant="ghost" mt={8} borderRadius={15} h={45} bg="#2ecc71" colorScheme="orange">
                                                    <Text color={COLOR.white} fontSize="md" pt={1}>SHARE LIVE LOCATION</Text>
                                                </Button> : <Button onPress={() => handleShareState(false)} variant="ghost" mt={8} borderRadius={15} h={45} bg="#e74c3c" colorScheme="orange">
                                                    <Text color={COLOR.white} fontSize="md" pt={1}>STOP SHARE LIVE LOCATION</Text>
                                                </Button>
                                            }
                                            <Button onPress={() => handleComplete()} variant="ghost" mt={3} borderRadius={15} h={45} bg="#2ecc71" colorScheme="orange">
                                                <Text color={COLOR.white} fontSize="md" pt={1}>COMPLETE</Text>
                                            </Button>
                                        </Stack>
                                        :
                                        <Text textAlign="center" color={COLOR.base} bold fontSize="lg" mt={10}>Completed</Text>
                            }
                        </Stack>
                    </ScrollView>
                </Stack>

            </Box>
        </Box>
    )
}

export default AppointDetailScreen