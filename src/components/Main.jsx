import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from 'react-native'

const Main = () => {
    const [birds, setBirds] = useState(null)
    const [prueba, setPrueba] = useState(null)

    const fetchData = async () => {
        const response = await fetch('https://aves.ninjas.cl/api/birds')
        const responseJson = await response.json()
        setBirds(responseJson)
        setPrueba(responseJson.slice(0, 10))
        console.log(setPrueba)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const Item = ({bird}) => (
        <View>
          <Text>{bird.name}</Text>
        </View>
      );

    return (
        <View style={styles.container}>
            <Text>Main!</Text>
            {/* <FlatList
                data={prueba}
                renderItem={({item}) => <Item bird={item} />}
                keyExtractor={item => item.id}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Main