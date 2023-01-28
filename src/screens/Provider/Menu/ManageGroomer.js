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


const ManageGroomerScreen = ({ navigation }) => {
    const Api = useApi()
    const [loading, setLoading] = useState(false)
    const [Groomers, setGroomers] = useState([])
    const { user } = useSelector((store) => store.auth);
    const [refresh, setRefresh] = useState(false)

    const LoadData = () => {
        setRefresh(true)
        Api.GetGroomers().then(({ data }) => {
            setRefresh(false)
            setGroomers(data)
        }).catch(error => {
            setRefresh(false)
        })
    }

    const Delete = (_id) => {
        setRefresh(true);
        Api.DeleteGroomer({ _id }).then(({ }) => {
            LoadData()
        }).catch(error => {
            setRefresh(false)
        })
    }


    useEffect(() => {
        LoadData()
    }, [navigation.state])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            <Headers
                title={'Manage Groomer'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={3} flex={1}>
                <FlatList
                    data={Groomers}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Fragment>
                            <Stack bg={COLOR.white} p={4} borderRadius={15} my={2}>
                                <HStack alignItems="center">
                                    <Box position="absolute" right={10} top={0}>
                                        <TouchableOpacity onPress={() => navigation.navigate("EditGroomerScreen", item)}>
                                            <Icon size="xs" color={COLOR.base} as={<AntDesign name="edit" />} />
                                        </TouchableOpacity>
                                    </Box>
                                    <Box position="absolute" right={0} top={0}>
                                        <TouchableOpacity onPress={() => Delete(item._id)}>
                                            <Icon size="xs" color={COLOR.base} as={<AntDesign name="close" />} />
                                        </TouchableOpacity>
                                    </Box>
                                    <Image size="sm" borderRadius={100} source={item.avatar ? { uri: `${ROOT.IMAGE_URL}users/` + item.avatar } : Images.GroomerAvata} />
                                    <Stack>
                                        <Text fontSize="sm" pl={4} color={COLOR.base}>{item.username}</Text>
                                        <Text fontSize="xs" my={1} pl={4} color="gray.400">{item.email}</Text>
                                        <Text fontSize="xs" pl={4} color={COLOR.black}>{item.phone}</Text>
                                    </Stack>
                                </HStack>
                            </Stack>
                        </Fragment>
                    )}
                    refreshing={refresh}
                    onRefresh={LoadData}
                    keyExtractor={(item, index) => `${index}`}
                />
            </Box>

            <Button mb={5} mx={7} bg={COLOR.base} h={45} onPress={() => navigation.navigate("EditGroomerScreen")} variant="ghost" colorScheme="orange" borderRadius={15}><Text color={COLOR.white} fontSize="md" pt={1}>Add Groomer</Text></Button>
        </Box>
    )
}

export default ManageGroomerScreen