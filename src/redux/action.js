export const ADD_BIRDS = 'ADD_BIRDS';
export const DELETE_BIRDS = 'DELETE_BIRDS';

export const addBirds = birds => ({
  type: ADD_BIRDS,
  payload: {
    birds,
  },
});

export const deleteBirds = birdUID => ({
  type: DELETE_BIRDS,
  payload: {
    birdUID,
  },
});
