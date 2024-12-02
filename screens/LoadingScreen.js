import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import * as Progress from 'react-native-progress';

export default function LoadingScreen({onLoadingComplete}) {
    const [progress, setProgress] = useState(0);

    useEffect (() => {
        //simulación de carga
        const interval = setInterval (() => {
            setProgress((prevProgress) => {
                if (prevProgress < 1) {
                    return prevProgress + 0.1;
                } else {
                    clearInterval(interval);
                    onLoadingComplete();
                    return prevProgress;
                }
            });
        }, 300);
        return () => clearInterval(interval);
    }, []);


    return(
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/loading-image.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.footer}>
                    <Text style={styles.percentageText}>
                        {Math.round(progress * 100)}%
                    </Text>
                    <Progress.Bar progress={progress} width={200} height={30} color="#fff" borderRadius={50}/>
                    <Text style={styles.loadingText}>Cargando...</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    footer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    percentageText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    loadingText: {
        fontSize: 20,
        color: '#FFD700',
        marginBottom: 10,
    },
});