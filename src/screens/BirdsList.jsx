import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Button } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { addBirds, deleteBirds } from '../redux/action'

const BirdList = ({navigation}) => {
    const [birds, setBirds] = useState([])
    const dispatch = useDispatch()
    const algo = useSelector(state => state.birds)

    fetchData = async () => {
      console.log('fetching data')
      const response = await fetch('https://aves.ninjas.cl/api/birds')
      const responseJson = await response.json()
      dispatch(addBirds(responseJson))
      setBirds(responseJson)
      console.log('aca', responseJson)
    }

    useEffect(() => {
    fetchData()
    }, [])

    onDeleteBird = (bird) => {
      console.log('ondeletebird', bird.uid)
      dispatch(deleteBirds(bird.uid))
      console.log(algo) // rerender
    }

    openPress = (bird) => {
      console.log('entramos al openPress');
      // navigation.navigate('Profile', {bird: bird})
      onDeleteBird(bird)
    }


    renderItem = ({ item}) => {
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
    
    const renderHeaderLine = () => {
        return (
            <View style={styles.header}/> 
        )
      }

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