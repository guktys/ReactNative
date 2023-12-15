const initialState = {
    savedString: "Ukraine"
};

const stringReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STRING':
            console.log('Updating savedString to:', action.payload.text);
            return {
                ...state,
                savedString: action.payload
            };
        // другие кейсы
        default:
            return state;
    }
};

export default stringReducer;