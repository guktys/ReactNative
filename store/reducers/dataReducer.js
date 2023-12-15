const initialState = {
    data: "2023-12-13"
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATA':
            console.log('Updating data to:', action.payload.text);
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

export default dataReducer;
