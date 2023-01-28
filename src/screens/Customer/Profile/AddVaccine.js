import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, useToast, Spinner } from 'native-base'
import { Entypo, Fontisto, AntDesign } from '@expo/vector-icons'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { useApi } from '../../../redux/services'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker';

const SettingScreen = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast()
    const params = navigation.state.params;
    const [loading, setLoading] = useState(false)
    const [Vdata, setVdata] = useState(navigation.state.params.VaccineData)
    const [name, setname] = useState(Vdata ? Vdata.name : null)
    const [date, setdate] = useState(Vdata ? Vdata.date : null)
    const [OpenPicker, setOpenPicker] = useState(false)
    const onChange = (event, selectedDate) => {
        setOpenPicker(false)
        let currentDate = selectedDate || date;
        currentDate = moment(currentDate).format("DD/MM/YYYY");
        setdate(currentDate);
    };

    const Save = () => {
        if (name && date) {
            setLoading(true);
            Api.AddDogVaccine(Vdata ? { _id: Vdata._id, dogId: params._id, name, date, type: "dog" } : { dogId: params._id, name, date, type: "dog" }).then(({ data }) => {
                if (data) {
                    Toast.show({ title: "Successed!", placement: 'bottom', status: 'success', w: 400  })
                    navigation.navigate("DogVaccineScreen", params)
                    return setLoading(false);
                }
            })
        } else {
            return Toast.show({ title: "Something was wrong!", placement: 'bottom', status: 'error', w: 400  })
        }
    }

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {/* {loading && <Loading />} */}
            <Headers
                title={Vdata ? 'Edit Vaccine' : 'Add Vaccine'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={2} flex={1}>
                <Stack flex={1}>
                    <Text fontSize="sm" my={2} color={COLOR.black}>{"Add vaccine name and dose date"}</Text>
                    <Input h={45} value={name} onChangeText={setname} my={2} size="sm" borderRadius={10} bg={COLOR.white} _focus={{ borderColor: "gray.200" }} placeholder="Vaccine name"
                        _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                    />
                    <Input h={45} value={date} isReadOnly my={2} size="sm" borderRadius={10} bg={COLOR.white} _focus={{ borderColor: "gray.200" }} placeholder="Select date"
                        _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                        InputRightElement={
                            <TouchableOpacity onPress={() => setOpenPicker(true)}>
                                <Icon
                                    as={<Fontisto name="date" />}
                                    size="xs"
                                    m={3}

                                    _light={{
                                        color: "gray.500",
                                    }}
                                    _dark={{
                                        color: "gray.300",
                                    }}
                                />
                            </TouchableOpacity>
                        }
                    />
                    <TouchableOpacity>
                        <HStack alignItems="center" justifyContent="flex-end" space={1} mt={4}>
                            <Icon size="xs" color={COLOR.base} as={<AntDesign name="upload" />} />
                            <Text fontSize="xs" color={COLOR.base}>Upload photo</Text>
                        </HStack>
                    </TouchableOpacity>
                    <Button
                        variant="ghost"
                        mt={16}
                        bg={COLOR.base}
                        onPress={Save}
                        h={45}
                        colorScheme="orange"
                        borderRadius={15}
                        disabled={loading}
                    >
                        {
                            loading ?
                                <Spinner size="sm" /> :
                                <Text fontSize="md" pt={1} color={COLOR.white}>Save</Text>
                        }
                    </Button>
                </Stack>
            </Box>
            {
                OpenPicker ?
                    <DateTimePicker
                        value={new Date}
                        onChange={onChange}
                    /> : null
            }
        </Box >
    )
}

export default SettingScreen