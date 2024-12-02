import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";


export default function SettingsScreen({navigation}) {
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);
    const [isMusicEnabled, setIsMusicEnabled] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajustes</Text>

            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Sonido</Text>
                <Switch
                    value={isSoundEnabled}
                    onValueChange={(value) => setIsSoundEnabled(value)}
                />
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Música</Text>
                <Switch
                    value={isMusicEnabled}
                    onValueChange={(value) => setIsMusicEnabled(value)}
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFBC47',
        padding:20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Baloo',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    optionContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginBottom: 15,
    },
    optionText: {
        fontSize: 18,
        fontFamily: 'Baloo',
        color: '#FFFFFF',
    },
    button: {
        backgroundColor: '#FFD700',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 40,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Baloo',
    },
});