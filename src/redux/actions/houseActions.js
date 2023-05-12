/**
 * house actions
 */

export const setTab = (tab) => {
    return {
        type: 'SET_TAB',
        payload: { tab },
    }
}

export const setHouseInfor = (house) => {
    return {
        type: 'SET_HouseInfor',
        payload: { house },
    }
}

export const setRentHouseInfor = (renthouse) => {
    return {
        type: 'SET_RentHouseInfor',
        payload: { renthouse },
    }
}