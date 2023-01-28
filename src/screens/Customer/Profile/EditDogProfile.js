import React, { Fragment, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, View, Input, Center, TextArea, Checkbox, Select, CheckIcon, useToast, Spinner } from 'native-base'
import { Entypo, Feather } from '@expo/vector-icons'
import { SliderBox } from 'react-native-image-slider-box'
import normalize from 'react-native-normalize'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { useApi } from '../../../redux/services'
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import * as ImagePicker from "expo-image-picker";
import { useSelector } from 'react-redux'

const EditDogProfileScreen = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast();
    const [DogProfile, setDogProfile] = useState(navigation.state.params)
    const { user } = useSelector((store) => store.auth);
    const [loading, setLoading] = useState(false)
    const [AppointData, setAppointData] = useState(false)
    const [avatar, setavatar] = useState(DogProfile ? DogProfile.avatar ? { photo: { uri: `${ROOT.IMAGE_URL}profile/` + DogProfile.avatar } } : { photo: Images.Dog } : { photo: Images.Dog });
    const [name, setname] = useState(DogProfile ? DogProfile.name : null)
    const [gender, setgender] = useState(DogProfile ? DogProfile.gender : null)
    const [age, setage] = useState(DogProfile ? DogProfile.age : null)
    const [breed, setbreed] = useState(DogProfile ? DogProfile.breed : null)
    const [sizeWeight, setsizeWeight] = useState(DogProfile ? DogProfile.sizeWeight : null)
    const [temperament, settemperament] = useState(DogProfile ? DogProfile.temperament : null)
    const [lastgroom, setlastgroom] = useState(DogProfile ? DogProfile.lastgroom : null)
    const [coattype, setcoattype] = useState(DogProfile ? DogProfile.coattype : null)
    const [vetname, setvetname] = useState(DogProfile ? DogProfile.vetname : null)
    const [vetphone, setvetphone] = useState(DogProfile ? DogProfile.vetphone : null)
    const [note, setnote] = useState(DogProfile ? DogProfile.note : null)

    const LoadAppointData = () => {
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            return setavatar({
                photo: result,
            });
        }
    };

    const Save = () => {
        if (avatar && name && gender && age && breed && sizeWeight && temperament && lastgroom && coattype) {
            setLoading(true)
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            if (typeof (avatar.photo) === 'object') {
                const photos = getImages(avatar)
                for (let i = 0; i < photos.length; i++) {
                    formData.append("photo", photos[i]);
                }
            }
            if (DogProfile) {
                formData.append("_id", DogProfile._id);
            }
            formData.append("data", JSON.stringify({ owner: user.email, name, gender, age, breed, sizeWeight, temperament, lastgroom, coattype, vetname, vetphone, note }));
            xhr.open("POST", `${ROOT.BACKEND_URL}users/createDogProfile`);
            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.onload = function () {
                setLoading(false)
                Toast.show({ title: "Saved successfully!", placement: 'bottom', status: 'success', w: 400  })
                return navigation.navigate("DogProfileScreen", 123);
            }

            xhr.send(formData);
        } else {
            return Toast.show({ title: "Something was wrong!", placement: 'bottom', status: 'error', w: 400  })
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

    useEffect(() => {
        LoadAppointData()
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {/* {loading && <Loading />} */}
            <Headers
                title={'Edit Dog Profile'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={3} flex={1}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Stack alignItems="center" space={2}>
                        <Image source={avatar.photo} size="xl" borderRadius={100} />
                        <Box p={2} position="absolute" bottom={-7} bg="white" borderRadius={100} shadow={7}>
                            <TouchableOpacity onPress={pickImage}>
                                <Icon size={5} color={COLOR.base} as={<Feather name="camera" />} />
                            </TouchableOpacity>
                        </Box>
                    </Stack>
                    <Stack py={7} flex={1}>
                        <HStack justifyContent="space-between">
                            <Input h={42} value={name} my={1} size="sm" w="60%" onChangeText={setname} borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.300", }} borderColor="gray.300" placeholder="Dog's name"
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
                        <HStack justifyContent="space-between">
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
                            <Input h={42} value={breed} my={1} size="sm" w="49%" onChangeText={setbreed} borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.300", }} borderColor="gray.300" placeholder="Breed"
                                _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                            />

                            {/* <Select
                                selectedValue={breed}
                                w="49%"
                                color={COLOR.black}
                                bg={COLOR.white}
                                borderColor="gray.300"
                                fontSize="sm"
                                h={45}
                                my={1}
                                borderRadius={15}
                                accessibilityLabel="Select your favorite programming language"
                                placeholder="Breed"
                                placeholderTextColor="#cccccc"
                                onValueChange={setbreed}
                                _selectedItem={{
                                    bg: "cyan.600",
                                    endIcon: <CheckIcon size={4} />,
                                }}
                            >
                                {
                                    LAYOUT.DogBreed.map((item, ids) => {
                                        return <Select.Item key={ids} label={item} value={item} />
                                    })
                                }

                            </Select> */}
                        </HStack>
                        <HStack justifyContent="space-between">
                            <Select
                                selectedValue={sizeWeight}
                                w="49%"
                                color={COLOR.black}
                                bg={COLOR.white}
                                borderColor="gray.300"
                                fontSize="sm"
                                h={45}
                                my={1}
                                borderRadius={15}
                                accessibilityLabel="Select your favorite programming language"
                                placeholder="Size & weight"
                                placeholderTextColor="#cccccc"
                                onValueChange={setsizeWeight}
                                _selectedItem={{
                                    bg: "cyan.600",
                                    endIcon: <CheckIcon size={4} />,
                                }}
                            >
                                {
                                    LAYOUT.DogSizeWeight.map((item, ids) => {
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
                                    LAYOUT.DogTemperament.map((item, ids) => {
                                        return <Select.Item key={ids} label={item} value={item} />
                                    })
                                }
                            </Select>
                        </HStack>
                        <HStack justifyContent="space-between" mt={1}>
                            <Select
                                selectedValue={lastgroom}
                                w="49%"
                                color={COLOR.black}
                                bg={COLOR.white}
                                borderColor="gray.300"
                                fontSize="sm"
                                h={45}
                                my={1}
                                borderRadius={15}
                                placeholder="Last groom"
                                placeholderTextColor="#cccccc"
                                onValueChange={setlastgroom}
                                _selectedItem={{
                                    bg: "cyan.600",
                                    endIcon: <CheckIcon size={4} />,
                                }}
                            >
                                {
                                    LAYOUT.DogLastGroom.map((item, ids) => {
                                        return <Select.Item key={ids} label={item} value={item} />
                                    })
                                }
                            </Select>
                            <Select
                                selectedValue={coattype}
                                w="49%"
                                color={COLOR.black}
                                bg={COLOR.white}
                                borderColor="gray.300"
                                fontSize="sm"
                                h={45}
                                my={1}
                                borderRadius={15}
                                accessibilityLabel="Select your favorite programming language"
                                placeholder="Coat type"
                                placeholderTextColor="#cccccc"
                                onValueChange={setcoattype}
                                _selectedItem={{
                                    bg: "cyan.600",
                                    endIcon: <CheckIcon size={4} />,
                                }}
                            >
                                {
                                    LAYOUT.DogCoatType.map((item, ids) => {
                                        return <Select.Item key={ids} label={item} value={item} />
                                    })
                                }
                            </Select>
                        </HStack>
                        <HStack justifyContent="space-between">
                            <Input h={42} value={vetname} my={1} onChangeText={setvetname} size="sm" w="49%" borderRadius={15} borderColor="gray.300" bg={COLOR.white} _focus={{ borderColor: "gray.200", }} placeholder="Vet's name"
                                _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                            />
                            <Input h={42} value={vetphone} my={1} onChangeText={setvetphone} size="sm" w="49%" borderRadius={15} borderColor="gray.300" bg={COLOR.white} _focus={{ borderColor: "gray.200", }} placeholder="Vet's phone"
                                _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                            />
                        </HStack>
                        <TextArea bg={COLOR.white} value={note} onChangeText={setnote} placeholderTextColor="#cccccc" borderRadius={15} _focus={{ borderColor: "gray.300", }} size="sm" textAlignVertical='top' h="125px" placeholder="Add note for groomers" my={2} />
                    </Stack>
                    <Button
                        mb={5}
                        h={45}
                        bg={COLOR.base}
                        variant="ghost"
                        onPress={Save}
                        colorScheme="orange"
                        borderRadius={15}
                        disabled={loading}
                    >
                        {loading ?
                            <Spinner size='sm' /> :
                            <Text color={COLOR.white} fontSize="md" pt={1}>Save</Text>
                        }
                    </Button>
                </ScrollView>
            </Box>
        </Box>
    )
}

export default EditDogProfileScreen