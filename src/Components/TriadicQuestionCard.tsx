import { QuestionCardProps } from "../utils/types"
import { generateRandomRGBColor, getRGBComponents, getRGBNumber, getTriadicColor, isEqual } from "../utils/utils"
import { ColorDisplay } from "./ColorDisplay"

export const TriadicQuestionCard = ({handleCorrect, handleAnswer}: QuestionCardProps) => {

    const randomColorOne = generateRandomRGBColor()
    const { r: r1, g: g1, b: b1 } = getRGBComponents(randomColorOne)
    const randomFactorOne = Math.floor(Math.random() * 10)
    const randomColorTwo = randomFactorOne < 5 ? getRGBNumber(getTriadicColor({r: r1, g: g1, b: b1})) : generateRandomRGBColor() 
    const { r: r2, g: g2, b: b2 } = getRGBComponents(randomColorTwo)
    const randomFactorTwo = Math.floor(Math.random() * 10)
    const randomColorThree = randomFactorTwo < 5 ? getRGBNumber(getTriadicColor({r: r2, g: g2, b: b2})) : generateRandomRGBColor() 
    const { r: r3, g: g3, b: b3 } = getRGBComponents(randomColorThree)

    const handleSubmission = (isTriadic: boolean) => {
        const hashmap_one: Record<number, number> = Object.create(null)
        const hashmap_two: Record<number, number> = Object.create(null)
        const hashmap_three: Record<number, number> = Object.create(null)
        const object_one_values = [r1, g1, b1]
        const object_two_values = [r2, g2, b2]
        const object_three_values = [r3, g3, b3]
        object_one_values.forEach((value) => {
            if (!(value in hashmap_one)) {
                hashmap_one[value] = 0
            }
            hashmap_one[value] += 1
        })
        object_two_values.forEach((value) => {
            if (!(value in hashmap_two)) {
                hashmap_two[value] = 0
            }
            hashmap_two[value] += 1
        })
        object_three_values.forEach((value) => {
            if (!(value in hashmap_three)) {
                hashmap_three[value] = 0
            }
            hashmap_three[value] += 1
        })
        const areColorsTriadic = isEqual(hashmap_one, hashmap_two) && isEqual(hashmap_two, hashmap_three)
        if (areColorsTriadic === isTriadic) {
            handleCorrect()
        } else {
            handleAnswer()
        }
    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem' }}>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
                <ColorDisplay backgroundColor={`rgb(${r1}, ${g1}, ${b1})`}/>
                <ColorDisplay backgroundColor={`rgb(${r2}, ${g2}, ${b2})`}/>
                <ColorDisplay backgroundColor={`rgb(${r3}, ${g3}, ${b3})`}/>
            </div>
            <div style={{ paddingTop: '1rem' }}>
                <button onClick={() => handleSubmission(true)}>Triadic</button>
                <button onClick={() => handleSubmission(false)}>Not Triadic</button>
            </div>
        </div>

    )
        
}