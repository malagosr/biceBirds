/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl,
} from 'react-native';
import {SvgCssUri} from 'react-native-svg';

const BirdProfile = ({
    route: {
        params: {bird},
    },
}) => {
    const [info, setInfo] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const fetchBirdData = async () => {
        try {
            const response = await fetch(
                'https://aves.ninjas.cl/api/birds/' + bird.uid,
            );
            const responseJson = await response.json();
            setInfo(responseJson);
            setRefreshing(false);
        } catch (e) {
            setError({error: 'Network Error'});
        }
    };

    useEffect(() => {
        fetchBirdData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchBirdData();
    };

    const renderMap = () => {
        if (info) {
            return (
                <View style={styles.mapContainer}>
                    <SvgCssUri width={250} height={500} uri={info.map.image} />
                    <Text style={styles.mapText}>Ubicación: {info.map.title}</Text>
                </View>
            );
        }
    };

    const renderDetails = () => {
        if (info) {
            return (
                <View style={styles.detailsContainer}>
                    <Text style={styles.textTitleDescription}>Detalles </Text>
                    <Text style={styles.detailsText}>Tipo de especie: {info.order}</Text>
                    <Text style={styles.detailsText}>Hábitat: {info.habitat}</Text>
                    <Text style={styles.detailsText}>
                        Lo que deberías saber: {info.didyouknow}
                    </Text>
                    <Text style={styles.detailsText}>Medidas: {info.size}</Text>
                </View>
            );
        }
    };

    const renderIUCNDescription = () => {
        if (info) {
            return (
                <View style={styles.descriptionContainer}>
                    <Text style={styles.textTitleDescription}>Datos IUCN: </Text>
                    <Text style={styles.descriptionText}>
                        Título:{info.iucn.title ? info.iucn.title : ' No disponible'}
                    </Text>
                    <Text style={styles.descriptionText}>
                        Descripción:
                        {info.iucn.description ? info.iucn.description : ' No disponible'}
                    </Text>
                </View>
            );
        }
    };

    const renderError = () => {
        return (
            <View style={styles.errorScreen}>
                <Text>Información no disponible</Text>
            </View>
        );
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.container}>
                <View style={styles.portrait}>
                    <Image style={styles.image} source={{uri: bird.images.main}} />
                    <View style={styles.names}>
                        <Text style={styles.textTitle}>{bird.name.spanish}</Text>
                        <Text style={styles.text}>{bird.name.latin}</Text>
                        <Text style={styles.text}>{bird.name.english}</Text>
                    </View>
                    {!error ? (
                        <View>
                            {renderMap()}
                            {renderIUCNDescription()}
                            {renderDetails()}
                        </View>
                    ) : (
                        renderError()
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

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
        width: 160,
    },
    textTitle: {
        fontWeight: 'bold',
        paddingTop: 8,
    },
    text: {
        paddingTop: 8,
    },
    names: {
        paddingBottom: 16,
        alignItems: 'center',
    },
    mapText: {
        padding: 16,
        textAlign: 'center',
    },
    mapContainer: {
        paddingTop: 16,
        paddingBottom: 16,
        alignItems: 'center',
    },
    textTitleDescription: {
        fontWeight: 'bold',
        padding: 8,
    },
    descriptionContainer: {
        width: '100%',
        marginVertical: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#f0f0f0',
    },
    detailsContainer: {
        width: '100%',
        marginVertical: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#f0f0f0',
    },
    descriptionText: {
        padding: 8,
    },
    detailsText: {
        padding: 8,
    },
    errorScreen: {
        padding: 48,
    },
});

export default BirdProfile;
