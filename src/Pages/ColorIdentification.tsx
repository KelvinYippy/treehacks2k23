import { useEffect } from 'react'
import { ColorDisplay } from '../components/ColorDisplay'
import { useMultiState } from '../hooks/useMultiState'
import { generateRandomRGBColor, getComplementColor, getRGBComponents, getRGBNumber } from '../utils/utils'

export const ColorIdentificationPage = () => {

    const initialColorIdentificationPageState = {
        randomColor: undefined as number | undefined,
        r: -1,
        g: -1,
        b: -1,
        correctQuestions: 0,
        red: "0",
        yellow: "0",
        blue: "0",
        ryb: ""
    }

    const { componentState, handleIndividualChange, handleMultipleChange } = useMultiState(initialColorIdentificationPageState)

    useEffect(() => {
        const getComplement = async () => {
            const rgb_number = getRGBNumber({r: componentState.r, g: componentState.g, b: componentState.b})
            const rgb_complement = getComplementColor(rgb_number)
            const rgb_complement_components = getRGBComponents(rgb_complement)
            const ryb_value = await (await fetch(`http://127.0.0.1:8000/ryb/${rgb_complement_components.r}/${rgb_complement_components.g}/${rgb_complement_components.b}`)).json()
            handleIndividualChange("ryb", ryb_value)
        }
        if (componentState.randomColor) {
            getComplement()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [componentState.correctQuestions])

    const handleChange = async (property: keyof typeof initialColorIdentificationPageState, value: string) => {
        handleIndividualChange(property, value)
        const hashmap: Record<string, number> = {
            red: Number(componentState.red),
            yellow: Number(componentState.yellow),
            blue: Number(componentState.blue)
        }
        hashmap[property] = Number(value)
        if (`${hashmap.red}, ${hashmap.yellow}, ${hashmap.blue}` === componentState.ryb) {
            handleIndividualChange("correctQuestions", componentState.correctQuestions + 1)
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem' }}>
            <div style={{ textAlign: 'center', paddingTop: '1rem', fontWeight: 'bold', fontSize: '2.25rem' }}>
                Fill In The Color
            </div>
            <div style={{ paddingTop: '1rem', fontWeight: 'bold' }}>
                Number Answered Correctly: {componentState.correctQuestions}
            </div>
            <div style={{ paddingTop: '1rem' }}>
                <ColorDisplay backgroundColor={`rgb(${componentState.r}, ${componentState.g}, ${componentState.b})`}/>
            </div>
            <div style={{ paddingTop: '1rem', fontWeight: 'bold' }}>
                Now, adjust the scales to what you think is the correct RYB value for its <i>complement</i>!
            </div>
            <input type="range" defaultValue={componentState.red} value={componentState.red} min="0" max="255" onChange={(e) => handleChange("red", e.target.value)}/>
            <input type="range" defaultValue={componentState.yellow} value={componentState.yellow} min="0" max="255" onChange={(e) => handleChange("yellow", e.target.value)}/>
            <input type="range" defaultValue={componentState.blue} value={componentState.blue} min="0" max="255" onChange={(e) => handleChange("blue", e.target.value)}/>
        </div>
        </div>
    )

}