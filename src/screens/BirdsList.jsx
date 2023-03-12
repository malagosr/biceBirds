import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addBird, removeBird } from '../features/birds/birdsSlice'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Button } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

const BirdList = ({navigation}) => {
    const [birds, setBirds] = useState([])
    const dispatch = useDispatch()
    let row = [];
    let prevOpenedRow;

    fetchData = async () => {
      console.log('fetching data')
      const response = await fetch('https://aves.ninjas.cl/api/birds')
      const responseJson = await response.json()
      setBirds(responseJson)
      dispatch(addBird(responseJson))
      await console.log(responseJson.slice(0, 10))
    }

    useEffect(() => {
    fetchData()
    }, [])

    openPress = (bird) => {
      console.log('entramos al openPress');
      navigation.navigate('Profile', {bird: bird})
    }


    renderItem = ({ item, index }, onClick) => {
      console.log('entramos al renderItem', item)

    //   const closeRow = (index) => {
    //     console.log('closerow');
    //     if (prevOpenedRow && prevOpenedRow !== row[index]) {
    //       prevOpenedRow.close();
    //     }
    //     prevOpenedRow = row[index];
    //   };

    //   const renderRightActions = (progress, dragX, onClick) => {
    //     console.log('entramos al renderRightActions')
    //     return (
    //       <View
    //         style={{
    //           margin: 0,
    //           alignContent: 'center',
    //           justifyContent: 'center',
    //           width: 70,
    //         }}>
    //         <Button color="red" onPress={onClick} title="DELETE"></Button>
    //       </View>
    //     );
    //   };

      return (

        <TouchableOpacity onPress={() => openPress(item)}>
          {/* <Swipeable
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, onClick)
            }
            onSwipeableOpen={() => closeRow(index)}
            ref={(ref) => (row[index] = ref)}
            rightOpenValue={-100}> */}
            <View style={styles.item}>
              <Image style={styles.image} source={{url: item.images.thumb}}/>
              <View style={styles.names}>
                <Text style={styles.textTitle}>{item.name.spanish}</Text>
                <Text>{item.name.latin}</Text>
                <Text>{item.name.english}</Text>
              </View>
            </View>
          {/* </Swipeable> */}
        </TouchableOpacity>
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
      setBirds([...a]);
    };

    return (
        <View style={styles.container}>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            {birds && 
              <FlatList
                data={birds}
                renderItem={ item =>
                  renderItem(item, () => {
                    console.log('Pressed', v);
                    deleteItem(v);
                })}
                key={item => item.id}
                ListHeaderComponent={renderHeaderLine}
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