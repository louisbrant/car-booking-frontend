import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, } from 'native-base'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'
import moment from 'moment'

const MessageScreen = ({ navigation }) => {
    const Api = useApi()
    const { user } = useSelector((store) => store.auth);

    const [loading, setLoading] = useState(false)
    const [ListData, setListData] = useState([])
    const [subtext, setSubtext] = useState({})
    const [OnlineUsers, setOnlineUsers] = useState([])

    const LoadData = () => {
        setLoading(true)
        Api.LoadAppointData(user.roles === "customer" ? { client: user.email } : { groomer: user.email }).then(({ data }) => {
            let tempListData = [];
            if (user.roles === "customer") {
                for (let i = 0; i < data.length; i++) {
                    let k = 0;
                    for (let j = 0; j < tempListData.length; j++) {
                        if (data[i].groomer === tempListData[j].email) {
                            k++;
                            break;
                        }
                    }
                    if (k === 0) {
                        tempListData.push(data[i].groomerInfo[0]);
                    }
                }
            } else {
                for (let i = 0; i < data.length; i++) {
                    let k = 0;
                    for (let j = 0; j < tempListData.length; j++) {
                        if (data[i].client === tempListData[j].email) {
                            k++;
                            break;
                        }
                    }
                    if (k === 0) {
                        tempListData.push(data[i].userInfo[0]);
                    }
                }
            }
            setListData(tempListData);
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            console.log(`LoadAppointData`, error)
        })
    }


    useEffect(() => {
        ROOT.Socket.emit("get user");
        ROOT.Socket.on("new user", function (data) {
            setOnlineUsers(data);
        });
        LoadData()
        return () => {
            ROOT.Socket.off("get user");
            ROOT.Socket.off("new user");
        }
    }, [])

    useEffect(() => {
        const didBlurSubscription = navigation.addListener(
            'didFocus', payload => {
            }
        );

        for (let i = 0; i < ListData.length; i++) {
            let msg = {
                receiver: ListData[i].email,
                sender: user.email,
            };
            ROOT.Socket.emit("get msg", msg);
        }
        ROOT.Socket.on("receive msg", (data) => {
            let tempTitle = {};
            for (let i = 0; i < data.length; i++) {
                if (data[i].sender === user.email) {
                    tempTitle[data[i].receiver] = {
                        title: data[i].text,
                        date: data[i].senddate
                    }
                } else {
                    tempTitle[data[i].sender] = {
                        title: data[i].text,
                        date: data[i].senddate
                    }
                }
            }
            setSubtext(prev => {
                return { ...prev, ...tempTitle };
            })
        })
        return () => {
            ROOT.Socket.off("receive msg");
            ROOT.Socket.off("get msg");
            didBlurSubscription.remove();
        }
    }, [ListData, navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            <Headers
                title={'Messages'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} flex={1}>
                <Stack flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            ListData.map((item, ids) => (
                                <TouchableOpacity key={ids} onPress={() => navigation.navigate("ChatpageScreen", { groomer: item })}>
                                    <HStack py={2} alignItems="center" borderBottomWidth={1} borderColor="gray.300">
                                        <Image size="sm" w="60px" h="60px" borderRadius={200} resizeMode="cover" source={item.avatar ? { uri: `${ROOT.IMAGE_URL}users/` + item.avatar } : user.roles === "customer" ? Images.GroomerAvata : Images.Profile} />
                                        <Stack ml={3} w="76%">
                                            <HStack alignItems="center" justifyContent="space-between" mb={1}>
                                                <HStack alignItems="center">
                                                    <Text color={COLOR.black} fontSize="sm">{item.username}</Text>
                                                    {
                                                        OnlineUsers.indexOf(item.email) !== -1 ?
                                                            <HStack alignItems="center">
                                                                <Box mx={1} mt={-1} w={2.5} h={2.5} borderRadius={50} bg="green.500"></Box>
                                                                <Text color="green.500" fontSize={9}>Online</Text>
                                                            </HStack>
                                                            : null
                                                    }
                                                </HStack>
                                                <HStack alignItems="center" justifyContent="space-between">
                                                    <Icon size={2} color="gray.400" as={<AntDesign name="clockcircleo" />} />
                                                    <Text ml={1} color="gray.400" fontSize={9}>{subtext[item.email] ? moment(new Date(subtext[item.email].date)).endOf('day').fromNow() : null}</Text>
                                                </HStack>
                                            </HStack>
                                            <Text color={COLOR.black} fontSize={11} numberOfLines={1}>
                                                {subtext[item.email] ? subtext[item.email].title : null}
                                            </Text>
                                        </Stack>
                                    </HStack>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </Stack>
            </Box>
        </Box>
    )
}

export default MessageScreen