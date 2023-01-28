import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity, Dimensions } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, useToast, Spinner, FlatList, Input, Avatar } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { service_book_store } from '../../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { Feather, Entypo } from '@expo/vector-icons';
import { useApi } from '../../../redux/services';
import { Rating } from 'react-native-ratings';

const SelectServiceScreen = ({ navigation }) => {
    const Api = useApi();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth)
    const Toast = useToast();
    let BookData = JSON.parse(JSON.stringify(navigation.state.params));
    const [packageType, setpackageType] = useState()
    const [Services, setServices] = useState([])
    const [SearchKey, setSearchKey] = useState("")
    const [refresh, setRefresh] = useState(false)
    const Next = (item) => {
        setLoading(true);
        Api.SetGroomer({ _id: BookData._id, groomer: item.email }).then((response) => {
            if (response.status === 200) {
                BookData.groomerInfo = [response.data];
                BookData.groomer = response.data.email;
                navigation.navigate("AppointDetailScreen", BookData);
                setLoading(false);
            }
        })
    }

    const DataLoad = (type, key) => {
        setRefresh(true);
        Api.GetGroomers().then(({ data }) => {
            setServices(data);
            setRefresh(false);
        })
    }

    useEffect(() => {
        DataLoad();
    }, [])

    return (
        <Box flex={1} bg={COLOR.bg1}>
            {loading && <Loading />}
            <Headers
                title={'Select Service'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Stack p={7}>
                <Stack mb={3}>
                    <Input
                        InputRightElement={
                            <Icon
                                size="sm"
                                mr={4}
                                _light={{
                                    color: "gray.400",
                                }}
                                _dark={{
                                    color: "gray.400",
                                }}
                                as={<Feather name="search" />}
                            />
                        }
                        _focus={{
                            borderColor: "gray.200"
                        }}
                        bg={COLOR.white}
                        size='sm'
                        h={50}
                        py={1}
                        borderWidth={2}
                        borderRadius={15}
                        onChangeText={setSearchKey}
                        placeholder="Search"
                    />
                </Stack>
                <FlatList
                    data={Services}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => Next(item)}>
                            <HStack bg="white" display={item.username.toLowerCase().search(SearchKey.toLowerCase()) === -1 && SearchKey !== '' ? "none" : "flex"} borderRadius={16} my={2} p={3} alignItems="center" space={3}>
                                <Image size="sm" borderRadius={100} source={item.avatar ? { uri: `${ROOT.IMAGE_URL}users/` + item.avatar } : Images.GroomerAvata} />
                                <Stack>
                                    <Text fontSize="sm" pl={4} color={COLOR.base}>{item.username}</Text>
                                    <Text fontSize="xs" my={1} pl={4} color="gray.400">{item.email}</Text>
                                    <Text fontSize="xs" pl={4} color={COLOR.black}>{item.zipcode}</Text>
                                </Stack>
                            </HStack>
                        </TouchableOpacity>
                    )}
                    refreshing={refresh}
                    onRefresh={DataLoad}
                    keyExtractor={(item, index) => `${index}`}
                />
            </Stack>
        </Box>
    )
}

export default SelectServiceScreen