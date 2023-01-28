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
    const groomer = navigation.state.params;
    const [email, setEmail] = useState(groomer ? groomer.email : "")
    const [username, setUserName] = useState(groomer ? groomer.username : "")
    const [zipcode, setZipcode] = useState(groomer ? groomer.zipcode : "")
    const [password, setPassword] = useState(groomer ? groomer.password : "")
    const [phone, setphone] = useState(groomer ? groomer.phone : "")
    const [pets, setpets] = useState("dog")
    const [photo, setPhoto] = useState(groomer ? groomer.avatar ? { photo: { uri: `${ROOT.IMAGE_URL}users/` + groomer.avatar } } : { photo: Images.GroomerAvata } : { photo: Images.GroomerAvata });

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
        if (username && password) {
            setLoading(true);
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            if (typeof (photo.photo) === 'object') {
                const photos = getImages(photo)
                for (let i = 0; i < photos.length; i++) {
                    formData.append("photo", photos[i]);
                }
            }
            let saveData = { email, username, zipcode, password, phone, roles: "groomer", update: groomer ? true : false };
            if (groomer) {
                saveData._id = groomer._id;
            }
            formData.append("data", JSON.stringify(saveData));
            xhr.open("POST", `${ROOT.BACKEND_URL}users/updateGroomer`);
            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    Toast.show({ title: "Saved successfully!", placement: 'bottom', status: 'success' , w: 400  })
                    return navigation.navigate("ManageGroomerScreen", 123);
                }
            }

            xhr.send(formData);
        } else {
            return Toast.show({ title: "Username is incorrect.", placement: 'bottom', status: 'error', w: 400  })
        }
    }

    useEffect(() => {
    }, [navigation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {/* {loading && <Loading />} */}
            <Headers
                title={groomer ? 'Edit Groomer' : 'Add Groomer'}
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
                        <Input h={45} my={1} value={email} onChangeText={setEmail} size="sm" borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.200", }} placeholder="Email"
                            _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                        />
                        <Input h={45} my={1} size="sm" onChangeText={setphone} value={phone} borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.200", }} placeholder="Phone number"
                            _light={{ placeholderTextColor: "#cccccc", }} _dark={{ placeholderTextColor: "#cccccc", }}
                        />
                        <Input h={45} my={1} size="sm" onChangeText={setPassword} value={password} borderRadius={15} bg={COLOR.white} _focus={{ borderColor: "gray.200", }} placeholder="Password"
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
                            _light={{ placeholderTextColor: "#cccccc", }}
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