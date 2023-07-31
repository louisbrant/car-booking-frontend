/**
 * api list
 */
const ApiList = {
  Socket: null,
  PROVIDERLOCATION: {},
  SignIn: 'auth/signin',
  ThirdSignUp: 'users/thirdsignup',
  ThirdSignIn: 'auth/thirdsignin',
  SignUp: 'users/signup',
  ResetPassword: 'users/resetPassword',
  UpdateUserInfor: 'users/updateUser',
  GetUserInfor: 'users/getuserinfor',
  EmailCheck: "users/emailCheck",
  RecendCode: 'users/recendcode',
  SendCode: 'users/sendcode',
  ForgotPass: 'users/forgotpass',
  VerifyCode: 'users/verifycode',
  AddCard: "users/addcard",
  RegisterService: "shop/setup-Service",
  GetService: "shop/getService",
  Edit_service: "shop/editService",
  GetDogPro: "users/getdogs",
  DeleteDog: "users/deleteDog",
  GetCatPro: "users/getCats",
  DeleteCat: "users/deleteCat",
  CreateBook: "shop/createBook",
  LoadAppointData: "shop/loadAppointData",
  AddFavourite: "shop/addfavourite",
  LoadFavouriteDate: "shop/loadfavourite",
  LoadProfileData: "users/getUserData",
  AddDogVaccine: "users/adddogVaccine",
  LoadVaccineData: "users/loadVaccine",
  RemoveVaccineData: "users/RemoveVaccine",
  CreateReview: "shop/createReview",
  LoadReviewData: "shop/loadreview",
  ChangeLocationState: "shop/changelocationstate",
  GetBookState: "shop/getbookstate",
  RescheduleBook: "shop/reschedule",
  GetGroomers: "users/getGroomers",
  DeleteGroomer: "users/deleteGroomer",
  UpdateState: "shop/updateState",
  BookComplete: "shop/bookComplete",
  SetGroomer: "shop/setgroomer",
  SendFirstMessage: 'users/sendFirstMessage',
  getChatList: 'users/getChatList',
  getEndChatInfor: 'users/getEndChatInfor',

  AddCar: "cars/addCar",
  GetMyCars: "cars/getMyCars",
  AddCarImage: "cars/addCarImage",
  DeleteMyCar: "cars/deletecar",
  GetAllCars: "cars/getAllCars",
  RentCar: "cars/rentcar",
  DelAccount: "users/delAccount",

  GetMyHouses: "houses/getMyHouses",
  GetAllHouses: "houses/getAllHouses",
  DeleteMyHouse: "houses/deleteHouse",


  mapApiKey: "AIzaSyBQjTfzE_m26y8-jSYTVPvwbkuebEUOCTM",
}

const dev = {
  BACKEND_URL: "http://192.168.134.108:10040/",
  SOCKET_URL: "http://192.168.134.108:10040/",
  IMAGE_URL: "http://192.168.134.108:10040/",
  ...ApiList
}
//
const production = {
  BACKEND_URL: "https://pet.spaw.ibluday.com/api/",
  SOCKET_URL: "https://pet.spaw.ibluday.com/",
  IMAGE_URL: "https://pet.spaw.ibluday.com/",
  ...ApiList
}

export const ROOT = dev