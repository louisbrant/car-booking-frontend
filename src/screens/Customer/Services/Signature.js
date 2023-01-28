import React, { useState, useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Stack, Icon, ScrollView, HStack, Text, Image, Button, Checkbox, Modal, useToast } from 'native-base'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { Headers } from '../../../components'
import { COLOR } from '../../../constants'
import SignatureScreen from 'react-native-signature-canvas';
import { service_book_store } from '../../../redux/actions/authActions'
import { useDispatch } from 'react-redux'

const SettingScreen = ({ navigation }) => {
    const ref = useRef()
    const dispatch = useDispatch()
    const [signature, setSign] = useState(null);
    const [Accept, setAccept] = useState(false);
    const [open, setOpen] = useState(false)
    const Toast = useToast();

    const handleSignature = signature => {
        setSign(signature);
    };

    const handleEmpty = () => {
        ref.current.clearSignature();
        setSign();
    }

    const handleCheck = () => {
        ref.current.readSignature();
        setOpen(false);
    }

    const Next = () => {
        if (signature) {
            dispatch(service_book_store({
                signature
            }));
            navigation.navigate("SetPaymentScreen")
        } else {
            return Toast.show({ title: "Please sign!", placement: 'bottom', status: 'error', w: 400 })
        }
    }

    const style = `body,html{width:100%;height:100px} .m-signature-pad--footer {display: none; margin: 0px;}`;

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            <Headers
                title={'SCHEDULE APPOINTMENT'}
                left={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon color={COLOR.base} size="sm" as={<Entypo name="chevron-left" />} />
                    </TouchableOpacity>
                }
            />
            <Box px={7} py={2} flex={1}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Stack flex={1}>
                        <Stack>
                            <Text fontSize="sm" mb={3} color={COLOR.black}>{"Your pet is important to us"}</Text>
                            <Text fontSize="xs" color="gray.700" my={1}>
                                Because we care about your pet's safety and well being, we want assure you that every effort will be made to make your pet's visit as pleasant as possible.
                            </Text>
                            <Text fontSize="xs" color="gray.700" my={1}>
                                Please understand that due to the very nature of being mobile we will occasionally be late for an appointment due to circumstances beyond our control (traffic, accidents, weather, etc) and cannot be held liable for unavoidable time delays.</Text>
                            <Text fontSize="xs" color="gray.700" my={1}>
                                Occasionally grooming can expose a hidden medical problem or aggravate a current one. This can Occur during or after grooming.
                            </Text>
                            <Text fontSize="xs" color="gray.700" my={1}>
                                In the best interst of your pet, we request your permission to obtain immediate veterinary treatment should it become necessary.
                            </Text>
                            <Text fontSize="xs" color="gray.700" my={1}>
                                <Text fontSize="xs" color={COLOR.base}>I hereby grant permission to this grooming establishment to</Text> obtain emergency veterinary treatment for my pet at my expense.
                            </Text>
                        </Stack>
                        <Stack mt={4}>
                            <Text fontSize="sm" mb={3} color={COLOR.black}>{"Your signature"}</Text>
                            <TouchableOpacity onPress={() => { setOpen(true) }}>
                                <Stack style={{ borderWidth: 1, borderColor: "gray" }} h={100}>
                                    {
                                        signature ?
                                            <Image size="md" resizeMode="contain" h={100} w="100%" source={{ uri: signature }} /> : null
                                    }
                                </Stack>
                            </TouchableOpacity>

                            {/* <HStack alignItems="center" justifyContent="space-between" mt={4}>
                                <TouchableOpacity onPress={handleEmpty}>
                                    <Text fontSize="sm" color={COLOR.base}>
                                        clear
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <HStack>
                                        <Icon size="xs" color={COLOR.base} as={<AntDesign name="upload" />} />
                                        <Text fontSize="xs" color={COLOR.base}>Upload Signature</Text>
                                    </HStack>
                                </TouchableOpacity>
                            </HStack> */}
                        </Stack>
                        <Checkbox
                            onChange={setAccept}
                            value={COLOR.base}
                            colorScheme="orange"
                            aria-label="check"
                            size="md"
                            icon={<Icon as={<AntDesign name="checksquareo" />} />}
                            alignSelf="flex-start"
                            my={5}
                        >
                            <Text ml={3} fontSize={10} color={COLOR.black}>
                                Accept terms and conditions
                            </Text>
                        </Checkbox>
                        <Button variant='ghost' mb={10} disabled={Accept ? false : true} bg={COLOR.base} onPress={Next} h={45} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.white}>Continue</Text></Button>
                    </Stack>
                </ScrollView>
            </Box>
            <Modal isOpen={open} onClose={() => setOpen(false)} size="full">
                <Modal.Content >
                    <Modal.Body>
                        <SignatureScreen
                            style={{ borderWidth: 1, borderColor: "gray", height: 100 }}
                            ref={ref}
                            onOK={handleSignature}
                            webStyle={style}
                        />
                        <HStack justifyContent="space-between">
                            <Button onPress={handleEmpty} w="46%" variant='ghost' mt={5} bg={COLOR.base} h={45} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.white}>Clear</Text></Button>
                            <Button onPress={handleCheck} w="46%" variant='ghost' mt={5} bg={COLOR.base} h={45} colorScheme="orange" borderRadius={15}><Text fontSize="md" pt={1} color={COLOR.white}>Check</Text></Button>
                        </HStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Box>
    )
}

export default SettingScreen