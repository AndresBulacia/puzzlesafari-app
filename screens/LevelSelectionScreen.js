import React from "react";
import {View, Text, TouchableOpacity, ImageBackground, StyleSheet, Button} from 'react-native';
import { useLevels } from "../context/LevelContext";

export default function LevelSelectionScreen({navigation}) {
    const {levels} = useLevels();

    const handleLevelPress = (level) => {
        if (level.unlocked) {
            navigation.navigate('GameScreen', {levelId : level.id})
        }
    }

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.container}>
                {levels.map(level => (
                    <Button
                        key={level.id}
                        title={`Nivel ${level.id} ${level.unlocked ? "" : "(Bloqueado)"}`}
                        onPress={() => handleLevelPress(level)}
                        disabled={!level.unlocked}
                    >
                    </Button>
                ))}
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
    title: {
        fontSize: 24,
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
    }
});