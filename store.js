import { createStore, combineReducers } from 'redux';
import newsReducer from './store/reducers/newsReducer';
import {persistReducer, persistStore} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import stringReducer from "./store/reducers/stringReducer";

const rootReducer = combineReducers({
    news: newsReducer,
    string: stringReducer,
});


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['string'], // Только 'string' будет сохраняться
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(rootReducer);
export const persistor = persistStore(store);
export default store;
