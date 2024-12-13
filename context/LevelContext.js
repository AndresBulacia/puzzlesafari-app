import React, { createContext, useState, useContext } from "react";
import levelsData from '../assets/data/levels.json';

const LevelContext = createContext();

export const LevelProvider = ({children}) => {
    const [levels, setLevels] = useState (
        levelsData.map((level, index) => ({
            ...level,
            unlocked: index === 0,
        }))
    );

    const unlockNextLevel = (currentLevelId) => {
        const nextLevelIndex = levels.findIndex((level) => level.id === currentLevelId) + 1;

        if (nextLevelIndex < levels.length) {
            const updatedLevels = [...levels];
            updatedLevels[nextLevelIndex].unlocked = true;
            setLevels(updatedLevels);
        }
    };

    return (
        <LevelContext.Provider value={{levels, unlockNextLevel}}>
            {children}
        </LevelContext.Provider>
    );
};

export const useLevels = () => useContext(LevelContext);