import { hexCombo, primarySecondaryTertiary } from "../utils/colors"
import { QuestionCardProps } from "../utils/types"
import { ColorDisplay } from "./ColorDisplay"

export const PrimarySecondaryTertiaryQuestionCard = ({handleCorrect, handleAnswer}: QuestionCardProps) => {

    const randomColor = hexCombo[Math.floor(Math.random() * 12)]

    const handleSubmission = (type: "primary" | "secondary" | "tertiary") => {
        if (primarySecondaryTertiary[type].has(randomColor)) {
            handleCorrect()
        } else {
            handleAnswer()
        }
    } 

    return (
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem' }}>
            <ColorDisplay backgroundColor={randomColor}/>
            <div style={{ paddingTop: '1rem' }}>
                <button onClick={() => handleSubmission("primary")}>Primary</button>
                <button onClick={() => handleSubmission("secondary")}>Secondary</button>
                <button onClick={() => handleSubmission("tertiary")}>Tertiary</button>
            </div>
        </div>

    )
        
}