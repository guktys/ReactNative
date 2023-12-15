import { SET_NEWS } from '../action/newsActions';

const initialState = {
    articles: [{
        "source": {
            "id": null,
            "name": "Yahoo Entertainment"
        },
        "author": "Test",
        "title": "Test",
        "description": "Test",
        "url": "Test",
        "urlToImage": null,
        "publishedAt": "2023-12-13T18:26:55Z",
        "content": "Test"
    },],
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