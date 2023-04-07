import React from 'react'
import { useSelector } from 'react-redux'
import GuestNavigation from './Guest'
import { setNavigator, useApi } from '../redux/services'
import { ROOT } from '../constants'
import io from 'socket.io-client'

const navigation = () => {
    const { user } = useSelector((store) => store.auth);
    console.log("user=>", user)
    const Api = useApi()
    if (user) {
        ROOT.Socket = io.connect(ROOT.SOCKET_URL);
        ROOT.Socket.emit("new user", user.email);
        return (
            <GuestNavigation ref={ref => setNavigator(ref)} />
        )
    } else {
        return <GuestNavigation />
    }
}

export default navigation