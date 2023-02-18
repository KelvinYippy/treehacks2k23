import { ComplementaryQuestionCard } from "../components/ComplementaryQuestionCard"
import { PrimarySecondaryTertiaryQuestionCard } from "../components/PrimarySecondaryTertiaryQuestionCard"
import { useMultiState } from "../hooks/useMultiState"
import { TriadicQuestionCard } from "../components/TriadicQuestionCard"

export const ColorOnColorPage = () => {
    
    const initialColorOnColorPageState = {
        questionsCorrect: 0,
        questionsAnswered: 0,
        questionChosen: Math.floor(Math.random() * 3)
    }

    const { componentState, handleMultipleChange } = useMultiState(initialColorOnColorPageState)

    const handleCorrectAnswer = () => {
        handleMultipleChange({
            "questionsAnswered": componentState.questionsAnswered + 1,
            "questionsCorrect": componentState.questionsCorrect + 1,
            questionChosen: Math.floor(Math.random() * 3)
        })
    }

    const handleAnswer = () => {
        handleMultipleChange({
            "questionsAnswered": componentState.questionsAnswered + 1,
            "questionsCorrect": componentState.questionsCorrect,
            questionChosen: Math.floor(Math.random() * 3)
        })
    }

    return (
        <div>
            <div style={{ textAlign: 'center', paddingTop: '1rem', fontWeight: 'bold' }}>
                Color On Color
            </div>
            <div style={{ textAlign: 'center', paddingTop: '1rem', fontWeight: 'bold' }}>
                {componentState.questionsCorrect} / {componentState.questionsAnswered}
            </div>
            {
                componentState.questionChosen === 0 &&
                <PrimarySecondaryTertiaryQuestionCard 
                    handleCorrect={handleCorrectAnswer} 
                    handleAnswer={handleAnswer}
                />
            }
            {
                componentState.questionChosen === 1 &&
                <ComplementaryQuestionCard 
                    handleCorrect={handleCorrectAnswer} 
                    handleAnswer={handleAnswer}
                />
            }
            {
                componentState.questionChosen === 2 &&
                <TriadicQuestionCard 
                    handleCorrect={handleCorrectAnswer} 
                    handleAnswer={handleAnswer}
                />
            }
        </div>
    )

}