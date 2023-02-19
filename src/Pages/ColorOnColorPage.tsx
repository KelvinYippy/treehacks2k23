import { ComplementaryQuestionCard } from "../components/ComplementaryQuestionCard"
import { PrimarySecondaryTertiaryQuestionCard } from "../components/PrimarySecondaryTertiaryQuestionCard"
import { useMultiState } from "../hooks/useMultiState"
import { TriadicQuestionCard } from "../components/TriadicQuestionCard"
import { useEffect } from "react"
import './ColorOnCardPage.css'

export const ColorOnColorPage = () => {
    
    const initialColorOnColorPageState = {
        questionsCorrect: 0,
        questionsAnswered: 0,
        questionChosen: -1,
        choosingStage: true,
        randomFactor: 3,
        timeLimit: 0,
        timeRemaining: 0,
    }

    const { componentState, handleIndividualChange, handleMultipleChange } = useMultiState(initialColorOnColorPageState)

    const handleAnswerHelper = (correct: number) => {
        handleMultipleChange({
            "questionsAnswered": componentState.questionsAnswered + 1,
            "questionsCorrect": correct,
            "questionChosen": Math.floor(Math.random() * componentState.randomFactor),
            "timeRemaining": componentState.timeLimit
        })
    }

    const handleCorrectAnswer = () => {
        handleAnswerHelper(componentState.questionsCorrect + 1)
    }

    const handleAnswer = () => {
        handleAnswerHelper(componentState.questionsCorrect)
    }

    useEffect(() => {
        if (!componentState.choosingStage) {
            handleMultipleChange({
                questionChosen: Math.floor(Math.random() * componentState.randomFactor),
                timeRemaining: componentState.timeLimit
            })
        }
    }, [componentState.choosingStage])

    // useEffect(() => {
    //     if (!componentState.choosingStage) {
    //         const timer = componentState.timeRemaining > 0 && setInterval(() => handleIndividualChange("timeRemaining", componentState.timeRemaining - 1), 1000);
    //         return () => clearInterval(timer as NodeJS.Timer);
    //     }
    // }, [componentState.timeRemaining]);
    

    return (
        <div>
            {
                componentState.choosingStage ? 
                <div style={{ textAlign: 'center', paddingTop: '1rem', fontWeight: 'bold', fontSize: '6rem' }}>
                    Color Relations
                </div> :
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div style={{ color: componentState.timeLimit === 0 ? "white" : "inherit", fontSize: '1.5rem', textAlign: 'center', paddingTop: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            componentState.timeRemaining
                        }
                    </div>
                    <div style={{ textAlign: 'center', paddingTop: '1rem', fontWeight: 'bold', fontSize: '2.25rem' }}>
                        Color Relations
                    </div> 
                    <div style={{ fontSize: '1.5rem', textAlign: 'center', paddingTop: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {componentState.questionsCorrect} / {componentState.questionsAnswered}
                    </div>
                </div>
            }
            {
                componentState.choosingStage &&
                <div style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center' }}>Maximum Number of Colors</div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
                        <div className={`question-option-button ${componentState.randomFactor === 1 ? 'question-selected' : ''}`} onClick={() => handleIndividualChange("randomFactor", 1)}>1</div>
                        <div className={`question-option-button ${componentState.randomFactor === 2 ? 'question-selected' : ''}`} onClick={() => handleIndividualChange("randomFactor", 2)} style={{ marginLeft: '1rem', marginRight: '1rem' }}>2</div>
                        <div className={`question-option-button ${componentState.randomFactor === 3 ? 'question-selected' : ''}`} onClick={() => handleIndividualChange("randomFactor", 3)}>3</div>
                    </div>
                    <div style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center' }}>Timer</div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
                        <div className={`time-option-button ${componentState.timeLimit === 0 ? 'time-selected' : ''}`} onClick={() => handleIndividualChange("timeLimit", 0)}>None</div>
                        <div className={`time-option-button ${componentState.timeLimit === 10 ? 'time-selected' : ''}`} onClick={() => handleIndividualChange("timeLimit", 10)} style={{ marginLeft: '1rem', marginRight: '0.5rem' }}>10s</div>
                        <div className={`time-option-button ${componentState.timeLimit === 30 ? 'time-selected' : ''}`} onClick={() => handleIndividualChange("timeLimit", 30)} style={{ marginLeft: '0/.5rem', marginRight: '1rem' }}>30s</div>
                        <div className={`time-option-button ${componentState.timeLimit === 60 ? 'time-selected' : ''}`} onClick={() => handleIndividualChange("timeLimit", 60)}>60s</div>
                    </div>
                    <div
                        className="begin-button"
                        onClick={() => handleIndividualChange("choosingStage", false)}
                    >
                        Let's Begin!
                    </div>
                </div>
            }
            {
                componentState.questionChosen === 0 &&
                <PrimarySecondaryTertiaryQuestionCard 
                    handleCorrect={handleCorrectAnswer} 
                    handleAnswer={handleAnswer}
                    timeRemaining={componentState.timeRemaining}
                    setTimeRemaining={(timeRemaining: number) => handleIndividualChange("timeRemaining", timeRemaining)}
                />
            }
            {
                componentState.questionChosen === 1 &&
                <ComplementaryQuestionCard 
                    handleCorrect={handleCorrectAnswer} 
                    handleAnswer={handleAnswer}
                    timeRemaining={componentState.timeRemaining}
                    setTimeRemaining={(timeRemaining: number) => handleIndividualChange("timeRemaining", timeRemaining)}
                />
            }
            {
                componentState.questionChosen === 2 &&
                <TriadicQuestionCard 
                    handleCorrect={handleCorrectAnswer} 
                    handleAnswer={handleAnswer}
                    timeRemaining={componentState.timeRemaining}
                    setTimeRemaining={(timeRemaining: number) => handleIndividualChange("timeRemaining", timeRemaining)}
                />
            }
        </div>
    )

}