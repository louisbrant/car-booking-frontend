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

const CatProfileScreen = ({ navigation }) => {
    const Api = useApi()
    const [loading, setLoading] = useState(false)
    const [Cats, setCats] = useState([])
    const { user } = useSelector((store) => store.auth);
    const [refresh, setRefresh] = useState(false)

    const LoadData = () => {
        setRefresh(true)
        Api.GetCatPro({ owner: user.email }).then(({ data }) => {
            setCats(data)
            setRefresh(false)
        }).catch(error => {
            setRefresh(false)
            // setLoading(false)
        })
    }

    const Delete = (_id) => {
        Api.DeleteCat({ _id }).then(({ }) => {
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
            {/* {loading && <Loading />} */}
            <Headers
                title={'Cat Profile'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} flex={1}>

                {
                    Cats.length ?
                        <FlatList
                            data={Cats}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Stack bg={COLOR.white} my={2} p={4} borderRadius={15}>
                                    <HStack alignItems="center" borderBottomWidth={1} borderColor="gray.200" pb={3}>
                                        <Box position="absolute" right={10} top={0}>
                                            <TouchableOpacity onPress={() => navigation.navigate("EditCatProfileScreen", item)}>
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
                                        </Stack>
                                    </HStack>
                                    <Text mt={3} mb={1} color="gray.400" fontSize={10}>Gender</Text>
                                    <Text color={COLOR.black} fontSize="sm" borderBottomWidth={1} borderColor="gray.200" pb={2}>{item.gender}</Text>
                                    <Text mt={2} mb={1} color="gray.400" fontSize={10}>Temperament</Text>
                                    <Text color={COLOR.black} fontSize="sm" borderBottomWidth={1} borderColor="gray.200" pb={2}>{item.temperament}</Text>
                                </Stack>
                            )}
                            refreshing={refresh}
                            onRefresh={LoadData}
                            keyExtractor={(item, index) => `${index}`}
                        />
                        :
                        <Box flex={1} pb={20} alignItems="center" justifyContent="center">
                            <Box w={100} h={100} borderRadius={100} alignItems="center" justifyContent="center" borderColor={COLOR.base} borderWidth={1}>
                                <Icon viewBox="0 0 18.034 19.995" size="xl">{LAYOUT.CatIcon}</Icon>
                            </Box>
                            <Button onPress={() => navigation.navigate("EditCatProfileScreen")} h={45} variant="ghost" my={8} w="50%" bg={COLOR.base} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.white}>Add Cat</Text></Button>
                        </Box>
                }
                {
                    Cats.length ? <Button width="100%" alignSelf="center" onPress={() => navigation.navigate("EditCatProfileScreen")} h={45} variant="ghost" my={8} bg={COLOR.base} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.white}>Add Cat</Text></Button>:null
                }
            </Box>
        </Box>
    )
}

export default CatProfileScreen