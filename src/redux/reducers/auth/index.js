/**
 * auth reducer
 */
import produce from 'immer'

const initialState = {
  user: null,
  address: null,
  car: null,
  token: null,
}

export default function reducer(state = initialState, action) {
  console.log(action)
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_USERINFO':
        draft.user = action.payload.user
        return
      case 'SET_CARINFO':
        draft.car = action.payload.car
        return
      case 'REGISTER_SERVICE': {
        return {
          ...state,
          service: {
            ...state.service,
            ...action.payload,
          },
        };
      }

      case "SET_PROVIDERLOCATION": {
        return {
          ...state,
          providerLocation: {
            ...action.payload
          },
        };
      }

      case 'BOOK_SERVICE': {
        return {
          ...state,
          bookdata: {
            ...state.bookdata,
            ...action.payload,
          },
        };
      }
      case 'SET_ADDRESS':
        draft.address = action.payload.address
        return
      case 'SET_TOKEN':
        draft.token = action.payload.token
        return
      case 'LOG_OUT':
        draft.user = null
        draft.address = null
        draft.token = null
        return
      default:
        return state
    }
  })
}
