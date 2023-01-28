import React, { Fragment, useEffect, useState } from 'react'
import { Dimensions, Platform } from 'react-native'
import { Box, Text, Image, Button, Alert } from 'native-base'
import { Footers, Headers, Loading, MainCurrency, MarketsItem } from '../../../components'
import { COLOR, Images, LAYOUT, ROOT } from '../../../constants'
import { useApi } from '../../../redux/services'
import { useSelector } from 'react-redux'
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location'

const TrackgroomerScreen = ({ navigation }) => {

    const Api = useApi()
    const [loading, setLoading] = useState(false)
    const [AppointData, setAppointData] = useState(false)
    const { user, providerLocation } = useSelector((store) => store.auth);
    const { height, width } = Dimensions.get("screen");
    const [position, setPosition] = useState()
    const [maplocation, setMaplocation] = useState()
    const [groomerLocation, setGroomerLocation] = useState()


    const CheckIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync()
        if (!enabled)
            Alert.alert(
                'Location Service not enabled',
                'Please enable your location services to continue',
                [{ text: 'OK' }],
                { cancelable: false }
            )
    }

    const _changeMaplocation = (groomer, self) => {
        groomer = groomer !== undefined ? groomer : groomerLocation;
        self = self !== undefined ? self : position;
        if (groomer && self) {
            let cdelta = {
                latitude: (groomer.latitude + self.latitude) / 2,
                longitude: (groomer.longitude + self.longitude) / 2,
                latitudeDelta: Math.abs(groomer.latitude - self.latitude * 1.00015),
                longitudeDelta: Math.abs(groomer.longitude - self.longitude * 1.00015),
            }
            setMaplocation(cdelta);
        }
    }

    const _handleSocket = (data) => {
        if (data.provider === navigation.state.params) {
            if (groomerLocation) {
                if (groomerLocation.latitude === data.latitude && groomerLocation.longitude === data.longitude) {
                    return;
                } else {
                    setGroomerLocation(data);
                    _changeMaplocation(data);
                }
            } else {
                setGroomerLocation(data);
                _changeMaplocation(data);
            }
        }
    }

    const _handleLocation = ({ coords }) => {
        if (coords) {
            if (position) {
                if (position.latitude === coords.latitude && position.longitude === coords.longitude) {
                    return;
                } else {
                    setPosition(coords);
                    _changeMaplocation(undefined, coords);
                }
            } else {
                setPosition(coords);
                _changeMaplocation(undefined, coords);
            }
        }
    }

    useEffect(() => {
        ROOT.Socket.on("share location", _handleSocket)
        CheckIfLocationEnabled();
        let SelfLocation = null;
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()

            if (status !== 'granted') {
                Alert.alert(
                    'Permission not granted',
                    'Allow the app to use location service.',
                    [{ text: 'OK' }],
                    { cancelable: false }
                )
            }

            SelfLocation = Location.watchPositionAsync({ accuracy: Location.Accuracy.High }, _handleLocation);
        })()
        return () => {
            ROOT.Socket.off("share location", _handleSocket)
            Promise.resolve(SelfLocation).then(e => {
                e.remove();
            });
        }
    }, [position, groomerLocation])

    return (
        <Box flex={1} bg={COLOR.bg1} w='100%'>
            {loading && <Loading />}
            {
                position ?
                    <MapView
                        style={{ width: width, height: height }}
                        region={{
                            latitude: maplocation ? maplocation.latitude : position.latitude,
                            longitude: maplocation ? maplocation.longitude : position.longitude,
                            latitudeDelta: maplocation ? maplocation.latitudeDelta : 0.01,
                            longitudeDelta: maplocation ? maplocation.longitudeDelta : 0.01,
                        }}
                    >
                        {
                            position ?
                                <Marker
                                    coordinate={{
                                        latitude: position.latitude,
                                        longitude: position.longitude,
                                    }}
                                >
                                    <Image
                                        size="md"
                                        resizeMode="contain"
                                        source={Images.MARKER1}
                                    />
                                </Marker>
                                : null
                        }
                        {
                            groomerLocation ?
                                <Marker
                                    coordinate={{
                                        latitude: groomerLocation.latitude,
                                        longitude: groomerLocation.longitude,
                                    }}
                                >
                                    <Image
                                        size="xs"
                                        resizeMode="contain"
                                        source={Images.MARKER2}
                                    />
                                </Marker>
                                : null
                        }

                    </MapView>
                    : null
            }
            <Button mt={8} h={45} zIndex={1000} bottom={8} w={"80%"} ml="10%" position="absolute" bg={"#e74c3c"} variant="ghost" onPress={() => navigation.goBack()} colorScheme="orange" borderRadius={15}><Text color={COLOR.white} fontSize="md" pt={1}>Stop tracking   </Text></Button>

        </Box>
    )
}

export default TrackgroomerScreen


