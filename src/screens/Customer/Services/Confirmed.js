import React, { Fragment, useEffect, useState } from 'react'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Checkbox } from 'native-base'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import moment from 'moment';
import { useSelector } from 'react-redux';

const ConfirmedScreen = ({ navigation }) => {
    const { bookdata, user } = useSelector((store) => store.auth);
    const [loading, setLoading] = useState(false)

    return (
        <Box flex={1} bg={COLOR.bg1}>
            {loading && <Loading />}
            <Stack flex={1} pt={2} px={8} pb={5} bg={COLOR.base}>
                <Stack flex={1} justifyContent="center"  alignItems="center"> 
                    <Icon size={24} color={COLOR.white}>{LAYOUT.CheckIcon}</Icon>
                    <Text mt={8} mb={2} color={COLOR.white} fontSize="xl">Appointment Conformed</Text>
                    <Text color={COLOR.white} fontSize="xl">{moment(bookdata.day).format('DD MMMM YYYY') + " " + bookdata.time}</Text>
                    <HStack my={5} alignItems="center" justifyContent="center" space={2} bg="#bf7c39" py={2} px={4} borderRadius="pill">
                        <Icon color={COLOR.white} size={4} as={<MaterialCommunityIcons name="calendar-month-outline" />} />
                        <Text color={COLOR.white} fontSize={11}>Add to Calendar</Text>
                    </HStack>
                    <Text mb={1} mt={3} color={COLOR.white} fontSize="sm">You're done! We'll send you reminder</Text>
                    <Text color={COLOR.white} fontSize="sm">before your appointment</Text>
                    <Text color="#b06d2a" bold mt={4} fontSize="xl">THANK YOU</Text>
                </Stack>
                <Button onPress={() => navigation.navigate("HomeScreen")} variant="ghost" h={45} my={5} bg={COLOR.white} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.base}>GO TO HOME</Text></Button>
            </Stack>
        </Box>
    )
}

export default ConfirmedScreen