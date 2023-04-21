import React, { useCallback, useState, useEffect } from 'react';
import { COLOR, Images, LAYOUT, ROOT } from "../../constants";
import { ScrollView, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, Menu, Pressable, useToast } from "native-base";
import Slider from 'rn-range-slider';
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Feather, FontAwesome } from "@expo/vector-icons"

// import CalendarPicker from 'react-native-calendar-picker';
// import { Calendar, CalendarList } from "react-native-calendars";
// import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarList from 'react-native-calendar-list';

import { BottomTab } from '../../components';
import { useDispatch, useSelector } from 'react-redux'

import Thumb from './Slider/Thumb';
import Rail from './Slider/Rail';
import RailSelected from './Slider/RailSelected';
import Notch from './Slider/Notch';
import Label from './Slider/Label';

import { useApi } from '../../redux/services'
import { Logut } from '../../redux/actions/authActions'

import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../components'

import Swiper from 'react-native-swiper'

import Homebg from "./../../assets/img/home-background.png"
import { position } from 'styled-system';

const markStyle = { dayTextStyle: { color: 'white', fontSize: 14, fontWeight: 'bold' }, dayBackgroundColor: '#08a' };
const bgstyle = { width: "100%", height: "100%" };

const HomePage = ({ navigation }) => {
    const { user } = useSelector((store) => store.auth);

    const [loading, setLoading] = useState(false);

    const { width } = Dimensions.get('window')
    const { height } = Dimensions.get('window')

    const goLogIn = () => {
        navigation.navigate("SignInScreen");
    }

    const goSignUp = () => {
        navigation.navigate("SignUpScreen");
    }

    useEffect(() => {
        console.log(user);
        if (user?.roles) {
            navigation.navigate("CarHomeScreen");
        }
    }, [navigation])

    if (loading) {
        return (
            <Box style={{ width: '100%', height: "100%", backgroundColor: COLOR.Homebgcolor }}
            >
                <Loading />
            </Box>
        )
    }
    else {
        return (
            <Box
                flex={1}
            >
                <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                    <Box
                        w="full"
                        style={{
                            shadowColor: "#B1A9A9",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.15,
                            shadowRadius: 24,
                            // elevation: 1,
                        }}
                    >
                        <Box w="full">
                            <Stack alignItems="center" justifyContent='center' pb={1}>
                                <Swiper
                                    style={{
                                        // position: 'absolute',
                                        zIndex: 0
                                    }}
                                    loop={false}
                                    autoplayDirection={false}
                                    showsButtons={false}
                                    autoplay={false}
                                    autoplayTimeout={3}
                                    showsPagination={false}
                                    dot={
                                        <View
                                            style={{
                                                backgroundColor: 'rgba(24, 91, 222, 0.2)',
                                                width: 5,
                                                height: 5,
                                                borderRadius: 4,
                                                marginLeft: 3,
                                                marginRight: 3,
                                                marginTop: 3,
                                                marginBottom: 3
                                            }}
                                        />
                                    }
                                    activeDot={
                                        <View
                                            mt={-5}
                                            style={{
                                                backgroundColor: 'rgba(24, 91, 222, 1)',
                                                width: 5,
                                                height: 5,
                                                borderRadius: 4,
                                                marginLeft: 3,
                                                marginRight: 3,
                                                marginTop: 3,
                                                marginBottom: 3
                                            }}
                                        />
                                    }

                                >
                                    {
                                        Images.HomeSliders.map((item, i) => {
                                            return (
                                                <View
                                                    key={i}
                                                    style={{
                                                        flex: 1,
                                                        backgroundColor: 'transparent',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <ImageBackground
                                                        resizeMode="cover"
                                                        style={{
                                                            width: width,
                                                            height: height,
                                                            flex: 1
                                                        }}
                                                        size={'contain'}
                                                        source={item}
                                                    />
                                                </View>
                                            )
                                        })
                                    }
                                </Swiper>
                                <Box
                                    style={{
                                        zIndex: 1,
                                        position: 'absolute'
                                    }}
                                >
                                    <Box py={100} px={135}  >
                                        <Box
                                            width={100}
                                            style={{
                                                height: 60,
                                                borderWidth: 4,
                                                borderColor: COLOR.white,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text
                                                color={COLOR.white}
                                                fontWeight="bold"
                                                fontSize="24"
                                                pt={1}
                                            >
                                                IZRA
                                            </Text>
                                        </Box>
                                    </Box>
                                    <Box pt={170} py={5} >
                                        <Text
                                            color={COLOR.white}
                                            fontWeight="bold"
                                            fontSize="24"
                                            textAlign="center"
                                        >
                                            For the traveling heart
                                        </Text>
                                    </Box>
                                    <Box
                                        px={3}
                                        py={5}
                                    >
                                        <Box
                                            style={{
                                                width: '100%',
                                                height: 45,
                                                backgroundColor: COLOR.IBase,
                                                borderRadius: 5,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            onTouchStart={goSignUp}
                                        >
                                            <Text
                                                color={COLOR.white}
                                                fontWeight="bold"
                                                fontSize="18"
                                                textAlign="center"
                                            >Sign up
                                            </Text>
                                        </Box>
                                    </Box>
                                    <Box
                                        px={3}
                                    >
                                        <Box
                                            style={{
                                                width: '100%',
                                                height: 45,
                                                backgroundColor: COLOR.Loginbtn,
                                                borderRadius: 5,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderWidth: 0.3,
                                                borderStyle: "solid",
                                                borderColor: COLOR.white,
                                            }}
                                            onTouchStart={goLogIn}
                                        >
                                            <Text
                                                color={COLOR.white}
                                                fontWeight="bold"
                                                fontSize="18"
                                                textAlign="center"
                                            >Log in
                                            </Text>
                                        </Box>
                                    </Box>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                </ScrollView>
            </Box>
        );
    }
};
export default HomePage;