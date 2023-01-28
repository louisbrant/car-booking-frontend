import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity, Dimensions } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View } from 'native-base'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'


const ServicesScreen = ({ navigation }) => {
    const Api = useApi()
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth);
    const [Services, setServices] = useState()

    useEffect(() => {
        Api.GetService({}).then((response) => {
            if (response.status === 200) {
                setServices(response.data[0]);
            }
        })
    }, [navigation.state])

    return (
        <Box flex={1} bg={COLOR.bg1}>
            {loading && <Loading />}
            <Headers
                title={'My services'}
                left={
                    <TouchableOpacity onPress={navigation.openDrawer}>
                        <Icon borderRadius={8} bg={COLOR.base} size='md' >{LAYOUT.drawerIcon}</Icon>
                    </TouchableOpacity>
                }
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Stack flex={1} pt={2} px={8} pb={5}>
                    {/* <Stack mt={3} borderBottomWidth={1} borderColor="gray.200">
                        <Text fontSize="sm" color="gray.400">Service type</Text>
                        <Text fontSize="sm" color={COLOR.black} mb={2}>
                            {(() => {
                                if (Services) {
                                    if (Services.servicetype.home && Services.servicetype.mobile) {
                                        return 'In Home + Mobile Van'
                                    }
                                    if (Services.servicetype.home)
                                        return 'In Home'
                                    else
                                        return 'Mobile Van'
                                }
                            })()}
                        </Text>
                    </Stack>
                    <Stack mt={3} borderBottomWidth={1} borderColor="gray.200">
                        <Text fontSize="sm" color="gray.400">Providing service for</Text>
                        <Text fontSize="sm" color={COLOR.black} mb={2}>
                            {(() => {
                                if (Services) {
                                    if (Services.pettype.dog && Services.pettype.cat) {
                                        return 'Dog + Cat'
                                    }
                                    if (Services.pettype.dog)
                                        return 'Dog'
                                    else
                                        return 'Cat'
                                }
                            })()}
                        </Text>
                    </Stack> */}
                    <Stack mt={3} borderBottomWidth={1} borderColor="gray.200">
                        <Text fontSize="sm" color="gray.400">Opening Hours</Text>
                        <Text fontSize="sm" color={COLOR.black} mb={2}>
                            {
                                Services ? Object.keys(Services.openingHours).map((keyname, index) => {
                                    if (Services.openingHours[keyname].status) {
                                        return keyname + ", ";
                                    }
                                }) : null
                            }
                        </Text>
                    </Stack>
                    <Stack mt={3} >
                        <Text fontSize="sm" color="gray.400">All service</Text>
                        {
                            Services ? Services.services.map((item, ids) => {
                                if (item.checked) {
                                    return <HStack justifyContent="space-between" key={ids}>
                                        <Text fontSize="sm" color={COLOR.black} mb={2}>{item.name}</Text>
                                        <Text fontSize="sm" color={COLOR.black} mb={2}>${item.price}</Text>
                                    </HStack>
                                }
                            }) : null
                        }


                        {
                            user.email === "admin@gmail.com" ?
                                <Button onPress={() => navigation.navigate("ManageScreen", Services)} variant="ghost" my={8} borderRadius={15} h={45} bg={COLOR.base} colorScheme="orange">
                                    <Text color={COLOR.white} fontSize="md" pt={1}>Edit</Text>
                                </Button> : null
                        }
                    </Stack>
                </Stack>
            </ScrollView>
            <Footers routeName={`ServicesScreen`} />
        </Box>
    )
}

export default ServicesScreen