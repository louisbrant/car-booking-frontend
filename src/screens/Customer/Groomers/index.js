import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { Footers, Headers, Loading, } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'


const MyGroomersScreen = ({ navigation }) => {
    const Api = useApi()
    const [loading, setLoading] = useState(false)
    const [AppointData, setAppointData] = useState(false)

    const LoadAppointData = () => {
        // setLoading(true)
        // Api.LoadAppointData().then(({ data }) => {
        //     setLoading(false)
        //     setAppointData(data.data)
        // }).catch(error => {
        //     setLoading(false)
        //     console.log(`LoadAppointData`, error)
        // })
    }


    useEffect(() => {
        LoadAppointData()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            <Headers
                title={'My Groomers'}
                left={
                    <TouchableOpacity onPress={navigation.openDrawer}>
                        <Icon borderRadius={8} bg={COLOR.base} size='md' color={COLOR.white} >{LAYOUT.drawerIcon}</Icon>
                    </TouchableOpacity>
                }
            />
            <Box px={3} mt={2} flex={1}>
                <Stack flex={1} >
                    {AppointData !== false ?
                        <Fragment>
                            <Box alignItems="center" p={10}>
                                <Image source={Images.Groomer} w="100%" h={200} resizeMode="contain" />
                                <Text fontSize="xs" textAlign="center" my={12} color={COLOR.black}>Add a favourite groomer after your first appointment.</Text>
                            </Box>
                            <Button borderRadius={100} bg={COLOR.base} colorScheme="orange">
                                <Text color={COLOR.white} fontSize="md" fontWeight={700}>Schedule Appointment</Text>
                            </Button>
                        </Fragment>
                        :
                        <ScrollView pt={1} showsVerticalScrollIndicator={false}>
                            <Box mx={3} my={2} bg={COLOR.white} borderRadius={15} shadow={3}>
                                <HStack px={5} py={3} alignItems="center" borderBottomWidth={1} borderColor="gray.200">
                                    <Icon position="absolute" right={5} top={4} color={COLOR.base} size="sm" as={<AntDesign name="heart" />} />
                                    <Image source={Images.Profile} size="sm" />
                                    <Stack ml={4}>
                                        <Text color={COLOR.base} mb={1} fontSize="sm">Tiku</Text>
                                        <Text color="gray.400" fontSize="xs">In Home</Text>
                                    </Stack>
                                </HStack>
                                <HStack px={5} py={2} justifyContent="space-between" borderBottomWidth={1} borderColor="gray.200">
                                    <Text color={COLOR.black} fontSize={13}>Gold pack</Text>
                                    <Text color={COLOR.black} fontSize={13}>$239</Text>
                                </HStack>
                                <Text px={5} py={2} color={COLOR.black} fontSize={13} borderBottomWidth={1} borderColor="gray.200">16 July 2021, 8:00 AM</Text>
                                <Text px={5} py={2} mb={4} color={COLOR.black} fontSize={13}>123 Melrose st, Bruklyn, NY - 11206</Text>
                                <Text px={5} py={3} textAlign="center" borderBottomRadius={15} bg="#2ecc71" color={COLOR.white} fontSize="sm">Completed</Text>
                            </Box>
                            <Box h={20}></Box>
                        </ScrollView>
                    }
                </Stack>

            </Box>
            <Footers routeName={`GroomersScreen`} />
        </Box>
    )
}

export default MyGroomersScreen