import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedbackBase } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, FlatList, useToast } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'


const AppointmentsScreen = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast()
    const [loading, setLoading] = useState(false)
    const [activeTab, setactiveTab] = useState(true)
    const { user } = useSelector((store) => store.auth);
    const [AppointData, setAppointData] = useState([])
    const [FavouriteData, setFavouriteData] = useState([])
    const [screenloading, setScreenloading] = useState(false)

    const ToDetailPage = (item) => {
        Api.UpdateState({ _id: item._id });
        navigation.navigate("AppointDetailScreen", item, FavouriteData)
    }

    const LoadAppointData = () => {
        setLoading(true)
        Api.LoadAppointData(user.email === "admin@gmail.com" ? {} : { groomer: user.email }).then(({ data }) => {
            setScreenloading(false)
            setAppointData(data)
        }).catch(error => {
            setScreenloading(false)
            console.log(`LoadAppointData`, error)
        })
        Api.LoadFavouriteDate(user.email === "admin@gmail.com" ? {} : { groomer: user.email }).then(({ data }) => {
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

    const AddFavourite = (favouriteid) => {
        Api.AddFavourite({ favouriteid, email: user.email }).then(({ data }) => {
            Toast.show({ title: 'Added in Favorites successfully!', placement: 'bottom', status: 'success', w: 400 })
        }).catch(error => {
        })
        LoadAppointData();
    }

    const handleTab = (tab) => {
        setactiveTab(tab === 1 ? true : false);
    }

    useEffect(() => {
        setScreenloading(true)
        LoadAppointData()
    }, [navigation.state])

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
            <Box px={5} mt={5} flex={1}>
                <HStack mx={2} justifyContent="center">
                    <Button borderRadius={15} h={45} w="50%" bg={activeTab ? COLOR.base : COLOR.bg1} colorScheme="orange" variant="ghost" onPress={() => { handleTab(1) }}>
                        <Text color={activeTab ? COLOR.white : COLOR.base} fontSize="md" pt={1}>Upcoming</Text>
                    </Button>
                    <Button borderRadius={15} h={45} w="50%" bg={!activeTab ? COLOR.base : COLOR.bg1} colorScheme="orange" variant='ghost' onPress={() => { handleTab(2) }}>
                        <Text color={!activeTab ? COLOR.white : COLOR.base} fontSize="md" pt={1}>Completed</Text>
                    </Button>
                </HStack>
                <Stack flex={1}>
                    {AppointData.length === 0 ?
                        <Fragment>
                            <Box alignItems="center" p={10}>
                                <Image source={Images.Appointment} w="100%" h={220} resizeMode="contain" />
                                <Text fontSize="xs" mt={4} color={COLOR.black}>{activeTab ? "No history appointments." : "No Upcoming appointments."}</Text>
                            </Box>
                        </Fragment>
                        :
                        activeTab ?
                            <FlatList
                                data={AppointData}
                                showsVerticalScrollIndicator={false}
                                style={{ marginTop: 10 }}
                                renderItem={({ item, index }) => {
                                    return <Box mb={AppointData.length === index + 1 ? 30 : 0} >
                                        {(() => {
                                            if (item.type !== "complete") {
                                                item.fav = FavouriteData;
                                                return <TouchableOpacity onPress={() => ToDetailPage(item)}>
                                                    <Box mx={2} px={5} py={3} my={2} bg={COLOR.white} borderRadius={15} shadow={3}>
                                                        <HStack pb={3} alignItems="center" borderBottomWidth={1} borderColor="gray.200">
                                                            <Box position="absolute" right={0} top={0}>
                                                                {
                                                                    FavouriteData.indexOf(item._id) === -1 ?
                                                                        <TouchableOpacity onPress={() => AddFavourite(item._id)}>
                                                                            <Icon color={COLOR.base} size="sm" as={<AntDesign name="hearto" />} />
                                                                        </TouchableOpacity>
                                                                        :
                                                                        <Icon color={COLOR.base} size="sm" as={<AntDesign name="heart" />} />
                                                                }

                                                            </Box>
                                                            <Image source={Images.Profile} size="sm" />
                                                            <Stack ml={4}>
                                                                <Text color={COLOR.base} mb={1} fontSize="sm">{item.userInfo.length ? item.userInfo[0].username : 'Customer'}</Text>
                                                                <Text color="gray.400" fontSize="xs">+1 98765 43210</Text>
                                                            </Stack>
                                                        </HStack>
                                                        <Text pt={3} textAlign="center" borderBottomRadius={15} color={COLOR.black} fontSize="sm">Booked service for pet dog</Text>
                                                    </Box>
                                                </TouchableOpacity>
                                            }
                                        })()}
                                    </Box>
                                }}
                                refreshing={loading}
                                onRefresh={LoadAppointData}
                                keyExtractor={(item, index) => `${index}`}
                            />
                            :
                            <FlatList
                                data={AppointData}
                                style={{ marginTop: 10 }}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => {
                                    return <Box mb={AppointData.length === index + 1 ? 30 : 0} >
                                        {(() => {
                                            if (item.type === "complete") {

                                                item.fav = FavouriteData;
                                                return <TouchableOpacity onPress={() => ToDetailPage(item)}>
                                                    <Box mx={2} px={5} py={3} my={2} bg={COLOR.white} borderRadius={15} shadow={3}>
                                                        <HStack pb={3} alignItems="center" borderBottomWidth={1} borderColor="gray.200">
                                                            <Box position="absolute" right={0} top={0}>
                                                                {
                                                                    FavouriteData.indexOf(item._id) === -1 ?
                                                                        <TouchableOpacity onPress={() => AddFavourite(item._id)}>
                                                                            <Icon color={COLOR.base} size="sm" as={<AntDesign name="hearto" />} />
                                                                        </TouchableOpacity>
                                                                        :
                                                                        <Icon color={COLOR.base} size="sm" as={<AntDesign name="heart" />} />
                                                                }

                                                            </Box>
                                                            <Image source={Images.Profile} size="sm" />
                                                            <Stack ml={4}>
                                                                <Text color={COLOR.base} mb={1} fontSize="sm">{item.userInfo.length ? item.userInfo[0].username : 'Customer'}</Text>
                                                                <Text color="gray.400" fontSize="xs">+1 98765 43210</Text>
                                                            </Stack>
                                                        </HStack>
                                                        <Text pt={3} textAlign="center" borderBottomRadius={15} color={COLOR.black} fontSize="sm">Booked service for pet dog</Text>
                                                    </Box>
                                                </TouchableOpacity>
                                            }
                                        })()}
                                    </Box>
                                }}
                                refreshing={loading}
                                onRefresh={LoadAppointData}
                                keyExtractor={(item, index) => `${index}`}
                            />
                    }

                </Stack>
            </Box>
            <Footers routeName={`AppointmentsScreen`} />
        </Box>
    )
}

export default AppointmentsScreen