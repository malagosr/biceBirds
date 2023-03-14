import {ADD_BIRDS, DELETE_BIRD} from './action';

const initialState = {
    birds: [],
};

const birdsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BIRDS: {
            const {birds} = action.payload;
            return {
                ...state,
                birds: birds,
            };
        }
        case DELETE_BIRD: {
            const {birdUid} = action.payload;
            return {
                ...state,
                birds: state.birds.filter(bird => bird.uid !== birdUid),
            };
        }
        default:
            return state;
    }
};

export default birdsReducer;
