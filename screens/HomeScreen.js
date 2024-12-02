import React, { useEffect, useState } from "react";
import {Text, StyleSheet, TouchableOpacity, ImageBackground, View, Modal, Switch } from "react-native";
import { useFonts } from "expo-font";
import { Audio } from "expo-av";
import BackgroundMusic from "../components/BackgroundMusic";

export default function HomeScreen({ navigation }){
    const [fontsLoaded] = useFonts ({
        Baloo: require('../assets/fonts/Baloo.ttf'),
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [isMusicEnabled, setIsMusicEnabled] = useState(true);
    const [buttonSound, setButtonSound] = useState(null);

    useEffect(() => {
        //Carga de sonido para los botones
        async function loadSound() {
            const {sound} = await Audio.Sound.createAsync(require('../assets/sounds/sfx_pop.mp3'));
            setButtonSound(sound);
        }
        loadSound();

        return () => {
            if(buttonSound) {
                buttonSound.unloadAsync();
            }
        };
    }, []);

    const playButtonSound = async () => {
        if (isSoundEnabled && buttonSound) {
            await buttonSound.replayAsync();
        }
    };

    if(!fontsLoaded) {
        return null;
    }

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={styles.container}
            resizeMode="cover"
        >
            <BackgroundMusic isMusicEnabled={isMusicEnabled}/>
            <View style={styles.overlay}/>
            <Text style={styles.title}>Rompecabezas de la mente: La dislexia y su solución</Text>

            <TouchableOpacity
                style={[styles.button, {backgroundColor: '#FFD700'}]}
                onPress= {() => {
                    playButtonSound();
                    navigation.navigate('GameScreen', {isMusicEnabled});
                }}
            >
                <Text style={styles.buttonText}>Iniciar Juego</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, {backgroundColor: '#FFD700'}]}
                onPress= {() => {
                    playButtonSound();
                    navigation.navigate('LevelSelectionScreen');
                }}
            >
                <Text style={styles.buttonText}>Select Level</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, {backgroundColor: '#4CAF50'}]}
                onPress={() => {
                    playButtonSound();
                    setModalVisible(true)
                }}
            >
                <Text style={styles.buttonText}>Ajustes</Text>
            </TouchableOpacity>
            

            <Text style={styles.footerText}>Juego para mejorar las habilidades de niños con dislexia o TDAH.</Text>
        
            {/* Modal Ajustes*/}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Ajustes</Text>

                        {/*Opción de Sonido */}
                        <View style={styles.optionContainer}>
                            <Text style={styles.optionText}>Sonido</Text>
                                <Switch
                                    onPress={playButtonSound()}
                                    value={isSoundEnabled}
                                    onValueChange={(value) => setIsSoundEnabled(value)}
                                />
                        </View>

                        {/*Opción de Música */}
                        <View style={styles.optionContainer}>
                            <Text style={styles.optionText}>Música</Text>
                                <Switch
                                    value={isMusicEnabled}
                                    onValueChange={(value) => setIsMusicEnabled(value)}
                                />
                        </View>

                        {/*Botón para cerrar el modal*/}
                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: '#FFD700', marginTop: 20}]}
                            onPress={() => {
                                playButtonSound();
                                setModalVisible(false)
                            }}
                        >
                            <Text style={styles.buttonText}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    title: {
        fontSize: 32,
        marginBottom: 100,
        color: '#FFFACD',
        textAlign: 'center',
        fontFamily: 'Baloo',
        fontWeight: '400',
    },
    button: {
        width: '70%',
        paddingVertical: 15,
        borderRadius: 40,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Baloo',
        fontWeight: '700',
    },
    footerText: {
        paddingTop: 300,
        marginTop: 20,
        fontSize: 12,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#FFBC47',
        borderRadius: 40,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontFamily: 'Baloo',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    optionText: {
        fontSize: 18,
        fontFamily: 'Baloo',
        color: '#FFFFFF',
    },
});