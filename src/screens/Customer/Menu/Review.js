import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, IconButton, FlatList } from 'native-base'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Rating } from 'react-native-ratings'

const ReviewScreen = ({ navigation }) => {
    const Api = useApi()
    const [loading, setLoading] = useState(false)
    const [ReviewData, setReviewData] = useState([])
    const { user } = useSelector((store) => store.auth);

    const LoadReviewData = () => {
        setLoading(true)
        Api.LoadReviewData({ client: user.email }).then(({ data }) => {
            setLoading(false)
            setReviewData(data)
        }).catch(error => {
            setLoading(false)
            console.log(`LoadReviewData`, error)
        })
    }


    useEffect(() => {
        LoadReviewData()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            <Headers
                title={"Review"}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box py={2} flex={1}>
                <Stack flex={1} px={7}>
                    <FlatList
                        data={ReviewData}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <Box mb={ReviewData.length === index + 1 ? 7 : 2} >
                                {
                                    <Box mx={2} my={2} bg={COLOR.white} borderRadius={15} shadow={3}>
                                        <HStack px={5} py={3} alignItems="center" borderBottomWidth={1} borderColor="gray.200">
                                            <Icon position="absolute" right={5} top={4} color={COLOR.base} size="sm" as={<AntDesign name="hearto" />} />
                                            <Image borderRadius={100} source={item.shopId.pets[0].avatar ? { uri: `${ROOT.IMAGE_URL}profile/` + item.shopId.pets[0].avatar } : Images.Dog} size="sm" />
                                            <Stack ml={4}>
                                                <Text color={COLOR.base} mb={1} fontSize="sm">{item.shopId.pets[0].name}</Text>
                                                <Text color="gray.400" fontSize="xs">{item.serviceType === "home" ? "In Home" : "Mobile Van"}</Text>
                                            </Stack>
                                        </HStack>
                                        <HStack px={5} py={2} alignItems="center" justifyContent="space-between" borderBottomWidth={1} borderColor="gray.200">
                                            <Text color="gray.400" fontSize={13}>Groomer</Text>
                                            <HStack alignItems="center" space={3}>
                                                <Image borderRadius={100} source={item.groomerInfo[0].avatar ? { uri: `${ROOT.IMAGE_URL}users/` + item.groomerInfo[0].avatar } : Images.GroomerAvata} size={8} />
                                                <Text color={COLOR.black} fontSize={13}>{item.groomerInfo[0].username}</Text>
                                            </HStack>
                                        </HStack>
                                        <HStack px={5} py={2} justifyContent="space-between" borderBottomWidth={1} borderColor="gray.200">
                                            <Text color="gray.400" fontSize={13}>Total amount</Text>
                                            <Text color={COLOR.black} fontSize={13}>${item.shopId.totalPayment}</Text>
                                        </HStack>
                                        <HStack px={5} py={2} justifyContent="space-between" borderBottomWidth={1} borderColor="gray.200">
                                            <Text color="gray.400" fontSize={13}>Date</Text>
                                            <Text color={COLOR.black} fontSize={13}>{moment(item.shopId.day).format('DD MMMM YYYY') + " " + item.shopId.time}</Text>
                                        </HStack>
                                        <HStack px={5} py={4} alignItems="center">
                                            <Rating
                                                ratingCount={5}
                                                imageSize={13}
                                                readonly={true}
                                                startingValue={item.rate}
                                            />
                                            <Text color={COLOR.black} ml={3} fontSize={11}>{moment(new Date(item.date)).format('DD MMMM YYYY')}</Text>
                                        </HStack>
                                        <Stack pb={5} px={5}>
                                            <Text color={COLOR.black} fontSize="sm">{item.title}</Text>
                                            <Text color={COLOR.black} fontSize={11}>{item.text}</Text>
                                        </Stack>
                                    </Box>
                                }
                            </Box>
                        )}
                        refreshing={loading}
                        onRefresh={LoadReviewData}
                        keyExtractor={(item, index) => `${index}`}
                    />
                </Stack>
            </Box>
        </Box>
    )
}

export default ReviewScreen