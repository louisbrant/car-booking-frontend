import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, Checkbox } from 'native-base'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { SliderBox } from 'react-native-image-slider-box'
import moment from 'moment'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../components'
import { COLOR, Images, LAYOUT } from '../../constants'
import { useApi } from '../../redux/services'
import DateTimePickerModal from "@react-native-community/datetimepicker";
import { useDispatch } from 'react-redux'
import { register_service_store } from '../../redux/actions/authActions'

const OpeningHourScreen = ({ navigation }) => {
    const Api = useApi()
    const dispatch = useDispatch()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [loading, setLoading] = useState(false)
    const [AppointData, setAppointData] = useState(false)
    const [SelectedWeek, setSelectedWeek] = useState()
    const [SelectedM, setSelectedM] = useState()
    const [Rerender, SetRerender] = useState(false);

    const Weeks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    let [openingHours, SetopeningHours] = useState(LAYOUT.DefaultTimes);

    const showDatePicker = (week, M) => {
        setSelectedWeek(week);
        setSelectedM(M);
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const stateChange = (key) => {
        openingHours[key].status = !openingHours[key].status;
        SetRerender(!Rerender);
    };

    const toChange = (key, val) => {
        openingHours[key].to = val;
        SetRerender(!Rerender);
        return;
    };

    const fromChange = (key, val) => {
        openingHours[key].from = val;
        SetRerender(!Rerender);
        return;
    };

    const handleConfirm = (date) => {
        let time = moment(date).format('HH:mm');
        hideDatePicker();
        if (SelectedM === 0) {
            fromChange(SelectedWeek, time);
        } else {
            toChange(SelectedWeek, time);
        }
    };

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

    const Next = () => {
        dispatch(register_service_store({
            openingHours
        }));
        navigation.navigate("ServiceProScreen");
    }

    useEffect(() => {
        LoadAppointData()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            <Headers
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={2} flex={1}>
                <Stack flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <Text color={COLOR.black} fontSize="lg">Your Opening Hours</Text>
                        <Text fontSize={13} color="gray.500">When can clients book with you?</Text>
                        <Stack mt={5} >
                            {
                                Weeks.map((item, ids) => {
                                    return <HStack key={ids} alignItems="center" justifyContent="space-between" bg={COLOR.white} my={1} p={3} pr={5} w="100%" borderRadius={10}>
                                        <View w="40%" alignItems="flex-start">
                                            <Checkbox
                                                onChange={() => stateChange(item)}
                                                value={COLOR.base}
                                                colorScheme="orange"
                                                aria-label="check"
                                                size="md"
                                                icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                                defaultIsChecked={openingHours[item].status}
                                            >
                                                <Text ml={3} fontSize="xs" color={COLOR.black}>
                                                    {item}
                                                </Text>
                                            </Checkbox>
                                        </View>
                                        <HStack>
                                            <Text fontSize="xs" onPress={() => showDatePicker(item, 0)} color={COLOR.black} >{openingHours[item].from}</Text>
                                            <Text fontSize="xs" color={COLOR.black} > - </Text>
                                            <Text fontSize="xs" onPress={() => showDatePicker(item, 1)} color={COLOR.black} >{openingHours[item].to}</Text>
                                        </HStack>
                                        <Icon size="xs" borderRadius={100} bg="gray.100" as={<Entypo name="chevron-right" />} />
                                    </HStack>
                                })
                            }
                        </Stack>
                    </ScrollView>
                    {
                        isDatePickerVisible &&
                        <DateTimePickerModal
                            mode="date"
                            onChange={(a, b) => handleConfirm(b)}
                            is24Hour={true}
                            value={new Date()}
                        />
                    }
                </Stack>
                <Button mb={10} variant="ghost" bg={COLOR.base} onPress={Next} h={45} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.white}>Continue</Text></Button>
            </Box>
        </Box>
    )
}

export default OpeningHourScreen