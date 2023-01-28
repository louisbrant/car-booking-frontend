let navigator
export const setNavigator = (nav) => {
  /**
   * navigate setting
   */
  navigator = nav?._navigation
}

export const navigate = (e, params = {}) => {
  /**
   * navigate use
   */
  if (navigator) {
    navigator.navigate(e, params)
  }
}


export { navigator }