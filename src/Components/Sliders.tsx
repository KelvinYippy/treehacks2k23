import { ColorDisplay } from "./ColorDisplay"

interface SlidersProps {
    r: number
    g: number
    b: number
    red: string
    yellow: string
    blue: string
    handleChange: (property: any, value: string) => void
}

export const Sliders = ({r, g, b, red, yellow, blue, handleChange}: SlidersProps) => {

    return (
        <>
            <div style={{ paddingTop: '1rem' }}>
                <ColorDisplay backgroundColor={`rgb(${r}, ${g}, ${b})`}/>
            </div>
            <div style={{ paddingTop: '1rem', fontWeight: 'bold' }}>
                Now, adjust the scales to what you think is the correct RYB value for its <i>complement</i>!
            </div>
            <input type="range" value={red} min="0" max="255" onChange={(e) => handleChange("red", e.target.value)}/>
            <input type="range" value={yellow} min="0" max="255" onChange={(e) => handleChange("yellow", e.target.value)}/>
            <input type="range" value={blue} min="0" max="255" onChange={(e) => handleChange("blue", e.target.value)}/>
        </>
    )
    
}