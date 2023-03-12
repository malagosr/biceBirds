import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Button } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import HiddenItemWithActions from '../components/HiddenItemWithActions'

const BirdList = ({navigation}) => {
    const [birds, setBirds] = useState([])
    let row = [];
    let prevOpenedRow;

    fetchData = async () => {
      console.log('fetching data')
      const response = await fetch('https://aves.ninjas.cl/api/birds')
      const responseJson = await response.json()
      setBirds(responseJson.slice(0, 20))
    }

    useEffect(() => {
        fetchData()
    }, [])

    openPress = (bird) => {
      console.log('entramos al openPress');
      navigation.navigate('Profile', {bird: bird})
    }


    renderItem = ({ item }) => {
      console.log('entramos al renderItem', item)
      return (
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
      );
    };

    const renderHiddenItem = (data, rowMap) => {
      const rowActionAnimatedValue = new Animated.Value(75);
      const rowHeightAnimatedValue = new Animated.Value(60);
  
      return (
        <HiddenItemWithActions
          data={data}
          rowMap={rowMap}
          rowActionAnimatedValue={rowActionAnimatedValue}
          rowHeightAnimatedValue={rowHeightAnimatedValue}
          onClose={() => closeRow(rowMap, data.item.key)}
          onDelete={() => deleteRow(rowMap, data.item.key)}
        />
      );
    };
  
    
    const renderHeaderLine = () => {
        return (
            <View style={styles.header}/> 
        )
    }

    const deleteItem = ({ item, index }) => {
      console.log(item, index);
      let a = listData;
      a.splice(index, 1);
      console.log(a);
      setListData([...a]);
    };

    return (
        <View style={styles.container}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            {birds && 
              <SwipeListView
                useFlatList={true}
                data={birds}
                renderItem={renderItem}
                renderHiddenItem={ (rowData, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity onPress={ () => rowMap[rowData.item.key].closeRow() }>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                )}
                leftOpenValue={75}
                rightOpenValue={-150}
              />
            }
          </ScrollView>
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