import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, Modal, useToast } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons"
import { useSelector } from 'react-redux'
import { useApi } from '../../../redux/services'


// import * as ImagePicker from 'expo-image-picker';
// import { showImagePicker } from 'react-native-image-picker';


import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";


const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: false,
        path: 'images',
    },
};


const AddCarPage = ({ navigation }) => {

    const Toast = useToast()
    const { user } = useSelector((store) => store.auth)
    const Api = useApi()

    const [imageInfor, setImageInfor] = useState({
        img: Images.UploadCar,
        selected: false
    });

    const getImages = (para) => {
        const array = [];
        const uri = para.uri;
        const name = uri.split("/").pop();
        const match = /\.(\w+)$/.exec(name);
        const type = match ? `image/${match[1]}` : `image`;
        array.push({
            uri, name, type
        });
        return array;
    }

    const onStartUpload = (body = { email: "izra" }) => {
        if (imageInfor.selected) {

            ROOT.Socket.emit("fileupload", imageInfor.img)


            var formData = new FormData();

            formData.append('photo', imageInfor.img);
            console.log(formData);

            formData.append("data", JSON.stringify({ email: "izra" }));


            Api.AddCarImage({ formData }).then(({ data }) => {
                console.log(data);

                // if (data.status) {
                //     setReload(!reload);
                //     return Toast.show({ title: "Delete Car!", placement: 'bottom', status: 'error', w: 300 });
                // }
                // else {
                //     return Toast.show({ title: data.message, placement: 'bottom', status: 'error', w: 300 });
                // }
            }).catch(error => {
                console.log("error=>", error)
                // if (error.response && error.response.status === 400) {
                //     return Toast.show({ title: error.response.data, placement: 'bottom', status: 'error', wx: 300 })
                // } else {
                //     return Toast.show({ title: "Error!", placement: 'bottom', status: 'error', w: 300 })
                // }
            })



            // Object.keys(body).forEach((key) => {
            //     formData.append(key, body[key]);
            // });

            // const xhr = new XMLHttpRequest();
            // var formData = new FormData();
            // if (typeof (imageInfor.img) === 'object') {
            //     const photos = getImages(imageInfor.img)
            //     for (let i = 0; i < photos.length; i++) {
            //         console.log(i, photos[i]);
            //         formData.append("photo", photos[i]);
            //     }
            // }
            // console.log("formData=>", formData)

            // xhr.open("POST", `${ROOT.BACKEND_URL}cars/addCarImage`);
            // console.log("xhr=>", xhr)
            // xhr.setRequestHeader("Content-Type", "multipart/form-data");
            // xhr.onload = function () {
            //     Toast.show({ title: 'User tapped custom button: ' + xhr + "&&&&&" + xhr.status, placement: 'bottom', status: 'error', w: 300 })
            //     if (xhr.status === 200) {
            //         return navigation.navigate("ConfigurationScreen");
            //     }
            // }
            // xhr.onload()
            // Toast.show({ title: 'User tapped custom buttons====: ' + formData, placement: 'bottom', status: 'error', w: 300 })

            // xhr.send(formData);
        }
        else {
            return Toast.show({ title: "Select Car Image!", placement: 'bottom', status: 'error', w: 300 })
        }
    }
    const onUpload = async () => {

        // ImagePicker.launchImageLibrary();
        // console.log("ImagePicker.launchImageLibrary", result)
        // launchImageLibrary({ noData: true }, (response) => {
        //     console.log(response)
        //     if (response) {
        //         setImageInfor({
        //             ...imageInfor,
        //             img: response,
        //             selected: true
        //         });
        //     }
        // });

        // console.log("ImagePicker=>", showImagePicker)
        // showImagePicker({ noData: true }, (response) => {
        //     console.log('Response = ', response);

        //     if (response.didCancel) {
        //         console.log('User cancelled image picker');
        //         return Toast.show({ title: "User cancelled image picker!", placement: 'bottom', status: 'error', w: 300 })
        //     } else if (response.error) {
        //         return Toast.show({ title: "Upload error!", placement: 'bottom', status: 'error', w: 300 })
        //     } else if (response.customButton) {
        //         console.log('User tapped custom button: ', response.customButton);
        //         return Toast.show({ title: 'User tapped custom button: ' + response.customButton, placement: 'bottom', status: 'error', w: 300 })
        //     } else {
        //         setImageInfor({
        //             ...imageInfor,
        //             img: response,
        //             selected: true
        //         });
        //     }
        // });


        // try {
        //     let result = await ImagePicker.launchImageLibraryAsync
        //         ({
        //             mediaTypes: ImagePicker.MediaTypeOptions.All,
        //             allowsEditing: false
        //         })
        //     if (!result.cancelled) {
        //         setImageInfor({
        //             ...imageInfor,
        //             img: result,
        //             selected: true
        //         });
        //     }
        //     else {
        //         return Toast.show({ title: "Upload error!", placement: 'bottom', status: 'error', w: 300 })
        //     }
        // }
        // catch (E) {
        //     // console.log(E)
        //     return Toast.show({ title: "Upload error!", placement: 'bottom', status: 'error', w: 300 })
        // }
    }

    return (
        <Box flex={1}>
            <Box
                px={5}
                pb={3}
                pt={5}
                bg={COLOR.white}
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
                <Stack direction="row" alignItems="center">

                    <View style={{ position: 'absolute' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon color={COLOR.black} size="md" as={<Ionicons name="arrow-back" />} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text
                            color={COLOR.black}
                            fontWeight="semibold"
                            fontSize="md"
                        >Add Car</Text>
                    </View>
                </Stack>

            </Box>

            <Box w="full" px={5} py={3} pb={10}>
                <Box
                    p={3}
                    borderStyle="dashed"
                    borderWidth={1}
                    borderColor="#B2B2B2"
                    borderRadius={5}
                >
                    <VStack justifyContent="center" alignItems="center" space={1}>
                        <Image source={imageInfor.img} w={185} height={200} resizeMode="contain" alt="car" />
                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Image or PNG (min. 50kb and max. 5mb)</Text>
                        <TouchableOpacity onPress={onUpload}>
                            <Text fontWeight="semibold" fontSize="xs" underline>Upload</Text>
                        </TouchableOpacity>
                    </VStack>
                </Box>
            </Box>

            <Box position="absolute" bottom={35} w="full" px={5}>
                <TouchableOpacity onPress={onStartUpload}>
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
                            Save & Next
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    )
}

export default AddCarPage;