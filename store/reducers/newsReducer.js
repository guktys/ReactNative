import { SET_NEWS } from '../action/newsActions';

const initialState = {
    articles: [],
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                articles: action.payload,
            };
        default:
            return state;
    }
};

export default newsReducer;