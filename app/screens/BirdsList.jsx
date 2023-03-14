/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import {addBirds, deleteBird} from '../redux/action';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItems } from '../api';

const BirdList = ({navigation}) => {
    const [birds, setBirds] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useDispatch();
    const allBirds = useSelector(state => state.birds);
    let row = [];
    let prevOpenedRow;

    const fetchData = async () => {
        console.log('fetching data');
        try {
            const responseJson = await getItems()
            dispatch(addBirds(responseJson));
            setBirds(responseJson.slice(0, 10));
            setIsFetching(false);
            const jsonValue = JSON.stringify({lastData: responseJson});
            await AsyncStorage.setItem('BIRDS_LAST_CALL', jsonValue);
        } catch (error) {
            const data = await AsyncStorage.getItem('BIRDS_LAST_CALL');
            const jsonValue = JSON.parse(data);
            setBirds(jsonValue.lastData.slice(0, 10));
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getMoreData = () => {
        const length = birds.length;
        let a = allBirds.slice(0, length + 10);
        setBirds(a);
    };

    const closeRow = index => {
        if (prevOpenedRow && prevOpenedRow !== row[index]) {
            prevOpenedRow.close();
        }
        prevOpenedRow = row[index];
    };

    const deleteItem = ({item, index}) => {
        let a = birds;
        a.splice(index, 1);
        setBirds([...a]);
        closeRow(index + 1);
        dispatch(deleteBird(item.uid));
    };

    const openPress = bird => {
        navigation.navigate('Información', {bird: bird});
    };

    const onRefresh = async () => {
        setIsFetching(true);
        fetchData();
    };

    const renderRightActions = (onClick) => {
        return (
            <View style={styles.rightAction}>
                <TouchableOpacity style={styles.button} onPress={onClick}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderItem = ({item, index}, onClick) => {

        return (
            <GestureHandlerRootView>
                <Swipeable
                    renderRightActions={() => renderRightActions(onClick)}
                    onSwipeableOpen={() => closeRow(index)}
                    ref={ref => (row[index] = ref)}
                    rightOpenValue={-100}>
                    <TouchableOpacity onPress={() => openPress(item)}>
                        <View style={styles.item}>
                            <Image style={styles.image} source={{uri: item.images.main}} />
                            <View style={styles.names}>
                                <Text style={styles.textTitle}>{item.name.spanish}</Text>
                                <Text>{item.name.latin}</Text>
                                <Text>{item.name.english}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Swipeable>
            </GestureHandlerRootView>
        );
    };

    const renderSeparator = () => <View style={styles.renderSeparator} />;

    return (
        <View style={styles.container}>
            {birds && (
                <View style={styles.header}>
                    <FlatList
                        data={birds}
                        renderItem={(v, index) =>
                            renderItem(v, () => {
                                deleteItem(v);
                            })
                        }
                        onRefresh={() => onRefresh()}
                        refreshing={isFetching}
                        onEndReachedThreshold={0}
                        onEndReached={() => getMoreData()}
                        ItemSeparatorComponent={renderSeparator}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
    item: {
        flexDirection: 'row',
        padding: 8,
        paddingLeft: 16,
        height: 88,
    },
    button:{
        backgroundColor: 'red',
        height: 88,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    image: {
        height: 72,
        width: 72,
        borderRadius: 4,
    },
    header: {
        borderTopColor: '#0070D2',
        borderTopWidth: 1,
    },
    textTitle: {
        fontWeight: 'bold',
    },
    names: {
        paddingHorizontal: 8,
    },
    renderSeparator: {
        backgroundColor: '#0070D2',
        height: 1,
    },
    rightAction: {
        margin: 0,
        alignContent: 'center',
        justifyContent: 'center',
        width: 80,
        backgroundColor: 'red',
    },
});

export default BirdList;
