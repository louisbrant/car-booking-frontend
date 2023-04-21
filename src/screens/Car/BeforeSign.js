import React from "react";
import { COLOR, Images } from "../../constants";
import { Image, Text, Box, Stack, HStack, Button, View } from "native-base";
import Swiper from 'react-native-swiper'

const BeforeSignScreen = ({ navigation }) => {
    return (
        <Box flex={1} px={10}>
            <Stack alignItems="center" justifyContent='center' flex={1} pb={8}>
                <Swiper showsButtons={false} loop={false} dotColor={'white'} activeDotColor={COLOR.base}>
                    <View justifyContent="center" flex={1}>
                        <Image resizeMode="contain" source={Images.Welcome} mb={12} />
                        <Text textAlign="center" color={COLOR.base} fontSize="sm">Welcome</Text>
                        <Text textAlign="center" color={COLOR.black} fontSize={11}>Same-day pet grooming in your own home,</Text>
                        <Text textAlign="center" color={COLOR.black} fontSize={11}>book & pay securely through the app.</Text>
                    </View>
                    <View  flex={1} justifyContent="center">
                        <Image resizeMode="contain" source={Images.Welcome2}  mb={12}/>
                        <Text textAlign="center" color={COLOR.base} fontSize="sm"> Expert Groomers </Text>
                        <Text textAlign="center" color={COLOR.black} fontSize={11}>Our groomers are experienced and certified,</Text>
                        <Text textAlign="center" color={COLOR.black} fontSize={11}>We only use organic products on your pets.</Text>
                    </View>
                </Swiper>

            </Stack>
            <HStack justifyContent="space-between" pb={10} alignItems="center">
                <Button variant="ghost" onPress={() => navigation.navigate("SignInScreen")} borderRadius={15} w="45%" h={45} bg={COLOR.base} colorScheme="orange">
                    <Text color={COLOR.white} fontSize="md" pt={1}>Login</Text>
                </Button>
                <Button onPress={() => navigation.navigate("SignUpScreen")} borderColor={COLOR.black} variant="outline" borderRadius={15} w="45%" h={43} bg={COLOR.white} colorScheme="white">
                    <Text color={COLOR.black} fontSize="md" pt={1}>Sign Up</Text>
                </Button>
            </HStack>
        </Box>
    );
};
export default BeforeSignScreen;