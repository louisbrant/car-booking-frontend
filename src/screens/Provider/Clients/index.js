import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, FlatList } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { SliderBox } from 'react-native-image-slider-box'
import normalize from 'react-native-normalize'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'


const ClientsScreen = ({ navigation }) => {
    const Api = useApi()
    const [loading, setLoading] = useState(false)
    const [activeTab, setactiveTab] = useState(true)
    const [AppointData, setAppointData] = useState([])
    const { user } = useSelector((store) => store.auth);
    const [FavouriteData, setFavouriteData] = useState([])

    const LoadAppointData = () => {
        setLoading(true)
        Api.LoadAppointData({ groomer: user.email }).then(({ data }) => {
            setAppointData(data)
        }).catch(error => {
            console.log(`LoadAppointData`, error)
        })
        Api.LoadFavouriteDate({ email: user.email }).then(({ data }) => {
            setLoading(false)
            let fav = [];
            for (let i = 0; i < data.length; i++) {
                fav.push(data[i].favouriteid)
            }
            setFavouriteData(fav)
        }).catch(error => {
            setLoading(false)
        })
    }

    const handleTab = (tab) => {
        setactiveTab(tab === 1 ? true : false);
    }

    useEffect(() => {
        LoadAppointData()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {/* {loading && <Loading />} */}
            <Headers
                title={'Clients'}
                left={
                    <TouchableOpacity onPress={navigation.openDrawer}>
                        <Icon borderRadius={8} bg={COLOR.base} size='md' color={COLOR.white} >{LAYOUT.drawerIcon}</Icon>
                    </TouchableOpacity>
                }
            />
            <Box px={5} mt={5} flex={1}>
                <HStack mx={2} justifyContent="center">
                    <Button borderRadius={15} h={45} w="50%" bg={activeTab ? COLOR.base : COLOR.bg1} colorScheme="orange" variant="ghost" onPress={() => { handleTab(1) }}>
                        <Text color={activeTab ? COLOR.white : COLOR.base} fontSize="md" pt={1}>Favourites</Text>
                    </Button>
                    <Button borderRadius={15} h={45} w="50%" bg={!activeTab ? COLOR.base : COLOR.bg1} colorScheme="orange" variant='ghost' onPress={() => { handleTab(2) }}>
                        <Text color={!activeTab ? COLOR.white : COLOR.base} fontSize="md" pt={1}>Blocked</Text>
                    </Button>
                </HStack>
                <Stack flex={1}>
                    {AppointData.length === 0 ?
                        <Fragment>
                            <Box alignItems="center" p={10}>
                                <Image source={Images.Appointment} w="100%" h={220} resizeMode="contain" />
                                <Text fontSize="xs" color={COLOR.black}>{activeTab ? "No history appointments." : "No Upcoming appointments."}</Text>
                            </Box>
                            <Button borderRadius={100} onPress={() => navigation.navigate("ServicesScreen")} bg={COLOR.base} mt={5} colorScheme="orange">
                                <Text color={COLOR.white} fontSize="md" fontWeight={700}>Schedule Appointment</Text>
                            </Button>
                        </Fragment>
                        :
                        activeTab ?
                            <FlatList
                                data={AppointData}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    item.fav = FavouriteData;
                                    if (FavouriteData.indexOf(item._id) !== -1) {
                                        return <TouchableOpacity onPress={() => navigation.navigate("AppointDetailScreen", item, FavouriteData)}>
                                            <Box mx={2} px={5} py={3} my={2} bg={COLOR.white} borderRadius={15} shadow={3}>
                                                <HStack pb={3} alignItems="center" borderBottomWidth={1} borderColor="gray.200">
                                                    <Box position="absolute" right={0} top={0}>
                                                        <Icon color={COLOR.base} size="sm" as={<AntDesign name="heart" />} />
                                                    </Box>
                                                    <Image source={Images.Profile} size="sm" />
                                                    <Stack ml={4}>
                                                        <Text color={COLOR.base} mb={1} fontSize="sm">{item.userInfo[0].username}</Text>
                                                        <Text color="gray.400" fontSize="xs">+1 98765 43210</Text>
                                                    </Stack>
                                                </HStack>
                                                <Text pt={3} textAlign="center" borderBottomRadius={15} color={COLOR.black} fontSize="sm">Booked service for pet dog</Text>
                                            </Box>
                                        </TouchableOpacity>
                                    }
                                }}
                                refreshing={loading}
                                onRefresh={LoadAppointData}
                                keyExtractor={(item, index) => `${index}`}
                            />
                            :
                            // <Box mx={2} px={5} py={3} my={2} bg={COLOR.white} borderRadius={15} shadow={3}>
                            //     <HStack pb={3} alignItems="center" borderBottomWidth={1} borderColor="gray.200">
                            //         <Icon position="absolute" right={0} top={0} color={COLOR.base} size="sm" as={<AntDesign name="hearto" />} />
                            //         <Image source={Images.Profile} size="sm" />
                            //         <Stack ml={4}>
                            //             <Text color={COLOR.base} mb={1} fontSize="sm">John Doe</Text>
                            //             <Text color="gray.400" fontSize="xs">+1 98765 43210</Text>
                            //         </Stack>
                            //     </HStack>
                            //     <Text pt={3} textAlign="center" borderBottomRadius={15} color="#2ecc71" fontSize="sm">Completed</Text>
                            // </Box>
                            <></>
                    }

                </Stack>
            </Box>
            <Footers routeName={`GroomersScreen`} />
        </Box>
    )
}

export default ClientsScreen