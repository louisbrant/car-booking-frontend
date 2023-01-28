import React, { Fragment, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, Input, TextArea, Checkbox, useToast, Spinner, Select, CheckIcon } from 'native-base'
import { Entypo, AntDesign, Feather } from '@expo/vector-icons'
import { Headers } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'
import * as ImagePicker from "expo-image-picker";
import { setUserInfo } from '../../../redux/actions/authActions'
import { useDispatch } from 'react-redux'

const EditAccountScreen = ({ navigation }) => {
    const Api = useApi()
    const Toast = useToast();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((store) => store.auth);
    const [email, setemail] = useState(user.email)
    const [username, setUserName] = useState(user.username)
    const [zipcode, setZipcode] = useState(user.zipcode)
    const [phone, setphone] = useState(user.phone)
    const [pets, setpets] = useState("dog")
    const [photo, setPhoto] = useState(user.avatar ? { photo: { uri: `${ROOT.IMAGE_URL}users/` + user.avatar } } : { photo: Images.Profile });

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

    const Save = () => {
        if (username) {
            setLoading(true);
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            if (typeof (photo.photo) === 'object') {
                const photos = getImages(photo)
                for (let i = 0; i < photos.length; i++) {
                    formData.append("photo", photos[i]);
                }
            }
            formData.append("data", JSON.stringify({ email, username, zipcode, phone, pets }));
            xhr.open("POST", `${ROOT.BACKEND_URL}users/updateUser`);
            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    let userdata = JSON.parse(xhr.response);
                    dispatch(setUserInfo(userdata))
                    Toast.show({ title: "Saved successfully!", placement: 'bottom', status: 'success' , w: 400 })
                    setLoading(false)
                    return navigation.navigate("AccountScreen", 123);
                }
            }

            xhr.send(formData);
        } else {
            return Toast.show({ title: "Username is incorrect.", placement: 'bottom', status: 'error' , w: 400 })
        }
    }

    useEffect(() => {
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {/* {loading && <Loading />} */}
            <Headers
                title={'Edit Account'}
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
                        <Input h={45} my={1} value={username} onChangeText={setUserName} size="sm" borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.200", }} placeholder="Name"
                            _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                        />
                        <Input h={45} my={1} size="sm" onChangeText={setphone} value={phone} borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.200", }} placeholder="Phone number"
                            _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                        />
                        <Select
                            selectedValue={zipcode}
                            color={COLOR.black}
                            bg={COLOR.white}

                            borderWidth={2}
                            fontSize="sm"
                            h={50}
                            my={1}
                            borderRadius={15}
                            placeholder="Select Zipcode"
                            onValueChange={setZipcode}
                            _selectedItem={{
                                endIcon: <CheckIcon size={4} />,
                            }}
                        >
                            {
                                LAYOUT.ZipCode.map((item, ids) => {
                                    return <Select.Item key={ids} label={item} value={item} />
                                })
                            }
                        </Select>
                        {
                            user.roles === "customer" ?
                                <Fragment>
                                    <Text fontSize="sm" my={3} color={COLOR.black}>Pets :</Text>
                                    <HStack>
                                        <Checkbox
                                            isChecked={pets === "dog" ? true : false}
                                            value={COLOR.base}
                                            colorScheme="orange"
                                            aria-label="check"
                                            size="md"
                                            onChange={() => setpets("dog")}
                                            icon={<Icon as={<AntDesign name="checksquareo" />} />}

                                        >
                                            <Text ml={3} fontSize="xs" color={COLOR.black}>
                                                Dogs
                                            </Text>
                                        </Checkbox>
                                        <Checkbox
                                            isChecked={pets === "cat" ? true : false}
                                            ml={5}
                                            value={COLOR.base}
                                            colorScheme="orange"
                                            aria-label="check"
                                            onChange={() => setpets("cat")}
                                            size="md"
                                            icon={<Icon as={<AntDesign name="checksquareo" />} />}
                                        >
                                            <Text ml={3} fontSize="xs" color={COLOR.black}>
                                                Cats
                                            </Text>
                                        </Checkbox>
                                    </HStack>
                                </Fragment>
                                : null
                        }

                    </Stack>
                </ScrollView>
            </Box>
            <Button
                mb={10}
                h={45}
                bg={COLOR.base}
                variant="ghost"
                onPress={Save}
                colorScheme="orange"
                borderRadius={15}
                disabled={loading}
                mx={7}
            >
                {loading ?
                    <Spinner size='sm' /> :
                    <Text color={COLOR.white} fontSize="md" pt={1}>Save</Text>
                }
            </Button>
        </Box>
    )
}

export default EditAccountScreen