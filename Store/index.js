
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import userSlice from "./Slices/userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: "AppName",
    storage:ReactNativeAsyncStorage
}

const persistUserReducer = persistReducer(persistConfig, userSlice)

export const store = configureStore({
    reducer: {
        userSlice : persistUserReducer
    },
  })

  export const persistedStore = persistStore(store);