import { useEffect } from "react"
import { useMultiState } from "../hooks/useMultiState"
import { QuestionCardProps } from "../utils/types"
import { generateRandomRGBColor, getRGBComponents, getRGBNumber, getTriadicColor, isEqual } from "../utils/utils"
import { ColorDisplay } from "./ColorDisplay"
import './PSTQC.css'

export const TriadicQuestionCard = ({handleCorrect, handleAnswer, timeRemaining, setTimeRemaining}: QuestionCardProps) => {

    const initialTriadicQuestionCardState = {
        randomColorOne: -1,
        r1: -1,
        g1: -1,
        b1: -1,
        randomFactorOne: -1, 
        randomColorTwo: -1,
        r2: -1,
        g2: -1,
        b2: -1,
        randomFactorTwo: -1,
        randomColorThree: -1,
        r3: -1,
        g3: -1,
        b3: -1
    }

    const { componentState, handleMultipleChange } = useMultiState(initialTriadicQuestionCardState)

    const reset = () => {
        const randomColorOne = generateRandomRGBColor()
        const { r: r1, g: g1, b: b1 } = getRGBComponents(randomColorOne)
        const randomFactorOne = Math.floor(Math.random() * 10)
        const randomColorTwo = randomFactorOne < 5 ? getRGBNumber(getTriadicColor({r: r1, g: g1, b: b1})) : generateRandomRGBColor() 
        const { r: r2, g: g2, b: b2 } = getRGBComponents(randomColorTwo)
        const randomFactorTwo = Math.floor(Math.random() * 10)
        const randomColorThree = randomFactorTwo < 5 ? getRGBNumber(getTriadicColor({r: r2, g: g2, b: b2})) : generateRandomRGBColor() 
        const { r: r3, g: g3, b: b3 } = getRGBComponents(randomColorThree)
        handleMultipleChange({
            randomColorOne: randomColorOne,
            r1: r1,
            g1: g1,
            b1: b1,
            randomFactorOne: randomFactorOne,
            randomColorTwo: randomColorTwo,
            r2: r2,
            g2: g2,
            b2: b2,
            randomFactorTwo: randomFactorTwo,
            randomColorThree: randomColorThree,
            r3: r3,
            g3: g3,
            b3: b3
        })
    }

    const handleSubmission = (isTriadic: boolean) => {
        const hashmap_one: Record<number, number> = Object.create(null)
        const hashmap_two: Record<number, number> = Object.create(null)
        const hashmap_three: Record<number, number> = Object.create(null)
        const object_one_values = [componentState.r1, componentState.g1, componentState.b1]
        const object_two_values = [componentState.r2, componentState.g2, componentState.b2]
        const object_three_values = [componentState.r3, componentState.g3, componentState.b3]
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
                <ColorDisplay backgroundColor={`rgb(${componentState.r1}, ${componentState.g1}, ${componentState.b1})`}/>
                <div style={{ marginLeft: '1.5rem', marginRight: '1.5rem' }}>
                    <ColorDisplay backgroundColor={`rgb(${componentState.r2}, ${componentState.g2}, ${componentState.b2})`}/>
                </div>
                <ColorDisplay backgroundColor={`rgb(${componentState.r3}, ${componentState.g3}, ${componentState.b3})`}/>
            </div>
            <div style={{ paddingTop: '1rem', display: 'flex' }}>
                <div className="pst-button" style={{ marginRight: '1.5rem' }} onClick={() => handleSubmission(true)}>Triadic</div>
                <div className="pst-button" style={{ marginLeft: '1.5rem' }} onClick={() => handleSubmission(false)}>Not Triadic</div>
            </div>
        </div>

    )
        
}