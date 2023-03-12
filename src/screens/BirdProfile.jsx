import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Button, ScrollView } from 'react-native'
import SvgUri, { Path } from "react-native-svg";

const BirdProfile = ({navegation, route: {params: {bird}}}) => {

  const [data, setData] = useState({})

  fetchBirdData = async () => {
    console.log('fetching data')
    const response = await fetch('https://aves.ninjas.cl/api/birds/'+bird.uid)
    const responseJson = await response.json()
    await setData(responseJson)
    await console.log('data, ', data)
    console.log('responseJson, ', responseJson)
  }

  useEffect(() => {
      console.log(navegation)
      console.log(bird)
      fetchBirdData()
  }, [])

  renderMap = () => {
    if (data.map) {
      console.log('renderMap', data.map)
      return (
        <View style={styles.mapContainer}>
          <SvgUri
            width={250}
            height={250}
            uri={data.map.image}
            style={{backgroundColor:'red', padding: 10, alignSelf: 'center'}}/>
          <Text style={styles.mapText}>Ubicación: {data.map.title}</Text>
        </View>
      )
    }
  }
  renderDetails = () => {
    if (data) {
      return (
        <View style={styles.detailsContainer}>
          <Text style={styles.textTitle}>Detalles </Text>
          <Text style={styles.detailsText}>Tipo de especie: {data.order}</Text>
          <Text style={styles.detailsText}>Hábitat: {data.habitat}</Text>
          <Text style={styles.detailsText}>Lo que deberías saber: {data.didyouknow}</Text>
          <Text style={styles.detailsText}>Medidas: {data.size}</Text>
        </View>
      )
    }
  }

  renderIUCNDescription = () => {
    if (data.iucn) {
      console.log('entra al renderIUCNDescription')
      return (
      <View style={styles.descriptionContainer}>
        <Text style={styles.textTitle}>Datos IUCN: </Text>
        <Text style={styles.descriptionText}>Titulo: {data.iucn.title}</Text>
        <Text style={styles.descriptionText}>Detalles: {data.iucn.description}</Text>
      </View>
      )
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
          <View style={styles.portrait}>
            <Image style={styles.image} source={{url: bird.images.main}}/>
            <View style={styles.names}>
              <Text style={styles.textTitle}>{bird.name.spanish}</Text>
              <Text style={styles.text}>{bird.name.latin}</Text>
              <Text style={styles.text}>{bird.name.english}</Text>
          </View>
          {renderMap()}
          {renderIUCNDescription()}
          {renderDetails()}
          </View>
      </View> 
    </ScrollView>
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
    },
    mapText: {
      padding : 16,
      textAlign: 'center',
    },
    mapContainer: {
      paddingTop: 16,
    }
  });

export default BirdProfile