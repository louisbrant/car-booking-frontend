import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View } from 'native-base'
import normalize from 'react-native-normalize'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'


const HomeScreen = ({ navigation }) => {
    const Api = useApi()
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth);

    const LoadExchangeInfo = () => {
        // setLoading(true)
        // Api.LoadExchangeInfo().then(({ data }) => {
        //     setLoading(false)
        //     setExchangeInfo(data.data)
        // }).catch(error => {
        //     setLoading(false)
        //     console.log(`LoadExchangeInfo`, error)
        // })
    }

    useEffect(() => {
        LoadExchangeInfo()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1}>
            {loading && <Loading />}
            <Headers
                title={'Home'}
                left={
                    <TouchableOpacity onPress={navigation.openDrawer}>
                        <Icon borderRadius={8} bg={COLOR.base} size='md' color={COLOR.white} >{LAYOUT.drawerIcon}</Icon>
                    </TouchableOpacity>
                }
            />
            <View justifyContent="center" flex={1} alignItems="center" px={7}>
                <Image resizeMode="contain" source={user.roles === "customer" ? Images.Homelogo : Images.ProviderDash} mb={12} />
                <Text textAlign="center" color={COLOR.base} fontSize="sm">Pet grooming services</Text>
                <Text textAlign="center" color={COLOR.base} fontSize={11}>Treat Your Pet Like Royalty</Text>
                {/* <Text textAlign="center" color={COLOR.black} fontSize={11}>adipiscing elit, sed do eiusmod tempor.</Text> */}
                <Button my={12} onPress={() => navigation.navigate("ServicesScreen")} w="100%" variant="ghost" borderRadius={15} h={45} bg={COLOR.base} colorScheme="orange">
                    <Text color={COLOR.white} fontSize="md" pt={1}>Explore services</Text>
                </Button>
            </View>
            <Footers routeName={``} />
        </Box>
    )
}

export default HomeScreen