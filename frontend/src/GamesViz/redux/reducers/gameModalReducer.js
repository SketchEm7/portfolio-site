export const OPEN_MODAL = 'redux/reducers/OPEN_MODAL';

const initialState = {
    openModal: false,
    gameTitle: null,
    gameCover: null,
    gameSummary: null,
    gameNewsResponse: null,
    close: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return Object.assign({}, state, {
                openModal: true,
            });
        default:
            return state = initialState;
    }

}

