import React, { Fragment, useEffect, useState } from 'react'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Checkbox } from 'native-base'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../components'
import { COLOR, Images, LAYOUT } from '../../constants'
import { useSelector } from 'react-redux';
import { setUserInfo } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux';

const ConfirmedScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { service } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false)

    const Next = () => {
        dispatch(setUserInfo(service.user))
        navigation.navigate("SignInScreen");
    }

    return (
        <Box flex={1} bg={COLOR.bg1}>
            {loading && <Loading />}
            <Stack flex={1} pt={2} px={8} pb={5} bg={COLOR.base}>
                <Stack flex={1} pb={10} justifyContent="center" alignItems="center">
                    <Icon size={20} color={COLOR.white}>{LAYOUT.CheckIcon}</Icon>
                    <Text mt={8} color={COLOR.white} fontSize="xl">Congratulations!</Text>
                    <Text color={COLOR.white} fontSize="xl">You are all set!</Text>
                    <Text mt={5} color={COLOR.white} fontSize="sm">Your profile is now available for</Text>
                    <Text color={COLOR.white} fontSize="sm">clients, they can book your</Text>
                    <Text color={COLOR.white} fontSize="sm">appointment online!</Text>
                </Stack>
                <Button onPress={Next} variant="ghost" h={45} my={5} bg={COLOR.white} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.base}>Let's, Get Started</Text></Button>
            </Stack>
        </Box>
    )
}

export default ConfirmedScreen