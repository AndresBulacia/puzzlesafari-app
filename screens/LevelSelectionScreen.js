import {React, useState, useEffect}  from "react";
import {View, Text, TouchableOpacity, ImageBackground, StyleSheet, Button} from 'react-native';
import { useLevels } from "../context/LevelContext.js";
import { Audio } from "expo-av";

export default function LevelSelectionScreen({navigation}) {
    const {levels} = useLevels();
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [buttonSound, setButtonSound] = useState(null);

    const handleLevelPress = (level) => {
            navigation.navigate('GameScreen', {levelId : level.id})
    }

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
    
        
    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}/>
            <View style={styles.container}>
                <Text style={styles.title}>Niveles</Text>
                {levels.map((level) => (
                    <TouchableOpacity
                        key={level.id}
                        style={[
                            styles.levelButton,
                            level.unlocked ? styles.unlocked : styles.locked,
                        ]}
                        onPress={() => {
                            playButtonSound();
                            handleLevelPress(level)
                        }}
                        disabled={!level.unlocked}
                    >
                        <Text>
                            {`Nivel ${level.id} ${level.unlocked ? '' : '(Bloqueado)'}`}
                        </Text>
                    </TouchableOpacity>
                ))}

                    <TouchableOpacity 
                        style={styles.pauseButton}
                        onPress={() => {
                            playButtonSound();
                            navigation.navigate('HomeScreen')
                        }}
                    >
                        <Text style={styles.buttonText}>Volver</Text>
                    </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    title: {
        fontSize: 24,
        color: "#fff",
        fontWeight: 'bold',
        marginBottom: 20,
    },
    levelButton: {
        padding: 15,
        marginVertical: 10,
        borderRadius: 50,
        width: 200,
        alignItems: 'center',
    },
    unlocked: {
        backgroundColor: '#FFD700',
    },
    locked: {
        backgroundColor: '#ccc',
    },
    levelText: {
        color: '#FFF',
        fontSize: 18,
    },
    pauseButton: {
        position: 'absolute',
        bottom: 100,
        right: 80,
        width: 60,
        height: 60,
        backgroundColor: '#FFD700',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
});