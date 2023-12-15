import { createStore, combineReducers } from 'redux';
import newsReducer from './store/reducers/newsReducer';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stringReducer from './store/reducers/stringReducer';
import dataReducer from "./store/reducers/dataReducer";

const rootReducer = combineReducers({
    news: newsReducer,
    string: stringReducer,
    data: dataReducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['string','data']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Используйте persistedReducer вместо rootReducer
const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;
