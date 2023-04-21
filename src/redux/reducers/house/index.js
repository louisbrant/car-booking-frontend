/**
 * auth reducer
 */
import produce from 'immer'

const initialState = {
  tab: 'car',
}

export default function reducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_TAB':
        draft.tab = action.payload.tab
        return
      default:
        return state
    }
  })
}
