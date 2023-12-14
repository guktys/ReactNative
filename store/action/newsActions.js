export const SET_NEWS = 'SET_NEWS';

export const setNews = (news) => {
    return {
        type: SET_NEWS,
        payload: news,
    };
};