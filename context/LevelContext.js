import React, {createContext, useState, useContext} from "react";

const LevelContext = createContext();

export const LevelProvider = ({ children }) => {
    const [levels, setLevels] = useState ([
        {id: 1, unlocked: true},
        {id: 2, unlocked: false},
        {id: 3, unlocked: false},
        {id: 4, unlocked: false},
        {id: 5, unlocked: false},
    ]);

    const unlockNextLevel = (currentLevelId) => {
        const nextLevelIndex = levels.findIndex(level => level.id === currentLevelId) + 1;

        if (nextLevelIndex < levels.length) {
            const updateLevels = [...levels];
            updateLevels[nextLevelIndex].unlocked = true;
            setLevels(updateLevels);
        }
    };

    return (
        <LevelContext.Provider value={{levels, unlockNextLevel}}>
            {children}
        </LevelContext.Provider>
    );
};

export const useLevels = () => useContext(LevelContext);