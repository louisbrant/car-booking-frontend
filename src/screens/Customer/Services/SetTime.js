import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Checkbox, CheckIcon, Select, TextArea, Modal, useToast, Spinner } from 'native-base'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { service_book_store } from '../../../redux/actions/authActions';
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const SetScheduleScreen = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast();
    const { user, bookdata } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [loadingNext, setloadingNext] = useState(false)
    const [time, setTime] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [TimeBox, setTimeBox] = useState(LAYOUT.ServiceTime)
    const [petskey, setpetskey] = useState([])
    const [pets, setpets] = useState([])
    const [groomplace, setgroomplace] = useState()
    const [note, setnote] = useState()
    const [selectedDay, setSelectedDay] = useState();
    const [exceptTime, setExceptTime] = useState([]);
    const [Dogs, setDogs] = useState([])

    // const getDaysInMonth = (month, year, sday) => {
    //     let days = [];
    //     for (const key in bookdata.SelectedService.openingHours) {
    //         if (!bookdata.SelectedService.openingHours[key].status) {
    //             days.push(key);
    //         }
    //     }
    //     let pivot = moment().month(month).year(year).startOf('month')
    //     const end = moment().month(month).year(year).endOf('month')

    //     let dates = {}
    //     const disabled = { disabled: true, disableTouchEvent: true }
    //     while (pivot.isBefore(end)) {
    //         days.forEach((day) => {
    //             dates[pivot.day(day).format("YYYY-MM-DD")] = disabled
    //         })
    //         pivot.add(7, 'days')
    //     }
    //     if (sday) {
    //         let day = moment(sday).format('dddd');
    //         let startTime = 9;
    //         let endTime = 18;
    //         let temp = [];
    //         if (endTime - startTime > 0) {
    //             for (let i = 0; i < endTime - startTime - 1; i++) {
    //                 if (startTime * 1 + i < 12) {
    //                     temp.push(startTime * 1 + i + ":00 AM");
    //                     temp.push(startTime * 1 + i + ":30 AM");
    //                 } else {
    //                     temp.push(startTime * 1 + i - 12 + ":00 PM");
    //                     temp.push(startTime * 1 + i - 12 + ":30 PM");
    //                 }
    //             }
    //             setTimeBox(temp);
    //             setTime();
    //         }
    //     }

    //     return dates
    // }
    const [markedDates, setMarkedDates] = useState();

    const getDailyAppointment = (date) => {
        Api.LoadAppointData({ day: date }).then(({ data }) => {
            let tempexcept = [];
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < LAYOUT.ServiceTime.length; j++) {
                    if (data[i].time === LAYOUT.ServiceTime[j]) {
                        tempexcept.push(data[i].time);
                        if (data[i].pets.length > 2) {
                            if (LAYOUT.ServiceTime[j] !== "5:30 PM") {
                                tempexcept.push(LAYOUT.ServiceTime[j + 1]);
                            }
                        }
                    }
                }
            }
            setExceptTime(tempexcept);
            setTime();
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            console.log(`LoadAppointData`, error)
        })
    }

    const LoadData = () => {
        if (bookdata.petType === "dog") {
            Api.GetDogPro({ owner: user.email }).then(({ data }) => {
                setDogs(data)
                setLoading(false)
            }).catch(error => {
                setLoading(false)
            })
        } else {
            Api.GetCatPro({ owner: user.email }).then(({ data }) => {
                setDogs(data)
                setLoading(false)
            }).catch(error => {
                setLoading(false)
            })
        }
    }

    const Addpet = (_id, item) => {
        setLoading(true)
        setModalVisible(false);
        setpets(prev => {
            return [...prev, item];
        })
        setpetskey(prev => {
            return [...prev, _id];
        })
        setLoading(false)
    }

    const Next = () => {
        if (petskey.length === 0) {
            return Toast.show({ title: "Please select pets!", placement: 'bottom', status: 'error' , w: 400  });
        }
        if (!selectedDay) {
            return Toast.show({ title: "Please select day!", placement: 'bottom', status: 'error' , w: 400  });
        }
        if (!time) {
            return Toast.show({ title: "Please select time!", placement: 'bottom', status: 'error' , w: 400  });
        }
        // if (!groomplace) {
        //     return Toast.show({ title: "Please select place!", placement: 'bottom', status: 'error' , w: 400  });
        // } 
        else {
            setloadingNext(true)
            dispatch(service_book_store({
                 note, pets, time, day: selectedDay
            }));
            navigation.navigate("SignatureScreen")
            setloadingNext(false)
        }
    }

    const DeletePet = (_id) => {
        setpetskey(prev => {
            let index = prev.indexOf(_id);
            if (index >= 0) {
                prev.splice(index, 1);
                setpets(pre => {
                    pre.splice(index, 1);
                    return [...prev];
                })
            }
            return [...prev];
        })
    }

    useEffect(() => {
        setLoading(true)
        LoadData()
    }, [navigation])


    return (
        <Box flex={1} bg={COLOR.bg1}>
            {loading && <Loading />}
            <Headers
                title={'SCHEDULE APPOINTMENT'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Stack flex={1} pt={2} px={8} pb={5}>
                    <Stack borderBottomWidth={2} borderColor="gray.200">
                        <Text fontSize="sm" mb={3} color={COLOR.black}>{"Select Pet"}</Text>
                        {
                            Dogs.map((item, ids) => {
                                if (petskey.indexOf(item._id) !== -1) {
                                    return <Stack key={ids} my={1} bg={COLOR.white} borderWidth={2} borderColor={COLOR.base} borderRadius={12}>
                                        <HStack alignItems="center" p={2}>
                                            <Box position="absolute" right={12} top={3}>
                                                <TouchableOpacity onPress={() => navigation.navigate("DogProfileScreen", item)}>
                                                    <Icon size="xs" color={COLOR.base} as={<AntDesign name="edit" />} />
                                                </TouchableOpacity>
                                            </Box>
                                            <Box position="absolute" right={3} top={3}>
                                                <TouchableOpacity onPress={() => DeletePet(item._id)}>
                                                    <Icon size="xs" color={COLOR.base} as={<AntDesign name="close" />} />
                                                </TouchableOpacity>
                                            </Box>
                                            <Image size="sm" borderRadius={100} source={item.avatar ? { uri: `${ROOT.IMAGE_URL}profile/` + item.avatar } : Images.Dog} />
                                            <Stack>
                                                <Text fontSize="xs" pl={4} color={COLOR.base}>{item.name}</Text>
                                                <Text fontSize="10px" my={1} pl={4} color="gray.400">{item.age} years old</Text>
                                                <Text fontSize={10} pl={4} color={COLOR.black}>{item.breed}</Text>
                                            </Stack>
                                        </HStack>
                                    </Stack>
                                }
                            })
                        }
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <HStack alignItems="center" my={3} >
                                <Icon size="sm" color="gray.400" as={<Ionicons name="add-circle-outline" />} />
                                <Text fontSize={10} color="gray.400">   Add another pet to this appointment</Text>
                            </HStack>
                        </TouchableOpacity>
                    </Stack>

                    <Stack borderBottomWidth={2} borderColor="gray.200" pb={4}>
                        <Text fontSize="sm" my={3} color={COLOR.black}>{"Choose date and time."}</Text>
                        <Calendar
                            minDate={new Date()}
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
                                setLoading(true);
                                setMarkedDates({
                                    [day.dateString]: {
                                        selected: true,
                                    }
                                });
                                setSelectedDay(day.dateString);
                                getDailyAppointment(day.dateString);
                            }}
                        />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <HStack py={2}>
                                {
                                    TimeBox.map((item, ids) => {
                                        if (time === item) {
                                            return <Button colorScheme="orange" key={ids} borderRadius="pill" bg={COLOR.base} py={1} ml={3} pb={-1}><Text fontSize="xs" color={COLOR.white}>{item}</Text></Button>
                                        } else {
                                            return <Button onPress={() => setTime(item)} disabled={exceptTime.indexOf(item) === -1 ? false : true} colorScheme="orange" key={ids} variant="outline" borderColor="gray.500" justifyContent="center" borderRadius="pill" bg={COLOR.white} borderWidth={1} ml={3} py={1} pb={-1}><Text fontSize="xs" color={COLOR.black}>{item}</Text></Button>
                                        }
                                    })
                                }
                            </HStack>
                        </ScrollView>
                    </Stack>
                    {/* <Stack borderBottomWidth={2} borderColor="gray.200" pb={4}>
                        <Text fontSize="sm" my={3} color={COLOR.black}>{"Where can your pet be groomed?"}</Text>
                        <Select
                            // selectedValue={language}
                            minWidth={200}
                            borderRadius={15}
                            color={COLOR.black}
                            bg={COLOR.white}
                            fontSize="sm"
                            h={45}
                            accessibilityLabel="Select your favorite programming language"
                            placeholder="Select"
                            onValueChange={setgroomplace}
                            _selectedItem={{
                                bg: "cyan.600",
                                endIcon: <CheckIcon size={4} />,
                            }}
                        >
                            <Select.Item label="table" value="table" />
                            <Select.Item label="bathtub" value="bathtub" />
                            <Select.Item label="kitchen sink" value="ks" />
                            <Select.Item label="Others" value="Other" />
                        </Select>
                    </Stack>
                    <TextArea bg={COLOR.white} onChangeText={setnote} placeholderTextColor="gray.400" size="sm" textAlignVertical='top' p={4} _focus={{ borderColor: "gray.300" }} h={20} borderRadius={15} placeholder="Leave special note here..." my={5} /> */}

                    <Button
                        my={5}
                        variant="ghost"
                        bg={COLOR.base}
                        onPress={Next}
                        colorScheme="orange"
                        borderRadius={15}
                        h={45}
                        disabled={loadingNext}
                    >
                        {loadingNext ?
                            <Spinner size='sm' /> :
                            <Text pt={1} fontSize="md" color={COLOR.white} >Continue</Text>
                        }

                    </Button>
                </Stack>
            </ScrollView>
            <Modal isOpen={modalVisible} onClose={setModalVisible} size="lg">
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header _text={{color:COLOR.base}}>Your pets</Modal.Header>
                    <Modal.Body>
                        {Dogs.length ?
                            Dogs.map((item, ids) => {
                                if (petskey.indexOf(item._id) === -1) {
                                    return <TouchableOpacity key={ids} onPress={() => Addpet(item._id, item)}>
                                        <Stack my={2} bg={COLOR.white} borderWidth={2} borderColor={COLOR.base} borderRadius={12}>
                                            <HStack alignItems="center" p={2}>
                                                <Image size="sm" borderRadius={100} source={item.avatar ? { uri: `${ROOT.IMAGE_URL}profile/` + item.avatar } : Images.Dog} />
                                                <Stack>
                                                    <Text fontSize="xs" pl={4} color={COLOR.base}>{item.name}</Text>
                                                    <Text fontSize="10px" my={1} pl={4} color="gray.400">{item.age} years old</Text>
                                                    <Text fontSize={10} pl={4} color={COLOR.black}>{item.breed}</Text>
                                                </Stack>
                                            </HStack>
                                        </Stack>
                                    </TouchableOpacity>
                                }
                            }) :
                            <TouchableOpacity onPress={() => navigation.navigate("DogProfileScreen")}>
                                <HStack alignItems="center" my={3} >
                                    <Icon size="sm" color="gray.400" as={<Ionicons name="add-circle-outline" />} />
                                    <Text fontSize={10} color="gray.400">   Add pet to this appointment</Text>
                                </HStack>
                            </TouchableOpacity>
                        }
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Box>
    )
}

export default SetScheduleScreen