import { QuestionCardProps } from "../utils/types"
import { generateRandomRGBColor, getComplementColor, getRGBComponents } from "../utils/utils"
import { ColorDisplay } from "./ColorDisplay"

export const ComplementaryQuestionCard = ({handleCorrect, handleAnswer}: QuestionCardProps) => {

    const randomColorOne = generateRandomRGBColor()
    const { r: r1, g: g1, b: b1 } = getRGBComponents(randomColorOne)
    const randomFactor = Math.floor(Math.random() * 10)
    const randomColorTwo = randomFactor <= 4 ? getComplementColor(randomColorOne) : generateRandomRGBColor() 
    const { r: r2, g: g2, b: b2 } = getRGBComponents(randomColorTwo)

    const handleSubmission = (isComplementary: boolean) => {
        const complementOfOne = getComplementColor(randomColorOne)
        if (complementOfOne === randomColorTwo) {
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
    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem' }}>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
                <ColorDisplay backgroundColor={`rgb(${r1}, ${g1}, ${b1})`}/>
                <ColorDisplay backgroundColor={`rgb(${r2}, ${g2}, ${b2})`}/>
            </div>
            <div style={{ paddingTop: '1rem' }}>
                <button onClick={() => handleSubmission(true)}>Complementary</button>
                <button onClick={() => handleSubmission(false)}>Not Complementary</button>
            </div>
        </div>

    )
        
}