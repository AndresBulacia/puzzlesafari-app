import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ImageBackground, PanResponder, Animated } from "react-native";
import { useLevels } from "../context/LevelContext";
import levelsData from '../assets/data/levels.json';
import imageResolver from "../utils/imageResolver";
import { ResizeMode } from "react-native-video";
import * as Animatable from "react-native-animatable";
import ConfettiCannon from "react-native-confetti-cannon";

export default function GameScreen({route, navigation}) {
    const [timeLeft, setTimeLeft] = useState(500); //Temporizador
    const [puzzleCompleted, setPuzzleCompleted] = useState(false); //Estado del juego
    const [showResult, setShowResult] = useState(false); //Mostrar el resultado
    const [isPaused, setIsPaused] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const {levelId} = route.params;
    const {unlockNextLevel} = useLevels();

    // Obtener los datos del nivel actual
    const levelData = levelsData.find((level) => level.id === levelId);
    
    // Posiciones iniciales y objetivo de las piezas
    const initialPosition = [
        { x: 120, y: 120 },
        { x: 20, y: 120 },
        { x: 120, y: 20 },
        { x: 20, y: 20 },
    ];
    const [positions, setPositions] = useState(initialPosition);

    const targetPositions = [
        { x: -14, y: -15 },
        { x: 173, y: -15 },
        { x: -14, y: 194 },
        { x: 173, y: 194 },
    ];
    const snapThreshold = 20;

    const shufflePositions = (positionsArray) => {
        return[...positionsArray].sort(() => Math.random() - 0.5);
    }


    useEffect(() => {
        if (timeLeft > 0 && !puzzleCompleted && !isPaused) {
            const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timerId);
        }else if (timeLeft === 0 && !puzzleCompleted) {
            setShowResult(true);
        }
    }, [timeLeft, puzzleCompleted, isPaused]);

    useEffect(() => {
        const isPuzzleComplete = positions.every((pos, index) =>{
            const target = targetPositions[index];
            return(
                Math.abs(pos.x - target.x) < snapThreshold &&
                Math.abs(pos.y - target.y) < snapThreshold
            );
        });
        if(isPuzzleComplete) {
            const timer = setTimeout(() => {
                setShowResult(true);
                setShowConfetti(true);
                setPuzzleCompleted(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [positions]);

    const handleRetry = () => {
        setTimeLeft(60);
        setPuzzleCompleted(false);
        setShowResult(false);
        setPositions(shufflePositions(initialPosition));
        setIsPaused(false);
    };

    const handleLevelComplete = () => {
        unlockNextLevel(levelId);
        navigation.navigate('LevelSelectionScreen');
    };

    const panResponders = positions.map((pos, index) =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gesture) => {
                const newPos = {x: pos.x + gesture.dx, y: pos.y + gesture.dy};
                setPositions((prevPositions) =>
                    prevPositions.map((p, i) => (i === index ? newPos : p))
                );
            },
            onPanResponderRelease: () => {
                const target = targetPositions[index];
                const newPos = {
                    x: Math.abs(pos.x - target.x) < snapThreshold ? target.x : pos.x,
                    y: Math.abs(pos.y - target.y) < snapThreshold ? target.y : pos.y,
                };
                setPositions((prevPositions) =>
                prevPositions.map((p, i) => (i === index ? newPos : p))
                );
            },
        })
    );

    const images = levelData.pieces.map((piece) => imageResolver(piece.image));
    const completeImage = imageResolver(levelData.pieces[0].image.replace("-piece-1", "-completo"));

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={styles.container}
        >
            <View style={styles.container}>
                <Text style={styles.levelTitle}>Nivel - {levelId}</Text>
                <Text style={styles.timerText}>Tiempo restante: {timeLeft} segundos</Text>
                <View style={styles.puzzleContainer}>
                    {positions.map((pos, index) =>(
                        <View
                            key={index}
                            style={[
                                styles.piece,
                                {
                                    left: pos.x,
                                    top: pos.y,
                                },
                            ]}
                            {...panResponders[index].panHandlers}
                        >
                            <Image
                                source={images[index]}
                                style={styles.image}
                                resizeMode="contain"
                            />
                            <Text style={styles.coordinateText}>
                                x: {pos.x.toFixed(0)}, y: {pos.y.toFixed(0)}
                            </Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity 
                    style={styles.pauseButton}
                    onPress={() => setIsPaused(true)}
                >
                    <Text style={styles.buttonText}>||</Text>
                </TouchableOpacity>

                <Modal visible={showResult} transparent={true} animationType="fade">
                    <View style={styles.modalContainer}>
                            {showConfetti && (
                                <ConfettiCannon
                                    count={50} // Número de partículas
                                    origin={{ x: 200, y: 0 }} // Origen del confeti
                                    fadeOut={true} // Desaparición gradual
                                />
                            )}
                            <Animatable.View
                                animation="zoomIn" // Tipo de animación
                                duration={800} // Duración de la animación
                                style={styles.modalContent}
                                onAnimationEnd={() => setShowConfetti(true)} // Activar confeti al finalizar la animación
                            >
                        
                            {puzzleCompleted ? (
                                <>
                                    <Text style={styles.modalTitle}>¡Felicidades!</Text>
                                    <Text style={styles.modalText}>{levelData.name}</Text>
                                    <Text style={styles.modalText}>{levelData["name-eng"]} (Inglés)</Text>
                                    <Image
                                        style={styles.modalCompleteImage}
                                        source={completeImage}
                                        resizeMode="contain"
                                        />
                                    <TouchableOpacity
                                        style={styles.retryButton}
                                        onPress={handleLevelComplete}
                                        >
                                        <Text style={styles.buttonText}>Siguiente Nivel</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <Text style={styles.modalTitle}>¡Se acabó el tiempo!</Text>
                            )}
                            <TouchableOpacity
                                style={styles.retryButton}
                                onPress={puzzleCompleted ? () => navigation.navigate('HomeScreen') : handleRetry}
                            >
                                <Text style={styles.buttonText}>
                                    {puzzleCompleted ? "Volver al Menú" : "Reiniciar"}
                                </Text>
                            </TouchableOpacity>
      
                            </Animatable.View>
                    </View>
                </Modal>

                <Modal visible={isPaused} transparent={true} animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Juego en pausa</Text>
                            <TouchableOpacity style={styles.retryButton} onPress={() => setIsPaused(false)}>
                                <Text style={styles.buttonText}>Reanundar</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.retryButton} onPress={() => navigation.navigate('HomeScreen')}>
                                <Text style={styles.buttonText}>Volver al Menú</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        resizeMode: 'cover',
    },
    levelTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    timerText: {
        fontSize: 18,
        color: '#333',
    },
    puzzleContainer: {
        width: 340,
        height: 400,
        backgroundColor: "#ccc",
        borderRadius: 10,
        overflow: 'hidden',
        position: "relative",
    },
    piece:{
        position: "absolute",
        width: '55%',
        height: '55%',
    },
    image: {
        width: "100%",
        height: "100%",
    },
    pauseButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 40,
        height: 40,
        backgroundColor: '#FFD700',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#FFF',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#FFBC47',
    },
    modalCompleteImage:{
        width: '70%',
        height: '50%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ffffff',
    },
    modalText: {
        fontSize: 18,
        color: "#333",
        marginVertical: 5,
    },
    retryButton: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#FFD700',
        borderRadius: 10,
        width: '60%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    coordinateText: {
        position: 'absolute',
        top: 5,    // Coloca el texto en la parte superior de la pieza
        left: 5,   // Coloca el texto en la parte izquierda de la pieza
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 2,
        borderRadius: 5,
    }
});