/**
 * auth actions
 */

export const setUserInfo = (user) => {
  return {
    type: 'SET_USERINFO',
    payload: { user },
  }
}

export const setCarInfo = (car) => {
  return {
    type: 'SET_CARINFO',
    payload: { car },
  }
}

export const register_service_store = (data) => {
  return {
    type: 'REGISTER_SERVICE',
    payload: data,
  }
}

export const service_book_store = (data) => {
  return {
    type: 'BOOK_SERVICE',
    payload: data,
  }
}


export const setToken = (token) => {
  return {
    type: 'SET_TOKEN',
    payload: { token },
  }
}

export const setProviderLocation = (data) => {
  return {
    type: 'SET_PROVIDERLOCATION',
    payload: data,
  }
}
export const Logut = () => {
  return { type: 'LOG_OUT' }
}