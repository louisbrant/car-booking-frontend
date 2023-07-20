import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useToast } from "native-base";
import { MaterialCommunityIcons, AntDesign, EvilIcons, Entypo, Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT, ROOT } from "../../../constants";

import { useSelector } from 'react-redux'
import { useApi } from '../../../redux/services'


const { width } = Dimensions.get('window')


const AddCardPage = ({ navigation }) => {

    const Toast = useToast()
    const { user } = useSelector((store) => store.auth)
    const Api = useApi()

    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [expiry, setExpriy] = useState('')
    const [cvv, setCvv] = useState('')


    const onAddCard = () => {
        const carddata = {
            email: user?.email,
            name: name,
            number: number,
            expiry: expiry,
            cvv: cvv
        };
        Api.AddCard({ carddata }).then(({ data }) => {
            console.log("Data", data)
            if (data.status) {
                Toast.show({ title: "Successfully Sign In!", placement: 'bottom', status: 'success', w: 300 })
                navigation.navigate("CarHomeScreen");
            }
            else {
                return Toast.show({ title: data.message, placement: 'bottom', status: 'error', w: 300 })
            }
        }).catch(error => {
            if (error.response && error.response.status === 400) {
                return Toast.show({ title: error.response.data, placement: 'bottom', status: 'error', w: 300 })
            } else {
                return Toast.show({ title: "Error", placement: 'bottom', status: 'error', w: 300 })

            }
        })
    }

    return (
        <Box
            flex={1}
            bg={COLOR.white}
        // bg={{
        //     linearGradient: {
        //         colors: ['rgba(255, 255, 255, 0.2)', 'rgba(243, 243, 243, 0.2)'],
        //         start: [0, 0],
        //         end: [0, 1]
        //     }
        // }}
        >
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
                        >Add New Card</Text>
                    </View>
                </Stack>
            </Box>

            <Box w="full" px={5} py={3} pb={10}>

                <VStack space={2}>
                    <VStack w="full" space={1}>
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            Name
                        </Text>
                        <Input
                            w="full"
                            h="35"
                            InputLeftElement={
                                <Icon
                                    as={<FontAwesome5 name="user" />}
                                    size="xs"
                                    ml="2"
                                    color={COLOR.inIconColor}
                                />
                            }
                            bg={COLOR.white}
                            pl={1.5}
                            value={name}
                            onChangeText={setName}
                            borderStyle="solid"
                            borderWidth={1}
                            borderColor={COLOR.inpBorderColor}
                            borderRadius={5}

                            fontSize="xs"
                            color={COLOR.black}
                            placeholder="John Smith"
                        />
                    </VStack>
                    <VStack w="full" space={1}>
                        <Text
                            color={COLOR.inPlaceholder}
                            fontWeight="medium"
                            fontSize="xs"
                        >
                            Card Number
                        </Text>
                        <Input
                            w="full"
                            h="35"
                            InputLeftElement={
                                <Icon
                                    as={<Ionicons name="card-outline" />}
                                    size="xs"
                                    ml="2"
                                    color={COLOR.inIconColor}
                                />
                            }
                            bg={COLOR.white}
                            pl={1.5}

                            value={number}
                            onChangeText={setNumber}
                            borderStyle="solid"
                            borderWidth={1}
                            borderColor={COLOR.inpBorderColor}
                            borderRadius={5}

                            fontSize="xs"
                            color={COLOR.black}
                            placeholder="1234 1234 1234 1234"
                        />
                    </VStack>
                    <HStack justifyContent="space-between">
                        <VStack w="48%" space={1}>
                            <Text
                                color={COLOR.inPlaceholder}
                                fontWeight="medium"
                                fontSize="xs"
                            >
                                Expiry
                            </Text>
                            <Input
                                w="full"
                                h="35"
                                InputLeftElement={
                                    <Icon
                                        as={<AntDesign name="calendar" />}
                                        size="xs"
                                        ml="2"
                                        color={COLOR.inIconColor}
                                    />
                                }
                                bg={COLOR.white}
                                pl={1.5}

                                value={expiry}
                                onChangeText={setExpriy}
                                borderStyle="solid"
                                borderWidth={1}
                                borderColor={COLOR.inpBorderColor}
                                borderRadius={5}

                                fontSize="xs"
                                color={COLOR.black}
                                placeholder="MM/YYYY"
                            />
                        </VStack>
                        <VStack w="48%" space={1}>
                            <Text
                                color={COLOR.inPlaceholder}
                                fontWeight="medium"
                                fontSize="xs"
                            >
                                CVV
                            </Text>
                            <Input
                                w="full"
                                h="35"
                                InputLeftElement={
                                    <Icon
                                        as={<Ionicons name="shield-checkmark-outline" />}
                                        size="xs"
                                        ml="2"
                                        color={COLOR.inIconColor}
                                    />
                                }
                                bg={COLOR.white}
                                pl={1.5}

                                value={cvv}
                                onChangeText={setCvv}
                                borderStyle="solid"
                                borderWidth={1}
                                borderColor={COLOR.inpBorderColor}
                                borderRadius={5}

                                fontSize="xs"
                                color={COLOR.black}
                                placeholder="123"
                            />
                        </VStack>
                    </HStack>
                </VStack>

            </Box>

            <Box position="absolute" bottom={35} w="full" px={5}>

                <TouchableOpacity onPress={onAddCard}>
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

export default AddCardPage;