import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, IconButton, FlatList, TextArea } from 'native-base'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Rating } from 'react-native-ratings'

const ReviewScreen = ({ navigation }) => {
    const Api = useApi()
    const { user } = useSelector((store) => store.auth);
    const [loading, setLoading] = useState(false)
    const [reply, setreply] = useState()
    const [ratesum, setratesum] = useState(0)
    const [ReviewData, setReviewData] = useState([])

    const LoadReviewData = () => {
        setLoading(true)
        setratesum(0);
        Api.LoadReviewData(user.email === "admin@gmail.com" ? {} : { groomer: user.email }).then(({ data }) => {
            setLoading(false)
            setReviewData(data)
            for (let i = 0; i < data.length; i++) {
                setratesum(prev => {
                    return prev + data[i].rate * 1;
                })
            }
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
            {loading && <Loading />}
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
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <HStack px={5} py={1} alignItems="center" justifyContent="center">
                            <Rating
                                ratingCount={5}
                                imageSize={35}
                                readonly={true}
                                startingValue={ReviewData.length ? (ratesum / ReviewData.length).toFixed() : 0}
                                tintColor={COLOR.bg1}
                            />
                            <Text color={COLOR.black} ml={3} fontSize={30}>{ReviewData.length ? (ratesum / ReviewData.length).toFixed() : 0}.0</Text>
                        </HStack>
                        <Text textAlign="center" color="gray.400" fontSize="xs">Based  on {ReviewData.length} Reviews</Text>
                        {
                            ReviewData.map((item, ids) => (
                                <Box my={2} key={ids}>
                                    <HStack py={2} alignItems="center" borderTopWidth={1} pt={5} borderColor="gray.200">
                                        <Image borderRadius={100} size="xs" source={item.userInfo[0].avatar ? { uri: `${ROOT.IMAGE_URL}users/` + item.userInfo[0].avatar } : Images.Profile} />
                                        <Stack ml={4}>
                                            <Text color={COLOR.black} mb={1} fontSize="sm">{item.userInfo[0].username}</Text>
                                        </Stack>
                                    </HStack>
                                    <HStack alignItems="center">
                                        <Rating
                                            tintColor={COLOR.bg1}
                                            ratingCount={5}
                                            imageSize={13}
                                            readonly={true}
                                            startingValue={item.rate}
                                        />
                                        <Text color={COLOR.black} ml={3} fontSize={11}>{moment(new Date(item.date)).format('DD MMMM YYYY')}</Text>
                                    </HStack>
                                    <Stack pb={3} pt={2}>
                                        <Text color={COLOR.black} fontSize="sm">{item.title}</Text>
                                        <Text color={COLOR.black} fontSize={11}>{item.text}</Text>
                                    </Stack>
                                    <TextArea bg={COLOR.white} onChangeText={setreply} placeholderTextColor="gray.300" size="sm" textAlignVertical='top' _focus={{ borderColor: "gray.200" }} h="110px" borderRadius={15} placeholder="Reply here" />

                                </Box>
                            ))
                        }
                        <Box h={5}></Box>
                    </ScrollView>

                </Stack>
            </Box>
        </Box>
    )
}

export default ReviewScreen