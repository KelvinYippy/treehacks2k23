interface ColorDisplayProps {
    backgroundColor: string
}

export const ColorDisplay = ({backgroundColor}: ColorDisplayProps) => {

    return (
        <div style={{ backgroundColor: backgroundColor, height: '220px', width: '220px', borderRadius: '10px' }}></div>
    )

}