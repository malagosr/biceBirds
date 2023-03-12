import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Button } from 'react-native'

const BirdProfile = ({navegation, route: {params: {bird}}}) => {

  const [data, setData] = useState([])

  fetchBirdData = async () => {
    console.log('fetching data')
    const response = await fetch('https://aves.ninjas.cl/api/birds/'+bird.uid)
    const responseJson = await response.json()
    setData(responseJson)
    console.log('data, ', responseJson)
  }

    useEffect(() => {
        console.log(navegation)
        console.log(bird)
        fetchBirdData()
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.portrait}>
              <Image style={styles.image} source={{url: bird.images.main}}/>
              <View style={styles.names}>
                <Text style={styles.textTitle}>{bird.name.spanish}</Text>
                <Text style={styles.text}>{bird.name.latin}</Text>
                <Text style={styles.text}>{bird.name.english}</Text>
            </View>
        </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
    },
    portrait: {
      paddingTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      height: 160,
      width : 160,
    },
    textTitle: {
      fontWeight: 'bold',
      paddingTop: 8,
    },
    text: {
      paddingTop: 8,
    },
    names: {
      alignItems: 'center',
    }
  });

export default BirdProfile