import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, useToast } from 'native-base'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const SettingScreen = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast();
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);
    const [loading, setLoading] = useState(false)
    const [AppointData, setAppointData] = useState(false)
    const [currentPass, setcurrentPass] = useState()
    const [password, setpassword] = useState()
    const [confirmPass, setconfirmPass] = useState()


    const Save = () => {
        if (currentPass && password && confirmPass) {
            if (password === confirmPass) {
                Api.ResetPassword({ email: user.email, password, old: currentPass }).then(({ data }) => {
                    if (data.status) {
                        Toast.show({ title: data.msg, placement: 'bottom', status: 'success', w: 400  })
                        return navigation.goBack()
                    } else {
                        return Toast.show({ title: data.msg, placement: 'bottom', status: 'error' , w: 400 })
                    }
                })
            } else {
                return Toast.show({ title: "ConfirmPassword is incorrect!", placement: 'bottom', status: 'error' , w: 400 })
            }
        } else {
            return Toast.show({ title: "Something is incorrect!", placement: 'bottom', status: 'error', w: 400  })
        }
    }

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            <Headers
                title={'Change Password'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={2} flex={1}>
                <Stack flex={1}>
                    <Input h={42} onChangeText={setcurrentPass} value={currentPass} my={1} size="sm" borderRadius={10} bg={COLOR.white}  _focus={{ borderColor: "gray.200" }} placeholder="Current Password"
                        _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }} type="password"
                    />
                    <Input h={42} onChangeText={setpassword} value={password} my={1} size="sm" borderRadius={10} bg={COLOR.white}  _focus={{ borderColor: "gray.200" }} placeholder="New Password"
                        _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }} type="password"
                    />
                    <Input h={42} onChangeText={setconfirmPass} value={confirmPass} my={1} size="sm" borderRadius={10} bg={COLOR.white}  _focus={{ borderColor: "gray.200" }} placeholder="Confirm Password"
                        _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }} type="password"
                    />
                    <Button mt={16} variant="ghost" bg={COLOR.base} onPress={Save} h={45} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.white}>Change</Text></Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default SettingScreen