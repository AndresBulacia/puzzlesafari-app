import React, { useEffect, useRef } from "react";
import { Audio } from "expo-av";

const BackgroundMusic = ({isMusicEnabled}) => {
    const sound = useRef(null);

    useEffect(() => {
        const playMusic = async () => {
            if (isMusicEnabled) {
                if (!sound.current) {
                    sound.current = new Audio.Sound();
                    await sound.current.loadAsync(require('../assets/sounds/background_music.mp3'));
                    await sound.current.setIsLoopingAsync(true);
                    await sound.current.playAsync();
                } else {
                    await sound.current.playAsync();
                }
            }else if (sound.current) {
                await sound.current.stopAsync();
            }
        };

        playMusic();

        return () => {
            if (sound.current) {
                sound.current.unloadAsync();
                sound.current = null;
            }
        };
    }, [isMusicEnabled]);

    return null;
};

export default BackgroundMusic;