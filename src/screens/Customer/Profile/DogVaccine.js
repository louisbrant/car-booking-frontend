import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity, ViewPagerAndroidComponent } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center } from 'native-base'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { Ionicons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';

const DogVaccineScreen = ({ navigation }) => {
    const Api = useApi()
    const params = navigation.state.params
    const [loading, setLoading] = useState(false)
    const [listData, setlistData] = useState([])
    const LoadVaccineData = () => {
        setLoading(true)
        Api.LoadVaccineData({ dogId: params._id }).then(({ data }) => {
            setLoading(false)
            setlistData(data)
        }).catch(error => {
            setLoading(false)
        })
    }

    const DeleteVaccine = (_id) => {
        Api.RemoveVaccineData({ _id }).then(({ data }) => {
            if (data) {
                LoadVaccineData()
            }
        }).catch(error => {
        })
    }


    useEffect(() => {;
        LoadVaccineData()
    }, [navigation])

    const renderItem = ({ item, index }) => (
        <Stack p={3} bg={COLOR.white} borderRadius={10} my={1}>
            <Text color="green.500" fontSize="xs">Dose {index + 1}</Text>
            <Text color={COLOR.base} fontSize="sm">{item.name}</Text>
            <HStack justifyContent="space-between">
                <HStack alignItems="center" justifyContent="space-between">
                    <Icon size={3} color={COLOR.black} as={<AntDesign name="clockcircleo" />} />
                    <Text ml={1} color={COLOR.black} fontSize={10}>{item.date}</Text>
                </HStack>
                <Text fontSize={10} underline color={"#66b1e4"}>View photo</Text>
            </HStack>
        </Stack>
    );

    const renderHiddenItem = (data, rowMap) => {
        let Vdata = {
            dogId: params,
            VaccineData: data.item
        }
        return <HStack
            flex={1}
            pl={2}
            alignItems="center"
            justifyContent="flex-end"
            bg="gray.300"
            my={1}
            borderRadius={10}
        >
            <TouchableOpacity onPress={() => navigation.navigate("AddVaccineScreen", Vdata)}>
                <Text mx={4} bold color={COLOR.black}>Edit</Text>
            </TouchableOpacity>
            <Text color="gray.400" mt={1}>|</Text>
            <TouchableOpacity onPress={() => DeleteVaccine(data.item._id)}>
                <Text mx={4} bold color='#e74c3c'>Remove</Text>
            </TouchableOpacity>
        </HStack>
    };
    const onRowDidOpen = rowKey => {
        // console.log('This row opened', rowKey);
    };
    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            <Headers
                title={'Vaccination record'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
                right={
                    <TouchableOpacity onPress={() => navigation.navigate("AddVaccineScreen", params)}>
                        <Icon color={COLOR.base} size="sm" as={<Ionicons name="add-circle-outline" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={2} flex={1}>
                <Stack flex={1}>
                    <SwipeListView
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `${index}`}
                        data={listData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-160}
                        previewRowKey={'0'}
                        previewOpenValue={-40}
                        previewOpenDelay={3000}
                        onRowDidOpen={onRowDidOpen}
                    />
                </Stack>
            </Box>
        </Box>
    )
}

export default DogVaccineScreen