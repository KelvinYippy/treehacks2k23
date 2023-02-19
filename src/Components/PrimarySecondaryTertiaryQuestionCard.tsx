import { useEffect, useState } from "react"
import { hexCombo, primarySecondaryTertiary } from "../utils/colors"
import { QuestionCardProps } from "../utils/types"
import { ColorDisplay } from "./ColorDisplay"
import './PSTQC.css'

export const PrimarySecondaryTertiaryQuestionCard = ({handleCorrect, handleAnswer, timeRemaining, setTimeRemaining}: QuestionCardProps) => {

    const [randomColor, setRandomColor] = useState("")

    const handleSubmission = (type: "primary" | "secondary" | "tertiary") => {
        if (primarySecondaryTertiary[type].has(randomColor)) {
            handleCorrect()
        } else {
            handleAnswer()
        }
        reset()
    } 

    const reset = () => setRandomColor(hexCombo[Math.floor(Math.random() * 12)])

    useEffect(() => {
        reset()
    }, [])

    useEffect(() => {
        if (timeRemaining === 0) {
            handleAnswer()
            reset()
            return
        }
        const timer = timeRemaining > 0 && setInterval(() => setTimeRemaining(timeRemaining - 1), 1000);
        return () => clearInterval(timer as NodeJS.Timer);
    }, [timeRemaining]);

    return (
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem' }}>
            <ColorDisplay backgroundColor={randomColor}/>
            <div style={{ paddingTop: '1rem', display: 'flex' }}>
                <div className="pst-button" onClick={() => handleSubmission("primary")}>Primary</div>
                <div className="pst-button" onClick={() => handleSubmission("secondary")} style={{ marginLeft: '1rem', marginRight: '1rem' }}>Secondary</div>
                <div className="pst-button" onClick={() => handleSubmission("tertiary")}>Tertiary</div>
            </div>
        </div>

    )
        
}