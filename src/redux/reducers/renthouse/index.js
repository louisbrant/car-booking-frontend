/**
 * auth reducer
 */
import produce from 'immer'

const initialState = {
  renthouse: {}
}

export default function reducer(state = initialState, action) {
  return produce(state, (draft) => {
    console.log('state,action=>', state, action)
    switch (action.type) {
      case 'SET_RentHouseInfor':
        draft.renthouse = action.payload.renthouse
        return
      default:
        return state
    }
  })
}
