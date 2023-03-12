import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Button } from 'react-native'
import { addBirds, deleteBirds } from '../redux/action'
import Swipeable from 'react-native-gesture-handler/Swipeable';

const BirdList = ({navigation}) => {
    const [birds, setBirds] = useState([])
    const dispatch = useDispatch()
    const algo = useSelector(state => state.birds)
    let row = [];
    let prevOpenedRow;

    fetchData = async () => {
      console.log('fetching data')
      const response = await fetch('https://aves.ninjas.cl/api/birds')
      const responseJson = await response.json()
      dispatch(addBirds(responseJson))
      setBirds(responseJson.splice(0,15))
    }

    useEffect(() => {
    fetchData()
    }, [])

    getMoreData = (index) => {
      console.log('index', index)
      let a = algo.splice(index, 10);
      setBirds([...a]);
    }

    closeRow = (index) => {
      console.log('closerow');
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const deleteItem = ({ item, index }) => {
      let a = algo;
      a.splice(index, 1);
      setBirds([...a]);
    };


    openPress = (bird) => {
      console.log('entramos al openPress');
      navigation.navigate('Profile', {bird: bird})
    }

    const renderRightActions = (progress, dragX, onClick) => {
      return (
        <View
          style={{
            margin: 0,
            alignContent: 'center',
            justifyContent: 'center',
            width: 70,
          }}>
          <Button color="red" onPress={onClick} title="DELETE"></Button>
        </View>
      );
    };


    renderItem = ({ item, index }, onClick) => {
      return (
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, onClick)
          }
          onSwipeableOpen={() => closeRow(index)}
          ref={(ref) => (row[index] = ref)}
          rightOpenValue={-100}>
          <TouchableOpacity onPress={() => openPress(item)}>
              <View style={styles.item}>
                <Image style={styles.image} source={{url: item.images.thumb}}/>
                <View style={styles.names}>
                  <Text style={styles.textTitle}>{item.name.spanish}</Text>
                  <Text>{item.name.latin}</Text>
                  <Text>{item.name.english}</Text>
                </View>
              </View>
          </TouchableOpacity>
        </Swipeable>
      );
    };

    return (
        <View style={styles.container}>
          {birds && 
            <FlatList
              data={birds}
              ListHeaderComponentStyle={styles.header}
              renderItem={(v, index) =>
                renderItem(v, () => {
                  console.log('Pressed', v);
                  deleteItem(v);
                })
              }
              onEndReachedThreshold={0.2}
              onEndReached={(distance) => {
                console.log('onEndReached', distance);
                getMoreData(distance);
              }}
            />
          }
        </View> 
    )
}

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
      height: 72,
      borderBottomColor: '#0070D2',
      borderBottomWidth: 1,
    },
    image: {
      height: 48,
      width : 48,
      borderRadius: 4,
      padding:10
    },
    header: {
      borderBottomColor: '#0070D2',
      borderBottomWidth: 1,
    },
    textTitle: {
      fontWeight: 'bold',
    },
    names: {
      paddingHorizontal: 8,
    }
  });

export default BirdList