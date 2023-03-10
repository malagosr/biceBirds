import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from 'react-native'

const Main = () => {
    const [data, setData] = useState(null)
    const [names, setNames] = useState(null)

    const fetchData = async () => {
        const response = await fetch('https://www.digi-api.com/api/v1/digimon')
        const responseJson = await response.json()
        const digimons = responseJson.content.map(digimon => digimon.name)
        setNames(digimons)
        setData(responseJson.content)
        console.log(responseJson)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const Item = ({title}) => (
        <View>
          <Text>{title}</Text>
        </View>
      );

    return (
        <View style={styles.container}>
            <Text>Main!</Text>
            <FlatList
                data={data}
                renderItem={({item}) => <Item title={item.name} />}
                keyExtractor={item => item.id}
            />
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