/**
 * services
 */
import axios from "axios"
import { ROOT } from "../../constants"

class ApiService {
  constructor() {
    axios.interceptors.request.use(
      config => {
        config.baseURL = ROOT.BACKEND_URL
        return config
      },
      error => Promise.reject(error)
    )
    axios.interceptors.response.use(
      response => response,
      error => {
        return Promise.reject(error)
      }
    )
    axios.interceptors.response.use(
      response => response,
      error => {
        return Promise.reject(error)
      }
    )
  }

  SignIn(...args) {
    return axios.post(ROOT.SignIn, ...args)
  }

  SignUp(...args) {
    return axios.post(ROOT.SignUp, ...args)
  }

  ThirdSignIn(...args) {
    return axios.post(ROOT.ThirdSignIn, ...args)
  }

  ThirdSignUp(...args) {
    return axios.post(ROOT.ThirdSignUp, ...args)
  }

  RecendCode(...args) {
    return axios.post(ROOT.RecendCode, ...args)
  }

  SendCode(...args) {
    return axios.post(ROOT.SendCode, ...args)
  }

  ForgotPass(...args) {
    return axios.post(ROOT.ForgotPass, ...args)
  }

  VerifyCode(...args) {
    return axios.post(ROOT.VerifyCode, ...args)
  }

  ResetPassword(...args) {
    return axios.post(ROOT.ResetPassword, ...args)
  }

  UpdateUserInfor(...args) {
    return axios.post(ROOT.UpdateUserInfor, ...args)
  }

  GetUserInfor(...args) {
    return axios.post(ROOT.GetUserInfor, ...args)
  }

  RentCar(...args) {
    return axios.post(ROOT.RentCar, ...args)
  }

  AddCard(...args) {
    return axios.post(ROOT.AddCard, ...args)
  }




  EmailCheck(...args) {
    return axios.post(ROOT.EmailCheck, ...args)
  }

  // privider

  Register_Service(...args) {
    return axios.post(ROOT.RegisterService, ...args)
  }

  GetService(...args) {
    return axios.post(ROOT.GetService, ...args)
  }

  Edit_service(...args) {
    return axios.post(ROOT.Edit_service, ...args)
  }


  GetDogPro(...args) {
    return axios.post(ROOT.GetDogPro, ...args)
  }


  DeleteDog(...args) {
    return axios.post(ROOT.DeleteDog, ...args)
  }

  CreateBook(...args) {
    return axios.post(ROOT.CreateBook, ...args)
  }

  LoadAppointData(...args) {
    return axios.post(ROOT.LoadAppointData, ...args)
  }

  AddFavourite(...args) {
    return axios.post(ROOT.AddFavourite, ...args)
  }

  LoadFavouriteDate(...args) {
    return axios.post(ROOT.LoadFavouriteDate, ...args)
  }

  LoadProfileData(...args) {
    return axios.post(ROOT.LoadProfileData, ...args)
  }

  AddDogVaccine(...args) {
    return axios.post(ROOT.AddDogVaccine, ...args)
  }

  LoadVaccineData(...args) {
    return axios.post(ROOT.LoadVaccineData, ...args)
  }

  RemoveVaccineData(...args) {
    return axios.post(ROOT.RemoveVaccineData, ...args)
  }


  GetCatPro(...args) {
    return axios.post(ROOT.GetCatPro, ...args)
  }


  DeleteCat(...args) {
    return axios.post(ROOT.DeleteCat, ...args)
  }

  CreateReview(...args) {
    return axios.post(ROOT.CreateReview, ...args)
  }

  LoadReviewData(...args) {
    return axios.post(ROOT.LoadReviewData, ...args)
  }

  ChangeLocationState(...args) {
    return axios.post(ROOT.ChangeLocationState, ...args)
  }

  GetBookState(...args) {
    return axios.post(ROOT.GetBookState, ...args)
  }

  RescheduleBook(...args) {
    return axios.post(ROOT.RescheduleBook, ...args)
  }

  GetGroomers(...args) {
    return axios.post(ROOT.GetGroomers, ...args)
  }

  DeleteGroomer(...args) {
    return axios.post(ROOT.DeleteGroomer, ...args)
  }

  UpdateState(...args) {
    return axios.post(ROOT.UpdateState, ...args)
  }

  BookComplete(...args) {
    return axios.post(ROOT.BookComplete, ...args)
  }

  SetGroomer(...args) {
    return axios.post(ROOT.SetGroomer, ...args)
  }

  SendFirstMessage(...args) {
    return axios.post(ROOT.SendFirstMessage, ...args)
  }

  getChatList(...args) {
    return axios.post(ROOT.getChatList, ...args)
  }

  getEndChatInfor(...args) {
    return axios.post(ROOT.getEndChatInfor, ...args)
  }

  AddCar(...args) {
    return axios.post(ROOT.AddCar, ...args)
  }
  GetMyCars(...args) {
    return axios.post(ROOT.GetMyCars, ...args)
  }
  AddCarImage(...args) {
    return axios.post(ROOT.AddCarImage, ...args)
  }
  DeleteMyCar(...args) {
    return axios.post(ROOT.DeleteMyCar, ...args)
  }
  GetAllCars(...args) {
    return axios.post(ROOT.GetAllCars, ...args)
  }
  DelAccount(...args) {
    return axios.post(ROOT.DelAccount, ...args)
  }



  GetMyHouses(...args) {
    return axios.post(ROOT.GetMyHouses, ...args)
  }
  GetAllHouses(...args) {
    return axios.post(ROOT.GetAllHouses, ...args)
  }
  DeleteMyHouse(...args) {
    return axios.post(ROOT.DeleteMyHouse, ...args)
  }



  /**
   * tron load apis
   */

}

export const useApi = () => {
  return new ApiService()
}

export * from './navigator'