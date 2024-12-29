import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { playButtonSound } from "../utils/soundUtils";
import { useFonts } from "expo-font";

const SoundButton = ({ onPress, title, style, textStyle, isSoundEnabled = true }) => {
    const [fontsLoaded] = useFonts ({
            Baloo: require('../assets/fonts/Baloo.ttf'),
        });
        if(!fontsLoaded) {
            return null;
        }
    return (
        <TouchableOpacity
            style={[styles.button, style]} // Estilos personalizados
            onPress={() => {
                playButtonSound(isSoundEnabled); // Reproducir sonido
                if (onPress) onPress(); // Acción personalizada
            }}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 15,
        backgroundColor: "#FFD700",
        borderRadius: 10,
        alignItems: "center",
    },
    text: {
        color: "#FFF",
        fontSize: 24,
        fontFamily: 'Baloo',
    },
});

export default SoundButton;
