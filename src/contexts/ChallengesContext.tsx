import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface Challenge{
    type: 'body'|'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData{
    startNewChallenge: () => void;
    level: number;
    LevelUp: () => void;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenge: () => void;
}

interface ChallengeProviderProps{
    children: ReactNode
}

export const challengesContext = createContext({} as ChallengesContextData);

export function ChallengeProvider({ children }: ChallengeProviderProps){

    const [level, setLevel] = useState(1);
    const [currentExperience, setCorrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function LevelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge(){
        const randomChallengeIdex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIdex];

        setActiveChallenge(challenge);
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if( finalExperience >= experienceToNextLevel ){
            finalExperience = finalExperience - experienceToNextLevel;
            LevelUp();
        }

        setCorrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return(
        <challengesContext.Provider value={{
            startNewChallenge,
            level,
            LevelUp,
            currentExperience,
            challengesCompleted,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge
        }}
        >
            {children}

        </challengesContext.Provider>
    )
}
