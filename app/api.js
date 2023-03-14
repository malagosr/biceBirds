/* eslint-disable prettier/prettier */
const getItems = async () => {
    console.log('fetching data');
    try {
        const response = await fetch('https://aves.ninjas.cl/api/birds');
        const responseJson = response.json();
        return responseJson;
    } catch (error) {
        return null;
    }
};

const getInfo = async uid => {
    try {
        const response = await fetch('https://aves.ninjas.cl/api/birds/' + uid);
        const responseJson = response.json();
        return responseJson;
    } catch (error) {
        return null;
    }
};

export {getItems, getInfo};
