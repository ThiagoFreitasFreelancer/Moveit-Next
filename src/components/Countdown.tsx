import { useContext} from 'react';
import { countdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';


export function Countdown(){

    const { minutos, segundos, hasFinished, isActive, resetCouwntdown, startCouwntdown } = useContext(countdownContext);

    const [minutosLeft, minutosRight] = String(minutos).padStart(2, '0').split('');
    const [segundosLeft, segundosRight] = String(segundos).padStart(2, '0').split('');

    
    return(

        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minutosLeft}</span>
                    <span>{minutosRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{segundosLeft}</span>
                    <span>{segundosRight}</span>
                </div>
            </div>

            { hasFinished ?
            
                <button
                    disabled
                    className={styles.countdouwnButton}
                >
                    Ciclo encerrado                
                </button>
            : 
            <> 
                { isActive ? 
                    (
                        <button 
                            type="button" 
                            className={`${styles.countdouwnButton} ${styles.countdouwnButtonActive}`}
                            onClick={resetCouwntdown}
                        >
                            Abandonar Ciclo                
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className={styles.countdouwnButton}
                            onClick={startCouwntdown}
                        >
                            Iniciar ciclo                
                        </button>
                    )
                } 
            </>
            }

                    
         
        </div>

    );
}