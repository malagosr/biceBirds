export const ADD_BIRDS = 'ADD_BIRDS';
export const DELETE_BIRD = 'DELETE_BIRD';

export const addBirds = birds => ({
    type: ADD_BIRDS,
    payload: {
        birds,
    },
});

export const deleteBird = birdUid => ({
    type: DELETE_BIRD,
    payload: {
        birdUid,
    },
});
