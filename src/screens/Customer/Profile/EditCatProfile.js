import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, TextArea, Checkbox, Select, CheckIcon, useToast, Spinner } from 'native-base'
import { Entypo, Feather, Ionicons, Fontisto } from '@expo/vector-icons'
import { SliderBox } from 'react-native-image-slider-box'
import normalize from 'react-native-normalize'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { useApi } from '../../../redux/services'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import * as ImagePicker from "expo-image-picker";
import { useSelector } from 'react-redux'


const EditCatProfileScreen = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast()
    const { user } = useSelector((store) => store.auth);
    const [CatProfile, setCatProfile] = useState(navigation.state.params)
    const [loading, setLoading] = useState(false)
    const [AppointData, setAppointData] = useState(false)
    const [Rabies, setRabies] = useState(CatProfile ? CatProfile.rabies : true)
    const [Vaccine, setVaccine] = useState(CatProfile ? CatProfile.vaccines : [])
    const [OpenPicker, setOpenPicker] = useState(false)
    const [SelectedVaccine, setSelectedVaccine] = useState(false);
    const [photo, setPhoto] = useState(CatProfile ? CatProfile.avatar ? { photo: { uri: `${ROOT.IMAGE_URL}profile/` + CatProfile.avatar } } : { photo: Images.Dog } : { photo: Images.Dog });
    const [name, setname] = useState(CatProfile ? CatProfile.name : null)
    const [gender, setgender] = useState(CatProfile ? CatProfile.gender : null)
    const [age, setage] = useState(CatProfile ? CatProfile.age : null)
    const [temperament, settemperament] = useState(CatProfile ? CatProfile.temperament : null)
    const [vetname, setvetname] = useState(CatProfile ? CatProfile.vetname : null)
    const [vetphone, setvetphone] = useState(CatProfile ? CatProfile.vetphone : null)
    const [note, setnote] = useState(CatProfile ? CatProfile.note : null)

    const Save = () => {
        if (name && gender && age && temperament) {
            setLoading(true)
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            if (typeof (photo.photo) === 'object') {
                const photos = getImages(photo)
                for (let i = 0; i < photos.length; i++) {
                    formData.append("photo", photos[i]);
                }
            }
            if (CatProfile) {
                formData.append("_id", CatProfile._id);
            }
            formData.append("data", JSON.stringify({ owner: user.email, name, gender, vaccines: Vaccine, age, temperament, vetname, vetphone, note, rabies: Rabies }));
            xhr.open("POST", `${ROOT.BACKEND_URL}users/createCatProfile`);
            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.onload = function () {
                setLoading(false)
                Toast.show({ title: "Saved successfully!", placement: 'bottom', status: 'success', w: 400  })
                return navigation.navigate("CatProfileScreen", 123);
            }

            xhr.send(formData);
        }
    }

    const getImages = (para) => {
        const array = [];
        for (let i in para) {
            const uri = para[i].uri;
            const name = uri.split("/").pop();
            const match = /\.(\w+)$/.exec(name);
            const type = match ? `image/${match[1]}` : `image`;
            array.push({
                uri, name, type
            });
        }
        return array;
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            return setPhoto({
                photo: result,
            });
        }
    };

    const AddVaccine = () => {
        setVaccine(prev => {
            return [
                ...prev,
                {
                    name: "",
                    date: "",
                }
            ]
        })
    }

    const ChangeVaccines = (val, i, type) => {
        if (type === 0) {
            setVaccine(prev => {
                prev[i].name = val;
                return [...prev];
            })
        } else {
            setVaccine(prev => {
                prev[i].date = val;
                return prev;
            })
        }
    }

    const [date, setDate] = useState(new Date());

    const OpenCalendar = (i) => {
        setOpenPicker(true);
        setSelectedVaccine(i);
    }

    const onChange = (event, selectedDate) => {
        setOpenPicker(false)
        let currentDate = selectedDate || date;
        currentDate = moment(currentDate).format("DD/MM/YYYY");
        ChangeVaccines(currentDate, SelectedVaccine, 1)
        // Vaccine[SelectedVaccine].date = currentDate
        // setVaccine(Vaccine);
        setDate(currentDate);
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


    useEffect(() => {
        LoadAppointData()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {/* {loading && <Loading />} */}
            <Headers
                title={'Edit Cat Profile'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={3} flex={1}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Stack alignItems="center" space={2}>
                        <Image source={photo.photo} size="xl" borderRadius={100} />
                        <Box p={2} position="absolute" bottom={-7} bg="white" borderRadius={100} shadow={7}>
                            <TouchableOpacity onPress={pickImage}>
                                <Icon size={5} color={COLOR.base} as={<Feather name="camera" />} />
                            </TouchableOpacity>
                        </Box>
                    </Stack>
                    <Stack py={7} flex={1}>
                        <HStack justifyContent="space-between">
                            <Input h={42} my={1} value={name} onChangeText={setname} size="sm" w="60%" borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.300", }} placeholder="Cat's name"
                                _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                            />
                            <Select
                                selectedValue={gender}
                                w="38%"
                                color={COLOR.black}
                                bg={COLOR.white}
                                borderColor="gray.300"
                                fontSize="sm"
                                h={45}
                                my={1}
                                borderRadius={15}
                                accessibilityLabel="Select your favorite programming language"
                                placeholder="Gender"
                                placeholderTextColor="#cccccc"
                                onValueChange={setgender}
                                _selectedItem={{
                                    bg: "cyan.600",
                                    endIcon: <CheckIcon size={4} />,
                                }}
                            >
                                <Select.Item label="Male" value="Male" />
                                <Select.Item label="Female" value="Female" />
                            </Select>
                        </HStack>
                        <HStack justifyContent="space-between" borderBottomWidth={1} borderColor="gray.300" pb={3}>
                            <Select
                                selectedValue={age}
                                w="49%"
                                color={COLOR.black}
                                bg={COLOR.white}
                                borderColor="gray.300"
                                fontSize="sm"
                                h={45}
                                my={1}
                                borderRadius={15}
                                accessibilityLabel="Select your favorite programming language"
                                placeholder="Age"
                                placeholderTextColor="#cccccc"
                                onValueChange={setage}
                                _selectedItem={{
                                    bg: "cyan.600",
                                    endIcon: <CheckIcon size={4} />,
                                }}
                            >
                                {
                                    LAYOUT.DogYears.map((item, ids) => {
                                        return <Select.Item key={ids} label={item} value={item} />
                                    })
                                }
                            </Select>
                            <Select
                                selectedValue={temperament}
                                w="49%"
                                color={COLOR.black}
                                bg={COLOR.white}
                                borderColor="gray.300"
                                fontSize="sm"
                                h={45}
                                my={1}
                                borderRadius={15}
                                accessibilityLabel="Select your favorite programming language"
                                placeholder="Temperament"
                                placeholderTextColor="#cccccc"
                                onValueChange={settemperament}
                                _selectedItem={{
                                    bg: "cyan.600",
                                    endIcon: <CheckIcon size={4} />,
                                }}
                            >
                                {
                                    LAYOUT.CatTemperament.map((item, ids) => (
                                        <Select.Item label={item} key={ids} value={item} />
                                    ))
                                }
                            </Select>
                        </HStack>
                        <HStack alignItems="center" justifyContent="space-between" py={2} pr={1}>
                            <Text fontSize="sm" my={3} mr={5} color={COLOR.black}>{"Rabies vaccinated?"}</Text>
                            <CircleCheckBox
                                checked={Rabies}
                                label="Yes"
                                styleLabel={{ fontSize: 13 }}
                                labelPosition={LABEL_POSITION.LEFT}
                                onToggle={(checked) => setRabies(true)}
                                outerSize={24}
                                filterSize={20}
                                innerSize={18}
                            />

                            <CircleCheckBox
                                checked={Rabies ? false : true}
                                styleLabel={{ fontSize: 13 }}
                                label="No"
                                labelPosition={LABEL_POSITION.LEFT}
                                onToggle={(checked) => setRabies(false)}
                                outerSize={24}
                                filterSize={20}
                                innerSize={18}
                            />

                        </HStack>
                        <Stack borderBottomWidth={1} borderColor="gray.300" pb={3}>
                            <Text fontSize="sm" mr={5} color={COLOR.black}>{"Select vaccine name and dose date"}</Text>
                            {
                                Vaccine.map((item, ids) => {
                                    return <HStack key={ids} justifyContent="space-between" >
                                        <Input h={42} my={1} value={item.name} onChangeText={(e) => ChangeVaccines(e, ids, 0)} size="sm" w="49%" borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.300", }} placeholder="Vaccine name"
                                            _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                                        />
                                        <Input h={42} my={1} size="sm" isReadOnly value={item.date} w="49%" borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.300", }} placeholder="Select date"
                                            _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                                            InputRightElement={
                                                <TouchableOpacity onPress={() => OpenCalendar(ids)}>
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
                                            isReadOnly
                                        />
                                    </HStack>
                                })
                            }
                            <TouchableOpacity onPress={AddVaccine}>
                                <HStack alignItems="center" justifyContent="center" my={3} >
                                    <Icon size="sm" color={COLOR.black} as={<Ionicons name="add-circle-outline" />} />
                                    <Text fontSize={10} color={COLOR.black}>   Add more</Text>
                                </HStack>
                            </TouchableOpacity>
                        </Stack>
                        <HStack justifyContent="space-between" mt={3}>
                            <Input h={42} my={1} value={vetname} onChangeText={setvetname} size="sm" w="49%" borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.300", }} placeholder="Vet's name"
                                _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                            />
                            <Input h={42} my={1} value={vetphone} onChangeText={setvetphone} size="sm" w="49%" borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.300", }} placeholder="Vet's phone"
                                _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                            />
                        </HStack>
                        <TextArea bg={COLOR.white} onChangeText={setnote} value={note} placeholderTextColor="#cccccc" _focus={{ borderColor: "gray.300", }} size="sm" textAlignVertical='top' h="125px" placeholder="Add note for groomers" my={2} />
                    </Stack>
                    <Button
                        mb={5}
                        bg={COLOR.base}
                        onPress={Save}
                        variant="ghost"
                        colorScheme="orange"
                        h={45}
                        borderRadius={15}
                        disabled={loading}
                    >
                        {
                            loading ?
                                <Spinner size="sm" /> :
                                <Text fontSize="md" pt={1} color={COLOR.white}>Save</Text>

                        }
                    </Button>
                </ScrollView>
                {
                    OpenPicker ?
                        <DateTimePicker
                            value={new Date}
                            onChange={onChange}
                        /> : null
                }
            </Box>
        </Box>
    )
}

export default EditCatProfileScreen