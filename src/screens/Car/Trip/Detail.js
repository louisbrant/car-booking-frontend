import React, { useCallback, useState } from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StatusBar, Pressable, Animated } from "react-native";
import { Image, Text, Box, Stack, HStack, Button, View, Icon, Avatar, VStack, Input, AspectRatio, Center, Actionsheet, useColorModeValue, TextArea } from "native-base";
import { Ionicons, FontAwesome5, Foundation } from "@expo/vector-icons"

import { COLOR, Images, LAYOUT } from "../../../constants";

const InBoxDetailPage = ({ navigation }) => {

    return (
        <Box flex={1}>
            <Box
                px={5}
                pb={3}
                pt={10}
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

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} pl={8}>
                        <HStack space={2}>
                            <Avatar bg="white" alignSelf="center" size={"36"} source={Images.Profile1} />
                            <VStack space={1}>
                                <Text fontWeight="semibold" fontSize="xs">Name here</Text>
                                <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Response Time: 1 hour</Text>
                            </VStack>
                        </HStack>
                    </View>
                </Stack>
            </Box>

            <Box w="full" px={5} pt={3} pb={10}>
                <HStack space={2} alignItems="center">
                    <Box style={{ height: 36, width: 44 }}>
                        <Image source={Images.CarBySearch} style={{ width: '100%', height: '100%' }} rounded={6} alt="car" />
                    </Box>
                    <VStack space={1}>
                        <Text fontWeight="medium" fontSize="xs">Name here</Text>
                        <Text color={COLOR.inPlaceholder} fontWeight="medium" fontSize="2xs">Trip Completed: Mar 23 -30</Text>
                    </VStack>
                </HStack>

                <HStack
                    mt={2}
                    pb={3}
                    alignItems="center"
                    justifyContent="space-between"
                    style={{
                        borderStyle: 'solid',
                        borderBottomWidth: 1,
                        borderColor: COLOR.inpBorderColor,
                    }}
                >
                    <Box
                        style={{
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderColor: COLOR.inpBorderColor,
                            borderRadius: 5,

                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        h={28}
                        px={3}
                    >
                        <HStack space={2} alignItems="center">
                            <FontAwesome5 name="shopping-bag" size={12} color="black" />
                            <Text fontWeight="medium" fontSize="2xs">Reservation</Text>
                        </HStack>
                    </Box>
                    <Box
                        style={{
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderColor: COLOR.inpBorderColor,
                            borderRadius: 5,

                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        h={28}
                        px={3}
                    >
                        <HStack space={2} alignItems="center">
                            <Ionicons name="md-share-outline" size={12} color="black" />
                            <Text fontWeight="medium" fontSize="2xs">Share listing</Text>
                        </HStack>
                    </Box>
                    <Box
                        style={{
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderColor: COLOR.inpBorderColor,
                            borderRadius: 5,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        h={28}
                        px={3}
                    >
                        <HStack space={2} alignItems="center">
                            <Foundation name="home" size={12} color="black" />
                            <Text fontWeight="medium" fontSize="2xs">Book again</Text>
                        </HStack>
                    </Box>
                </HStack>

                <Box py={5} h={380}>
                    <ScrollView contentContainerStyle={{ justifyContent: "space-around" }} showsVerticalScrollIndicator={false}>
                        <VStack space={5}>
                            {/* <TextArea
                        aria-label="t1Disabled"
                        placeholder="Disabled TextArea"
                        isDisabled
                        w="full"
                        style={{
                            borderWidth: 0,
                            borderColor: 'transparent',
                        }}
                        variant="unstyled"
                        value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum aliquet tincidunt. Morbi sed molestie orci. Ut eu augue velit. Proin vulputate nunc odio, a eleifend eros tempor vitae. Cras elementum metus risus, ac laoreet turpis pulvinar quis. Vestibulum ut sem convallis, accumsan enim eu, commodo arcu. Praesent sagittis ut est a laoreet. Proin nisi lorem, vulputate quis dolor non, sodales egestas purus. Sed in dolor arcu.Integer elementum neque magna, sed tincidunt felis fermentum ut. Nunc tincidunt feugiat metus, vel porta ex. Vivamus sit amet urna a felis gravida pulvinar vitae at purus. Nunc convallis quam lectus, eget pellentesque urna pulvinar eget. Phasellus congue diam vel massa ornare euismod. Sed pretium lacus at accumsan pulvinar. Sed et rhoncus ligula. Ut dignissim turpis vitae placerat lobortis. Maecenas sit amet sagittis elit. Curabitur et tellus pulvinar, tristique libero a, ultricies magna. Duis a aliquam tellus. Donec ipsum justo, ultricies quis ligula a, pellentesque congue ante. Pellentesque bibendum hendrerit luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum iaculis, purus in cursus laoreet, ligula turpis elementum erat, non pellentesque magna tortor sit amet erat."}
                    /> */}
                            <Text color={COLOR.black} fontWeight="medium" fontSize="2xs">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum aliquet tincidunt. Morbi sed molestie orci. Ut eu augue velit. Proin vulputate nunc odio, a eleifend eros tempor vitae. Cras elementum metus risus, ac laoreet turpis pulvinar quis. Vestibulum ut sem convallis, accumsan enim eu, commodo arcu. Praesent sagittis ut est a laoreet. Proin nisi lorem, vulputate quis dolor non, sodales egestas purus. Sed in dolor arcu.
                            </Text>
                            <Text color={COLOR.black} fontWeight="medium" fontSize="2xs">
                                Integer elementum neque magna, sed tincidunt felis fermentum ut. Nunc tincidunt feugiat metus, vel porta ex. Vivamus sit amet urna a felis gravida pulvinar vitae at purus. Nunc convallis quam lectus, eget pellentesque urna pulvinar eget. Phasellus congue diam vel massa ornare euismod. Sed pretium lacus at accumsan pulvinar. Sed et rhoncus ligula. Ut dignissim turpis vitae placerat lobortis. Maecenas sit amet sagittis elit. Curabitur et tellus pulvinar, tristique libero a, ultricies magna. Duis a aliquam tellus. Donec ipsum justo, ultricies quis ligula a, pellentesque congue ante. Pellentesque bibendum hendrerit luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum iaculis, purus in cursus laoreet, ligula turpis elementum erat, non pellentesque magna tortor sit amet erat.
                            </Text>
                        </VStack>
                    </ScrollView>
                </Box>

                <Box mt={3}>
                    <Input
                        w="full"
                        h="35"
                        InputLeftElement={
                            <Icon size="md" ml={2} color={COLOR.inIconColor}>
                                {LAYOUT.imageIcon}
                            </Icon>
                        }
                        bg={COLOR.white}
                        pl={1.5}

                        borderStyle="solid"
                        borderWidth={1}
                        borderColor={COLOR.inpBorderColor}
                        borderRadius={5}

                        fontSize="xs"
                        color={COLOR.black}
                        placeholder="Write a message"
                    />
                </Box>
            </Box>

        </Box>
    )
}

export default InBoxDetailPage;