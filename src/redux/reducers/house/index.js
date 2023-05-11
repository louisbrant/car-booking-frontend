/**
 * auth reducer
 */
import produce from 'immer'

const initialState = {
  tab: 'car',
  house: {}
}

export default function reducer(state = initialState, action) {
  return produce(state, (draft) => {
    console.log('state,action=>', state, action)
    switch (action.type) {
      case 'SET_TAB':
        draft.tab = action.payload.tab
        return
      case 'SET_HouseInfor':
        draft.house = action.payload.house
        return
      default:
        return state
    }
  })
}
