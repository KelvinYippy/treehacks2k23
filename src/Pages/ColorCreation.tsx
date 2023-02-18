import { ColorDisplay } from "../Components/ColorDisplay"
import { ColorPageProps, Page } from "../utils/types"
import { generateRandomRGBColor, getRGBComponents } from "../utils/utils"
import backArrow from '../assets/backArrow.svg'
import { useMultiState } from "../hooks/useMultiState"
import { useEffect } from "react"

export const ColorCreationPage = ({setLevel}: ColorPageProps) => {

    const initialColorCreationPageState = {
        red: "0",
        yellow: "0",
        blue: "0",
        randomColor: undefined as number | undefined,
        r: -1,
        g: -1,
        b: -1,
        ryb: "",
        correctQuestions: 0
    }

    const { componentState, handleIndividualChange, handleMultipleChange } = useMultiState(initialColorCreationPageState)

    const handleChange = async (property: keyof typeof initialColorCreationPageState, value: string) => {
        handleIndividualChange(property, value)
        const hashmap: Record<string, number> = {
            red: Number(componentState.red),
            yellow: Number(componentState.yellow),
            blue: Number(componentState.blue)
        }
        hashmap[property] = Number(value)
        console.log(`${hashmap.red}, ${hashmap.yellow}, ${hashmap.blue}`, componentState.ryb)
        if (`${hashmap.red}, ${hashmap.yellow}, ${hashmap.blue}` === componentState.ryb) {
            handleIndividualChange("correctQuestions", componentState.correctQuestions + 1)
        }
    }

    useEffect(() => {
        const fetchCorrectRYBCode = async () => {
            const ryb_value = await (await fetch(`http://127.0.0.1:8000/ryb/${componentState.r}/${componentState.g}/${componentState.b}`)).json()
            handleIndividualChange("ryb", ryb_value)
        }
        if (componentState.randomColor) {
            fetchCorrectRYBCode()
        }
    }, [componentState.randomColor])

    useEffect(() => {
        const randomColor = generateRandomRGBColor()
        handleMultipleChange({
            randomColor: randomColor,
            r: getRGBComponents(randomColor).r,
            g: getRGBComponents(randomColor).g,
            b: getRGBComponents(randomColor).b,
            red: "0",
            yellow: "0",
            blue: "0",
        })
    }, [componentState.correctQuestions])

    return (
        <div>
            <img 
                src={backArrow} 
                alt="Back Arrow" 
                onClick={() => setLevel(Page.HOME)}
                style={{ cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem' }}>
            <div style={{ textAlign: 'center', paddingTop: '1rem', fontWeight: 'bold' }}>
                Color Creation
            </div>
            <div style={{ paddingTop: '1rem', fontWeight: 'bold' }}>
                Number Answered Correctly: {componentState.correctQuestions}
            </div>
            <div style={{ paddingTop: '1rem' }}>
                <ColorDisplay backgroundColor={`rgb(${componentState.r}, ${componentState.g}, ${componentState.b})`}/>
            </div>
            <div style={{ paddingTop: '1rem', fontWeight: 'bold' }}>
                Now, adjust the scales to what you think is the correct RYB value!
            </div>
            <input type="range" defaultValue={componentState.red} value={componentState.red} min="0" max="255" onChange={(e) => handleChange("red", e.target.value)}/>
            <p>{componentState.red}</p>
            <input type="range" defaultValue={componentState.yellow} value={componentState.yellow} min="0" max="255" onChange={(e) => handleChange("yellow", e.target.value)}/>
            <p>{componentState.yellow}</p>
            <input type="range" defaultValue={componentState.blue} value={componentState.blue} min="0" max="255" onChange={(e) => handleChange("blue", e.target.value)}/>
            <p>{componentState.blue}</p>
        </div>
        </div>
    )

}