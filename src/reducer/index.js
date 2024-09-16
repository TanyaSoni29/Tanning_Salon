import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import productReducer from "../slices/productSlice";
import serviceReducer from "../slices/serviceSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  product: productReducer,
  service: serviceReducer,
});

export default rootReducer;
