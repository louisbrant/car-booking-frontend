import React from 'react'
import { useSelector } from 'react-redux'
import GuestNavigation from './Guest'
import { setNavigator, useApi } from '../redux/services'
import CustomerNavigation from './Customer'
import { ROOT } from '../constants'
import io from 'socket.io-client'
import ProviderNavigation from './Provider'
import * as Location from 'expo-location'

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

const navigation = () => {
    const { user } = useSelector((store) => store.auth);
    const Api = useApi()

    console.log(user, "user")
    if (user) {
        ROOT.Socket = io.connect(ROOT.SOCKET_URL);
        ROOT.Socket.emit("new user", user.email);
        if (user.roles === "customer") {
            
            return (
                 <GuestNavigation ref={ref => setNavigator(ref)}  />
                // <CustomerNavigation ref={ref => setNavigator(ref)} />
            )
        } else if (user.roles === "groomer" || user.roles === "admin") {
            CheckIfLocationEnabled();
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
                Location.watchPositionAsync({ accuracy: Location.Accuracy.High }, ({ coords }) => {
                    if (coords) {
                        Api.LoadAppointData({ groomer: user.email }).then(({ data }) => {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].locationShareState) {
                                    let positionInfo = {
                                        provider: user.email,
                                        client: data[i].client,
                                        latitude: coords.latitude,
                                        longitude: coords.longitude,
                                    }
                                    ROOT.Socket.emit("share location", positionInfo);
                                }
                            }
                        }).catch(error => {
                            console.log(`LoadAppointData`, error)
                        })
                    }
                })
            })();
            return (
                <ProviderNavigation ref={ref => setNavigator(ref)} />
            )
        } else {
            return <GuestNavigation />
        }
    } else {
        return <GuestNavigation />
    }
}

export default navigation