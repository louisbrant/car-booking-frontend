/**
 * auth actions
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