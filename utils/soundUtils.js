import { Audio } from "expo-av";

let buttonSound = null;
let isSoundLoaded = false;  // Estado para verificar si el sonido está cargado

export const loadButtonSound = async () => {
    try {
        if (!buttonSound) {
            const { sound } = await Audio.Sound.createAsync(
                require("../assets/sounds/sfx_pop.mp3")
            );
            buttonSound = sound;
            isSoundLoaded = true;  // Marca el sonido como cargado
        }
    } catch (error) {
        console.error("Error cargando el sonido del botón:", error);
    }
};

export const playButtonSound = async (isSoundEnabled = true) => {
    if (isSoundEnabled && isSoundLoaded) {
        try {
            await buttonSound.replayAsync();  // Reproducir el sonido
        } catch (error) {
            console.error("Error reproduciendo el sonido del botón:", error);
        }
    } else if (!isSoundLoaded) {
        console.warn("El sonido del botón no está cargado.");
    }
};

export const unloadButtonSound = async () => {
    if (buttonSound) {
        try {
            await buttonSound.unloadAsync();
            buttonSound = null;
            isSoundLoaded = false;  // Marca el sonido como no cargado
        } catch (error) {
            console.error("Error descargando el sonido del botón:", error);
        }
    } else {
        console.warn("No hay sonido del botón cargado para descargar.");
    }
};
