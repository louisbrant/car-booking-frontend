import React, { useCallback, useState, useEffect } from 'react';
import { COLOR, Images, LAYOUT, ROOT } from "../../constants";
import { ScrollView, TouchableOpacity } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, Menu, Pressable, useToast } from "native-base";
import Slider from 'rn-range-slider';
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Feather, FontAwesome } from "@expo/vector-icons"

// import CalendarPicker from 'react-native-calendar-picker';
// import { Calendar, CalendarList } from "react-native-calendars";
// import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarList from 'react-native-calendar-list';

import { BottomTab } from '../../components';
import { useDispatch } from 'react-redux'

import Thumb from './Slider/Thumb';
import Rail from './Slider/Rail';
import RailSelected from './Slider/RailSelected';
import Notch from './Slider/Notch';
import Label from './Slider/Label';

import { useApi } from '../../redux/services'
import { Logut } from '../../redux/actions/authActions'

import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../components'

const markStyle = { dayTextStyle: { color: 'white', fontSize: 14, fontWeight: 'bold' }, dayBackgroundColor: '#08a' };

const FirstPage = ({ navigation }) => {
    const dispatch = useDispatch()

    const Toast = useToast()
    const Api = useApi()
    const [loading, setLoading] = useState(false);

    const [highBudget, setHighBudget] = useState(100000);
    const [lowBudget, setLowBudget] = useState(50000);

    const [openIn, setOpenIn] = useState(false);
    const [selectedDay, setSelectedDay] = useState();
    const [markedDates, setMarkedDates] = useState();

    const [marks, setMarks] = useState({ "2022-10-20": markStyle, "2022-10-28": markStyle });

    const [shouldOverlapWithTrigger] = useState(false);

    const renderThumb = useCallback(
        () => <Thumb name={'low'} />,
        [],
    );
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);

    const handleValueChange = useCallback((lowValue, highValue) => {
        setLowBudget(lowValue);
        setHighBudget(highValue);
    }, []);

    const onDetail = () => {
        navigation.navigate("DetailDashboardScreen");
    }

    const onFocus = () => {
        // console.log("Hello")
        // setOpenIn(true);
    }

    const dayPressed = (date) => {
        const newMarks = { ...marks };
        newMarks[date] = markStyle;

        setMarks({ marks: newMarks });
    }

    const onSignOut = () => {
        ROOT.Socket.emit("logout user");
        dispatch(Logut());
        navigation.navigate("SignInScreen");
    }

    const onMyProfile = () => {
        navigation.navigate("MyProfileScreen");
    }

    const [allCars, setAllCars] = useState([]);
    useEffect(() => {
        setLoading(true);
        Api.GetAllCars().then(({ data }) => {
            if (data.status) {
                data = data.data;
                console.log("data=>", data)
                let newcars = [];
                for (let i = 0; i < data.length; i++) {
                    let stars = 0;
                    for (let j = 0; j < data[i]["review"].length; j++) {
                        stars += data[i]["review"][j]["star"];
                    }
                    const newcar = {
                        name: data[i].name,
                        img: ROOT.IMAGE_URL + "cars/" + data[i].img,
                        days: data[i].daysval,
                        engine: data[i].engine,
                        seats: data[i].seats,
                        doors: data[i].doors,
                        automatic: data[i].automatic,
                        star: stars / Number(data[i]["review"].length)
                    }
                    newcars.push(newcar);
                }
                console.log("data=>", newcars)
                setAllCars(newcars);
                setLoading(false);
            }
            else {
                setLoading(false);
                return Toast.show({ title: data.message, placement: 'bottom', status: 'error', w: 300 });
            }
        }).catch(error => {
            setLoading(false);
            if (error.response && error.response.status === 400) {
                return Toast.show({ title: error.response.data, placement: 'bottom', status: 'error', w: 300 })
            } else {
                return Toast.show({ title: "Error!", placement: 'bottom', status: 'error', w: 300 })
            }
        })
    }, [])
    return (
        <Box
            flex={1}
            bg={{
                linearGradient: {
                    colors: ['#F5F5F5', '#F5F5F5'],
                    start: [0, 1],
                    end: [0, 0]
                }
            }}
        >
            {loading && <Loading />}
            <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                <Box
                    pt={10}
                    pb={2}
                    px={5}
                    style={{
                        backgroundColor: COLOR.white,
                        width: '100%',
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
                    <HStack justifyContent="space-between">
                        <TouchableOpacity>
                            <Icon color={COLOR.black} size="md" as={<Entypo name="menu" />} />
                        </TouchableOpacity>
                        <Text color={COLOR.black} fontWeight={600} fontSize={16}>IZRA</Text>
                        <Menu w="150"
                            mt={7} shouldOverlapWithTrigger={shouldOverlapWithTrigger} placement={"bottom right"} trigger={
                                triggerProps => {
                                    return <Pressable {...triggerProps}><Avatar bg="green.500" alignSelf="center" size="sm" source={Images.Profile} /></Pressable>;
                                }}>
                            <Menu.Item onPress={onMyProfile}>My Profile</Menu.Item>
                            <Menu.Item onPress={onSignOut}>Sign Out</Menu.Item>
                        </Menu>
                    </HStack>
                </Box>

                <Box py={3} px={5}>
                    <HStack justifyContent="space-between">
                        <VStack w="48%" space={1}>
                            <Text
                                color={COLOR.inPlaceholder}
                                fontWeight="medium"
                                fontSize="xs"
                            >
                                In
                            </Text>
                            <Input
                                w="full"
                                InputLeftElement={
                                    <Icon
                                        as={<AntDesign name="calendar" />}
                                        size="sm"
                                        ml="2"
                                        color={COLOR.inIconColor}
                                    />
                                }
                                bg={COLOR.white}
                                p={.5}
                                borderStyle="solid"
                                borderWidth={1}
                                borderColor={COLOR.inpBorderColor}
                                borderRadius={5}
                                color={COLOR.black}
                                placeholder="03/06/2022"
                                onFocus={onFocus}
                            />
                        </VStack>
                        <VStack w="48%" space={1}>
                            <Text
                                color={COLOR.inPlaceholder}
                                fontWeight="medium"
                                fontSize="xs"
                            >
                                Out
                            </Text>
                            <Input
                                w="full"
                                InputLeftElement={
                                    <Icon
                                        as={<AntDesign name="calendar" />}
                                        size="sm"
                                        ml="2"
                                        color={COLOR.inIconColor}
                                    />
                                }
                                bg={COLOR.white}
                                p={.5}
                                borderStyle="solid"
                                borderWidth={1}
                                borderColor={COLOR.inpBorderColor}
                                borderRadius={5}
                                color={COLOR.black}
                                placeholder="03/06/2022"
                            />
                        </VStack>
                    </HStack>
                    <HStack justifyContent="flex-start" mt={2}>
                        <VStack w="full" space={1}>
                            <Text
                                color={COLOR.inPlaceholder}
                                fontWeight="medium"
                                fontSize="xs"
                            >
                                Location
                            </Text>
                            <Input
                                w="full"
                                InputLeftElement={
                                    <Icon
                                        as={<EvilIcons name="location" />}
                                        size="sm"
                                        ml="2"
                                        color={COLOR.inIconColor}
                                    />
                                }
                                bg={COLOR.white}
                                p={.5}
                                borderStyle="solid"
                                borderWidth={1}
                                borderColor={COLOR.inpBorderColor}
                                borderRadius={5}
                                color={COLOR.black}
                                placeholder="Nowhere Street, New York"
                            />
                        </VStack>
                    </HStack>

                    <HStack justifyContent="flex-start" mt={2}>
                        <VStack w="full" space={1}>
                            <Text
                                color={COLOR.inPlaceholder}
                                fontWeight="medium"
                                fontSize="xs"
                            >
                                Budget
                            </Text>

                            <Slider
                                style={{ backgroundColor: 'white' }}
                                low={lowBudget}
                                high={highBudget}

                                min={25000}
                                max={150000}

                                step={5}
                                disableRange={false}
                                floatingLabel={false}

                                renderThumb={renderThumb}
                                renderRail={renderRail}
                                renderRailSelected={renderRailSelected}

                                // renderLabel={renderLabel}
                                // renderNotch={renderNotch}

                                onValueChanged={handleValueChange}
                            />

                            <HStack justifyContent="space-between" px={5}>
                                <Text
                                    color={COLOR.black}
                                    fontWeight="medium"
                                    fontSize="xs"
                                >${lowBudget}</Text>
                                <Text
                                    color={COLOR.black}
                                    fontWeight="medium"
                                    fontSize="xs"
                                >${highBudget}</Text>
                            </HStack>

                        </VStack>
                    </HStack>
                </Box>

                <Box
                    bg={COLOR.white}
                    style={{
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,

                        shadowColor: "#B1A9A926",
                        shadowOffset: {
                            width: 0,
                            height: -6,
                        },
                        shadowOpacity: 0.15,
                        shadowRadius: 24,
                        // elevation: 1,
                    }}
                    py={3}
                    px={5}
                >
                    {allCars.map((item, idx) => {
                        return (
                            <Box
                                key={idx}
                                style={{
                                    backgroundColor: COLOR.smBoxColor,
                                    borderStyle: 'solid',
                                    borderWidth: 1,
                                    borderColor: COLOR.smBoxBoderColor,
                                    borderRadius: 10,
                                }}
                                p={3}
                            >
                                <TouchableOpacity onPress={() => onDetail()}>
                                    <HStack justifyContent="space-between">
                                        <Text
                                            color={COLOR.IBase}
                                            fontWeight="bold"
                                            fontSize="sm"
                                        >
                                            ${`${item.days}`}/day
                                        </Text>
                                        <Text
                                            color={COLOR.black}
                                            fontWeight="semibold"
                                            fontSize="sm"
                                        >
                                            {`${item.name}`}
                                        </Text>
                                    </HStack>
                                    <HStack mt={2}>
                                        <VStack space={1} w="1/2">
                                            <HStack>
                                                <VStack w="1/2">
                                                    <Text
                                                        color={COLOR.black}
                                                        fontWeight="semibold"
                                                        fontSize="sm"
                                                    >
                                                        {`${item.engine}`}
                                                    </Text>
                                                    <Text
                                                        color={COLOR.inPlaceholder}
                                                        fontWeight="medium"
                                                        fontSize="xs"
                                                    >Engine</Text>
                                                </VStack>
                                                <VStack w="1/2">
                                                    <Text
                                                        color={COLOR.black}
                                                        fontWeight="semibold"
                                                        fontSize="sm"
                                                    >
                                                        {`${item.seats}`}
                                                    </Text>
                                                    <Text
                                                        color={COLOR.inPlaceholder}
                                                        fontWeight="medium"
                                                        fontSize="xs"
                                                    >Seats</Text>
                                                </VStack>
                                            </HStack>
                                            <HStack>
                                                <VStack w="1/2">
                                                    <Text
                                                        color={COLOR.black}
                                                        fontWeight="semibold"
                                                        fontSize="sm"
                                                    >
                                                        {`${item.doors}`}
                                                    </Text>
                                                    <Text
                                                        color={COLOR.inPlaceholder}
                                                        fontWeight="medium"
                                                        fontSize="xs"
                                                    >Doors</Text>
                                                </VStack>
                                                <VStack w="1/2">
                                                    <Text
                                                        color={COLOR.black}
                                                        fontWeight="semibold"
                                                        fontSize="sm"
                                                    >Automatic</Text>
                                                    <Text
                                                        color={COLOR.inPlaceholder}
                                                        fontWeight="medium"
                                                        fontSize="xs"
                                                    > {`${item.automatic}`}</Text>
                                                </VStack>
                                            </HStack>
                                            <HStack space={2} style={{ alignItems: 'center' }}>
                                                <FontAwesome name="star" size={14} color={COLOR.yellow} />
                                                <HStack space={1}>
                                                    <Text
                                                        color={COLOR.black}
                                                        fontWeight="semibold"
                                                        fontSize="xs"
                                                    >{`${item.star}`}</Text>
                                                    <Text
                                                        color={COLOR.inPlaceholder}
                                                        fontWeight="semibold"
                                                        fontSize="xs"
                                                    >(24.2k)</Text>
                                                </HStack>
                                            </HStack>
                                        </VStack>
                                        <Box
                                            w="1/2"
                                            // borderStyle="solid"
                                            // borderWidth={1}
                                            // borderColor={COLOR.inpBorderColor}
                                            borderRadius={5}
                                            bg={COLOR.white}
                                        >
                                            <Image source={{ uri: item.img }} resizeMode="contain" alt="car" style={{ width: 250, height: 100 }} />
                                        </Box>
                                    </HStack>
                                </TouchableOpacity>
                            </Box>
                        )
                    })}
                </Box>
            </ScrollView>

            <Actionsheet isOpen={openIn} onClose={() => setOpenIn(false)}>
                <Actionsheet.Content>
                    <Box w="100%" bg={COLOR.white}>

                        <Text>Hello</Text>

                        <CalendarList
                            // Dates
                            startDate={'2022-01-01'}
                            monthsCount={12}
                            mondayWeekStart={false}
                            dayNames={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
                            monthNames={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
                            // Selection
                            onDatePress={dayPressed}
                            marks={marks}
                            // Styling
                            showVerticalScrollIndicator
                            enableAutoScrollOnMonthPress
                            enableAutoScrollOnDayPress
                            enableFixVisualLinesArtifacts={true}
                            // Colors and Text Styling
                            dayBackgroundColor={'#fff'}
                            headerBackgroundColor={'#fff'}
                            weekHeaderBoxStyle={{ borderBottomWidth: 0.5, borderBottomColor: 'grey' }}
                            headerTextStyle={{ textAlign: 'left', fontSize: 15, color: 'black' }}
                            weekHeaderTextStyle={{ fontSize: 14, color: '#000' }}
                            dayTextStyle={{ fontSize: 14 }}
                            // Performance
                            initialNumToRender={3}
                            rowHeight={40}
                            headerHeight={42}
                        />

                        {/* <DateTimePicker
                            value={new Date}
                            // onChange={onChange}
                        /> */}
                        {/* <Calendar
                            // minDate={new Date()}
                            current={selectedDay}

                            enableSwipeMonths={true}
                            showWeekNumbers={false}
                            markedDates={markedDates}
                            theme={{
                                backgroundColor: "transparent",
                                calendarBackground: "transparent",
                                textDayFontSize: 16,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 11,
                                textSectionTitleColor: "black",
                                selectedDayBackgroundColor: COLOR.base,
                            }}
                            onDayPress={(day) => {
                                // setLoading(true);
                                setMarkedDates({
                                    [day.dateString]: {
                                        selected: true,
                                    }
                                });
                                setSelectedDay(day.dateString);
                                // getDailyAppointment(day.dateString);
                            }}
                        /> */}

                        {/* <CalendarPicker
                            allowRangeSelection={true}
                            weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
                            scrollable={true}
                            horizontal={false}
                        /> */}

                        {/* <CalendarList
                            initialDate='2022-10-28'
                            current={'2022-10-28'}
                            markedDates={markedDates}

                            enableSwipeMonths={true}
                            showWeekNumbers={false}

                            onDayPress={(day) => {
                                setMarkedDates({
                                    [day.dateString]: {
                                        selected: true,
                                    }
                                });
                                console.log(day, '(day');
                                setSelectedDay(day.dateString);
                                // getDailyAppointment(day.dateString);
                            }}

                            // Callback which gets executed when visible months change in scroll view. Default = undefined
                            // onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
                            // Max amount of months allowed to scroll to the past. Default = 50
                            pastScrollRange={1}
                            // Max amount of months allowed to scroll to the future. Default = 50
                            futureScrollRange={1}
                            // Enable or disable scrolling of calendar list
                            scrollEnabled={true}
                            // Enable or disable vertical scroll indicator. Default = false
                            showScrollIndicator={false}
                        /> */}

                        {/* <CalendarList
                            current={"2022-10-25"}
                            initialDate={"2022-10-25"}

                            hideExtraDays={true}
                            disableMonthChange={true}
                            // Callback which gets executed when visible months change in scroll view. Default = undefined
                            // onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
                            // Max amount of months allowed to scroll to the past. Default = 50
                            pastScrollRange={6}
                            // Max amount of months allowed to scroll to the future. Default = 50
                            futureScrollRange={6}
                            // Enable or disable scrolling of calendar list
                            scrollEnabled={true}
                            // Enable or disable vertical scroll indicator. Default = false
                            showScrollIndicator={true}
                        /> */}


                    </Box>
                </Actionsheet.Content>
            </Actionsheet>

            <BottomTab navigation={navigation} />
        </Box>
    );
};
export default FirstPage;