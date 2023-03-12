import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, } from 'react-native'

const BirdProfile = ({navegation, route: {params: {bird}}}) => {

  const [info, setInfo] = useState(null)

  fetchBirdData = async () => {
    console.log('fetching data bird')
    const response = await fetch('https://aves.ninjas.cl/api/birds/'+bird.uid)
    const responseJson = await response.json()
    setInfo(responseJson)
  }

  useEffect(() => {
    fetchBirdData()
    console.log(bird)
  }, [])

  renderMap = (info) => {
    return (
      <View style={styles.map}>
        <Image style={styles.map} source={{url: info.map.image}}/>
        <Text style={styles.text}>{info.map.title}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.portrait}>
        <Image style={styles.image} source={{url: bird.images.main}}/>
        <View style={styles.names}>
          <Text style={styles.textTitle}>{bird.name.spanish}</Text>
          <Text style={styles.text}>{bird.name.latin}</Text>
          <Text style={styles.text}>{bird.name.english}</Text>
        </View>
        {info && renderMap(info)}
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
      paddingBottom: 40,
    },
    map: {
      height: 250,
      width : 250,
    }
  });

export default BirdProfile