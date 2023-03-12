import {ADD_BIRDS, DELETE_BIRDS} from './action';

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
    case DELETE_BIRDS: {
      const {birdUID} = action.payload;
      console.log('birdUID', birdUID);
      return {
        birds: state.birds.filter(bird => bird.uid !== birdUID),
        // birds: state.birds.splice(birdUID, 1),
      };
    }
    default:
      return state;
  }
};

export default birdsReducer;
