import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import adminTicketsSlice from "./slices/adminTicketsSlice";
import userTicketsSlice from "./slices/userTicketsSlice";
import paginationSlice from "./slices/paginationSlice";


const rootReducer = combineReducers({
   adminTickets:adminTicketsSlice,
   userTickets:userTicketsSlice,
   pagination:paginationSlice
})

const persistConfig = { 
    key:'root',
    storage,
    blacklist:['adminTickets','userTickets','pagination']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer;