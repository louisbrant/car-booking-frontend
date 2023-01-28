import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, FlatList } from 'native-base'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { SliderBox } from 'react-native-image-slider-box'
import normalize from 'react-native-normalize'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'


const DogProfileScreen = ({ navigation }) => {
    const Api = useApi()
    const [loading, setLoading] = useState(false)
    const [Dogs, setDogs] = useState([])
    const { user } = useSelector((store) => store.auth);
    const [refresh, setRefresh] = useState(false)

    const LoadData = () => {
        setRefresh(true)
        Api.GetDogPro({ owner: user.email }).then(({ data }) => {
            setDogs(data)
            setRefresh(false)
        }).catch(error => {
            setRefresh(false)
            // setLoading(false)
        })
    }

    const Delete = (_id) => {
        Api.DeleteDog({ _id }).then(({ }) => {
            LoadData()
        }).catch(error => {
            setRefresh(false)
            // setLoading(false)
        })
    }


    useEffect(() => {
        LoadData()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            <Headers
                title={'Dog Profile'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={3} flex={1}>
                <FlatList
                    data={Dogs}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Fragment>
                            <Stack bg={COLOR.white} p={4} borderRadius={15}>
                                <HStack alignItems="center" borderBottomWidth={1} borderColor="gray.200" pb={3}>
                                    <Box position="absolute" right={10} top={0}>
                                        <TouchableOpacity onPress={() => navigation.navigate("EditDogProfileScreen", item)}>
                                            <Icon size="xs" color={COLOR.base} as={<AntDesign name="edit" />} />
                                        </TouchableOpacity>
                                    </Box>
                                    <Box position="absolute" right={0} top={0}>
                                        <TouchableOpacity onPress={() => Delete(item._id)}>
                                            <Icon size="xs" color={COLOR.base} as={<AntDesign name="close" />} />
                                        </TouchableOpacity>
                                    </Box>
                                    <Image size="sm" borderRadius={100} source={item.avatar ? { uri: `${ROOT.IMAGE_URL}profile/` + item.avatar } : Images.Dog} />
                                    <Stack>
                                        <Text fontSize="sm" pl={4} color={COLOR.base}>{item.name}</Text>
                                        <Text fontSize="xs" my={1} pl={4} color="gray.400">{item.age} years old</Text>
                                        <Text fontSize="xs" pl={4} color={COLOR.black}>{item.breed}</Text>
                                    </Stack>
                                </HStack>
                                <Text mt={3} mb={1} color="gray.400" fontSize={10}>Gender</Text>
                                <Text color={COLOR.black} fontSize="sm" borderBottomWidth={1} borderColor="gray.200" pb={2}>{item.gender}</Text>
                                <Text mt={2} mb={1} color="gray.400" fontSize={10}>Size & weight</Text>
                                <Text color={COLOR.black} fontSize="sm" borderBottomWidth={1} borderColor="gray.200" pb={2}>{item.sizeWeight}</Text>
                                <Text mt={2} mb={1} color="gray.400" fontSize={10}>Temperament</Text>
                                <Text color={COLOR.black} fontSize="sm" borderBottomWidth={1} borderColor="gray.200" pb={2}>{item.temperament}</Text>
                                <Text mt={2} mb={1} color="gray.400" fontSize={10}>Last groom</Text>
                                <Text color={COLOR.black} fontSize="sm" borderBottomWidth={1} borderColor="gray.200" pb={2}>{item.lastgroom}</Text>
                                <Text mt={2} mb={1} color="gray.400" fontSize={10}>Coat type</Text>
                                <Text color={COLOR.black} fontSize="sm" >{item.coattype}</Text>
                            </Stack>
                            <TouchableOpacity onPress={() => navigation.navigate("DogVaccineScreen", { _id: item._id })}>
                                <Text my={5} alignSelf="flex-end" fontSize="xs" color={COLOR.base}>View Vaccination record</Text>
                            </TouchableOpacity>
                        </Fragment>
                    )}
                    refreshing={refresh}
                    onRefresh={LoadData}
                    keyExtractor={(item, index) => `${index}`}
                />
            </Box>

            <Button mb={5} mx={7} bg={COLOR.base} h={45} onPress={() => navigation.navigate("EditDogProfileScreen")} variant="ghost" colorScheme="orange" borderRadius={15}><Text color={COLOR.white} fontSize="md" pt={1}>Add Another Dog</Text></Button>
        </Box>
    )
}

export default DogProfileScreen