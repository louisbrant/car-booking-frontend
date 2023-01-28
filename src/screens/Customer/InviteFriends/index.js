import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, Text, Image, Input, Center } from 'native-base'
import { Footers, Headers } from '../../../components'
import { COLOR, Images, LAYOUT } from '../../../constants'
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'

const InviteFriendsScreen = ({ navigation }) => {
    const { user } = useSelector(store => store.auth);
    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            <Headers
                title={'Invite Friends'}
                left={
                    <TouchableOpacity onPress={navigation.openDrawer}>
                        <Icon borderRadius={8} bg={COLOR.base} size='md' color={COLOR.white} >{LAYOUT.drawerIcon}</Icon>
                    </TouchableOpacity>
                }
            />
            <Box px={7} mt={5} flex={1}>
                <Stack flex={1}>
                    <Box alignItems="center">
                        <Image source={Images.Invite} w="100%" resizeMode="contain" />
                        <Text p={8} fontSize="sm" textAlign="center" color={COLOR.black}>Refer a friend and both of you receive 5% off</Text>
                    </Box>
                    <Stack alignItems="center">
                        <Text fontSize="sm" my={3} textAlign="center" color="dark.200">Your Referral code is</Text>
                        <Input
                            value={(user.email).split("@")[0]}
                            isReadOnly
                            p={0}
                            borderRadius={10}
                            size='sm'
                            variant='solid'
                            autoCapitalize='none'
                            textAlign="center"
                            borderColor={COLOR.base}
                            borderWidth={1}
                            color={COLOR.base}
                            w={200}
                            h={38}
                            _focus={{
                                borderColor: COLOR.base,
                            }}
                            InputRightElement={
                                <TouchableOpacity>
                                    <Center borderRadius={10} h={38} w={38} bg={COLOR.base}>
                                        <Icon textAlign="center" as={<Ionicons name="arrow-redo-outline" />} size='sm' color={COLOR.white} />
                                    </Center>
                                </TouchableOpacity>
                            }
                        />
                    </Stack>
                </Stack>
            </Box>
            <Footers routeName={`InviteFriendsScreen`} />
        </Box>
    )
}

export default InviteFriendsScreen