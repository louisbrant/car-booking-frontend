import React, { useCallback, useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated, SafeAreaView } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, Select, Modal } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, Feather } from "@expo/vector-icons"
import { useDispatch, useSelector } from 'react-redux'

import DatePicker from 'react-native-neat-date-picker'
import DatepickerRange from 'react-native-range-datepicker';

import { TabView, SceneMap } from 'react-native-tab-view';

import SwipePicker from 'react-native-swipe-picker';

import { COLOR, Images, LAYOUT } from "../../../constants";


const RequestBookPage = ({ navigation }) => {

    const { car } = useSelector((store) => store.auth);
    const [currenttime, setCurrentTime] = useState((new Date().toDateString().toString()).replace(" ", ", ") + " 10:00 PM");

    const [modalVisible, setModalVisible] = useState(false);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [showpicker, setShowPicker] = useState(false);

    const [startcheckdate, setStartCheckDate] = useState((new Date().toDateString().toString()).replace(" ", ", ") + " 10:00 PM");
    const [endcheckdate, setEndCheckDate] = useState((new Date().toDateString().toString()).replace(" ", ", ") + " 10:00 PM");

    const onPayRequest = async () => {
        navigation.navigate("RequestConfirmScreen");
    }



    const onSelectCheckDate = (start, end) => {
        setStartCheckDate((new Date(start).toDateString().toString()).replace(" ", ", ") + " 10:00 PM");
        setEndCheckDate((new Date(end).toDateString().toString()).replace(" ", ", ") + " 10:00 PM");
    }

    const onCheckInOutCancel = () => {
        setModalVisible(false);
    }

    const onSelSwipePicker = ({ index, item }, type) => {
        console.log(item, type);
    }

    const onCheckInOutSave = () => {
        console.log("DDDDD");
        setShowPicker(false);
    }

    const { width } = Dimensions.get('window')

    const [showdays, setShowDays] = useState([]);
    const [hours, setHours] = useState([]);
    const [mins, setMins] = useState([]);
    const ms = [
        {
            value: 1,
            label: 'AM'
        },
        {
            value: 2,
            label: 'PM'
        },
        {
            value: 4,
            label: 'FM'
        },
        {
            value: 5,
            label: 'LM'
        },
        {
            value: 6,
            label: 'SM'
        },
        {
            value: 7,
            label: 'CM'
        }
    ];

    let currentyear = new Date().getFullYear();
    let currentdate = new Date().getDate();
    let currentday = new Date().getDay() - 1;
    let currentMon = new Date().getMonth(); - 1
    let mon = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


    useEffect(() => {
        console.log('car=>', car);


        let dates = [], newmins = [], newhours = [];
        for (let i = 0; i < 40; i++) {
            currentday++;
            if (currentday == 7)
                currentday = 0;
            currentdate++;
            if ((currentMon == 0 || currentMon == 2 || currentMon == 4 || currentMon == 6 || currentMon == 7 || currentMon == 9 || currentMon == 11) && currentdate == 32) {
                currentMon++;
                currentdate = 1;
            }
            if ((currentMon == 3 || currentMon == 5 || currentMon == 8 || currentMon == 10) && currentdate == 31) {
                currentMon++;
                currentdate = 1;
            }
            if (currentyear % 4 == 3) {
                if ((currentMon == 1) && currentdate == 29) {
                    currentMon++;
                    currentdate = 1;
                }
            }
            else {
                if ((currentMon == 1) && currentdate == 30) {
                    currentMon++;
                    currentdate = 1;
                }
            }
            if (currentMon == 12) {
                currentyear++;
            }
            let currentdayval = day[currentday] + " " + currentdate + " " + mon[currentMon];
            dates.push({
                value: i,
                label: currentdayval
            });
        }
        setShowDays(dates);
        for (let i = 0; i < 60; i++) {
            let newminitem = {
                value: 0,
                label: 0
            }
            if (i < 10)
                newminitem = {
                    value: i,
                    label: 0 + "" + i
                }
            else
                newminitem = {
                    value: i,
                    label: i.toString()
                }
            newmins.push(newminitem);
        }
        setMins(newmins);

        for (let i = 0; i < 24; i++) {
            let newhouritem = {
                value: 0,
                label: 0
            }
            if (i < 10)
                newhouritem = {
                    value: i,
                    label: 0 + "" + i
                }
            else
                newhouritem = {
                    value: i,
                    label: i.toString()
                }
            newhours.push(newhouritem);
        }
        setHours(newhours);
    }, [])
    return (
        <Box flex={1}>

            {(() => {
                if (showpicker) {
                    console.log('showpicker=>', showpicker);
                    return (
                        <HStack position="absolute" style={{
                            zIndex: 1,
                            backgroundColor: COLOR.white,
                        }} justifyContent="space-between" bottom={0}
                        >
                            <HStack justifyContent="space-between" mb={6}
                            >
                                <SwipePicker
                                    items={showdays}
                                    onChange={(index, item) => onSelSwipePicker({ index, item }, "date")}
                                    initialSelectedIndex={0}
                                    height={300}
                                    width={width * 2 / 5}
                                />

                                <SwipePicker
                                    items={hours}
                                    onChange={(index, item) => onSelSwipePicker({ index, item }, "hour")}
                                    height={300}
                                    width={width / 5}
                                />

                                <SwipePicker
                                    items={mins}
                                    onChange={(index, item) => onSelSwipePicker({ index, item }, "min")}
                                    height={300}
                                    width={width / 5}
                                />

                                <SwipePicker
                                    items={ms}
                                    onChange={(index, item) => onSelSwipePicker({ index, item }, "ms")}
                                    height={300}
                                    width={width / 5}
                                />
                            </HStack>
                            <HStack bottom={3} position="absolute" >
                                <Box px={3}>
                                    <TouchableOpacity onPress={onCheckInOutSave} >
                                        <Box
                                            style={{
                                                width: width - 23,
                                                height: 45,
                                                backgroundColor: COLOR.IBase,
                                                borderRadius: 5,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text
                                                color={COLOR.white}
                                                fontWeight="bold"
                                                fontSize="md"
                                            >
                                                Save date
                                            </Text>
                                        </Box>
                                    </TouchableOpacity>
                                </Box>
                            </HStack>
                        </HStack>
                    )
                }
            })()}
            <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                <Box>
                    <Image source={{ uri: car.img }} h="250" resizeMode="cover" alt="image" />

                    <Center position="absolute" w="full">

                        <Stack pt={10} direction="row" alignItems="center">
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text
                                    color={COLOR.white}
                                    fontWeight="semibold"
                                    fontSize="md"
                                >Request to Book</Text>
                            </View>
                        </Stack>

                    </Center>

                </Box>

                <Box w="full" px={5} py={3} pb={10}>
                    <Box
                        p={3}
                        style={{
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderColor: COLOR.inpBorderColor,
                            borderRadius: 5,
                        }}
                    >
                        <HStack alignItems="center" justifyContent="space-between" >
                            <TouchableOpacity onPress={() => setShowPicker(true)}>
                                <VStack space={1} >
                                    <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">Check-in</Text>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                                        {startcheckdate}
                                    </Text>
                                </VStack>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Icon color={COLOR.inIconColor} size="xs" as={<AntDesign name="right" />} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShowPicker(true)}>
                                <VStack space={1} >
                                    <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">Checkout</Text>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">
                                        {endcheckdate}
                                    </Text>
                                </VStack>
                            </TouchableOpacity>
                        </HStack>
                    </Box>

                    <VStack my={2} space={2}>
                        <HStack alignItems="center" space={2} onTouchStart={onPayRequest}>
                            <Icon color={COLOR.black} size="sm" as={<Ionicons name="ios-location-sharp" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Get Directions</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.black} size="sm" as={<Ionicons name="call" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Call Host</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.black} size="sm" as={<Ionicons name="chatbubble-ellipses" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Message Host</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.black} size="sm" as={<Ionicons name="document-text" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Show Listings</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                    </VStack>

                    <Box mt={3}>
                        <Text fontWeight="bold" fontSize="xs">Reservation details</Text>

                        <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <VStack space={1}>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Who's coming</Text>
                                    <Text fontWeight="semibold" fontSize="xs">1 guest</Text>
                                </VStack>
                                <Image source={Images.Profile5} w={35} h={35} rounded="full" resizeMode="cover" alt="image" />
                            </HStack>
                        </Box>

                        <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <VStack space={1}>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Confirmation code</Text>
                                    <Text fontWeight="semibold" fontSize="xs">QWERTY12345</Text>
                                </VStack>
                            </HStack>
                        </Box>

                        <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <VStack space={1}>
                                    <HStack>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Your booking is protected by </Text>
                                        <Text color={COLOR.black} fontWeight="bold" fontSize="2xs">Izra</Text>
                                    </HStack>
                                    <Text fontWeight="semibold" fontSize="xs" underline>Learn more</Text>
                                </VStack>
                            </HStack>
                        </Box>

                        <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <VStack space={1}>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Cancellation Policy</Text>
                                    <Text fontWeight="semibold" fontSize="xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum aliquet tincidunt. Morbi sed molestie orci.</Text>
                                    <Text color={COLOR.IBase} fontWeight="semibold" fontSize="xs" underline>Read more</Text>
                                </VStack>
                            </HStack>
                        </Box>

                    </Box>

                    <VStack my={2} space={2}>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.black} size="sm" as={<Ionicons name="document-text" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Get a PDF for visa purpose</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.black} size="sm" as={<Ionicons name="wallet" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Add to wallet</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                        <HStack alignItems="center" space={2}>
                            <Icon color={COLOR.black} size="sm" as={<Entypo name="text-document-inverted" />} />
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Text fontWeight="medium" fontSize="sm">Get receipt</Text>
                                    <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                </HStack>
                            </Box>
                        </HStack>
                    </VStack>

                    <Box mt={3}>
                        <Text fontWeight="bold" fontSize="xs">Getting there</Text>
                        <Stack mt={5}>
                            <Image source={Images.Map} h="185" resizeMode="cover" alt="image" />
                        </Stack>
                    </Box>


                    {/* <DatePicker
                        isVisible={checkinout}
                        mode={'range'}
                        onCancel={onCheckInOutCancel}
                        onConfirm={onCheckInOutConfirm}
                        colorOptions={{
                            headerColor: '#9DD9D2',
                            backgroundColor: '#FFF8F0'
                        }
                        }
                    /> */}
                    <Box mt={3}>
                        <VStack>
                            <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <VStack space={1}>
                                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Address</Text>
                                        <Text fontWeight="semibold" fontSize="xs">1234 Collins Avenue,</Text>
                                        <Text fontWeight="semibold" fontSize="xs">Miami Beach, FL, 3345</Text>
                                    </VStack>
                                </HStack>
                            </Box>

                            <VStack my={2} space={2}>
                                <HStack alignItems="center" space={2}>
                                    <Icon color={COLOR.black} size="sm" as={<Ionicons name="copy" />} />
                                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between">
                                            <Text fontWeight="medium" fontSize="sm">Copy address</Text>
                                            <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                                <HStack alignItems="center" space={2}>
                                    <Icon color={COLOR.black} size="sm" as={<Ionicons name="ios-location-sharp" />} />
                                    <Box py={2} borderStyle="solid" borderBottomWidth={1} borderColor={COLOR.inpBorderColor} flex={1}>
                                        <HStack alignItems="center" justifyContent="space-between">
                                            <Text fontWeight="medium" fontSize="sm">Get directions</Text>
                                            <Icon color={COLOR.black} size="sm" as={<AntDesign name="right" />} />
                                        </HStack>
                                    </Box>
                                </HStack>
                            </VStack>

                            <Box mt={5}>
                                <Text fontWeight="bold" fontSize="xs">Where you're staying</Text>
                                <VStack mt={2} space={1}>
                                    <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">House Rules</Text>
                                    <Text color={COLOR.black} fontWeight="semibold" fontSize="xs">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum aliquet tincidunt. Morbi sed molestie orci. Ut eu augue velit. Proin vulputate nunc odio.
                                    </Text>
                                </VStack>
                            </Box>

                        </VStack>
                    </Box>
                </Box>

                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef} _backdrop={true} backdropOpacity={0.5} backgroundColor={COLOR.ModalBgcolor} >
                    <Modal.Content style={{
                        marginTop: "auto",
                        width: "100%",
                        heigh: "100%",
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    }}>
                        <Modal.Body>
                            <HStack justifyContent="space-between" pb={1} height={390}>
                                <ScrollView >
                                    <DatepickerRange
                                        buttonText="Save date"
                                        closeButtonText=""
                                        chosenDateTextColor='red'
                                        showDaysHeader={false}
                                        placeHolderStart=''
                                        placeHolderUntil=''
                                        buttonColor={COLOR.IBase
                                        }
                                        onSelect={onSelectCheckDate}
                                        showButton={false}
                                        selectedBackgroundColor={COLOR.IBase}
                                        infoContainerStyle={{ marginRight: 2, paddingHorizontal: 2, paddingVertical: 5, backgroundColor: 'green', borderRadius: 2, alignSelf: 'flex-end' }}
                                    // onConfirm={(startDate, untilDate) => this.setState({ startDate, untilDate })}
                                    />
                                </ScrollView>
                            </HStack>
                            <Box >
                                <TouchableOpacity onPress={onCheckInOutCancel}>
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
                                        mt={5}
                                        py={2}
                                    >
                                        <Text
                                            color={COLOR.white}
                                            fontWeight="bold"
                                            fontSize="md"
                                        >
                                            Save date
                                        </Text>
                                    </Box>
                                </TouchableOpacity>
                            </Box>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </ScrollView>
        </Box >
    )
}

export default RequestBookPage;