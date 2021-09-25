import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { challengesContext } from "./ChallengesContext";

interface CountdownContextData{
    time: number;
    isActive: boolean;
    hasFinished: boolean;
    minutos: number;
    segundos: number;
    startCouwntdown: () => void;
    resetCouwntdown: () => void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const countdownContext = createContext ({} as CountdownContextData); 

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps ){

    const { startNewChallenge } = useContext(challengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutos = Math.floor(time / 60);
    const segundos = time % 60;

    function startCouwntdown(){
        setIsActive(true);
    }

    function resetCouwntdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
    }

    useEffect(() =>{
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }else if( isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])
    
    return(
    <countdownContext.Provider value={{
        time,
        isActive,
        hasFinished,
        minutos,
        segundos,
        startCouwntdown,
        resetCouwntdown
    }}>

        { children }

    </countdownContext.Provider>
    )


}