import { useEffect } from "react"
import { useMultiState } from "../hooks/useMultiState"
import { QuestionCardProps } from "../utils/types"
import { generateRandomRGBColor, getComplementColor, getRGBComponents } from "../utils/utils"
import { ColorDisplay } from "./ColorDisplay"
import './PSTQC.css'

export const ComplementaryQuestionCard = ({handleCorrect, handleAnswer, timeRemaining, setTimeRemaining}: QuestionCardProps) => {

    const initialComplementaryQuestionCardState = {
        randomColorOne: -1, 
        r1: -1,
        g1: -1,
        b1: -1,
        randomColorTwo: -1,
        r2: -1,
        g2: -1,
        b2: -1
    }

    const { componentState, handleMultipleChange } = useMultiState(initialComplementaryQuestionCardState)

    const reset = () => {
        const randomColorOne = generateRandomRGBColor()
        const { r: r1, g: g1, b: b1 } = getRGBComponents(randomColorOne)
        const randomFactor = Math.floor(Math.random() * 10)
        const randomColorTwo = randomFactor <= 4 ? getComplementColor(randomColorOne) : generateRandomRGBColor() 
        const { r: r2, g: g2, b: b2 } = getRGBComponents(randomColorTwo)
        handleMultipleChange({
            randomColorOne: randomColorOne,
            randomColorTwo: randomColorTwo,
            r1: r1,
            r2: r2,
            g1: g1,
            g2: g2,
            b1: b1,
            b2: b2
        })
    }

    const handleSubmission = (isComplementary: boolean) => {
        const complementOfOne = getComplementColor(componentState.randomColorOne)
        if (complementOfOne === componentState.randomColorTwo) {
            if (isComplementary) {
                handleCorrect()
            } else {
                handleAnswer()
            }
        } else {
            if (isComplementary) {
                handleAnswer()
            } else {
                handleCorrect()
            }
        }
        reset()
    }

    useEffect(() => {
        if (timeRemaining === 0) {
            handleAnswer()
            reset()
            return
        }
        const timer = timeRemaining > 0 && setInterval(() => setTimeRemaining(timeRemaining - 1), 1000);
        return () => clearInterval(timer as NodeJS.Timer);
    }, [timeRemaining]);

    useEffect(() => {
        reset()
    }, [])

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem' }}>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
                <div style={{ marginRight: '1.5rem' }}>
                    <ColorDisplay backgroundColor={`rgb(${componentState.r1}, ${componentState.g1}, ${componentState.b1})`}/>
                </div>
                <div style={{ marginLeft: '1.5rem' }}>
                    <ColorDisplay backgroundColor={`rgb(${componentState.r2}, ${componentState.g2}, ${componentState.b2})`}/>
                </div>
            </div>
            <div style={{ paddingTop: '1rem', display: 'flex' }}>
                <div className="pst-button" onClick={() => handleSubmission(true)} style={{ marginRight: '1rem' }}>Complementary</div>
                <div className="pst-button" onClick={() => handleSubmission(false)} style={{ marginLeft: '1rem' }}>Not Complementary</div>
            </div>
        </div>

    )
        
}