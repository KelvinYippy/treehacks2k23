interface ColorDisplayProps {
    backgroundColor: string
}

export const ColorDisplay = ({backgroundColor}: ColorDisplayProps) => {

    return (
        <div style={{ backgroundColor: backgroundColor, height: '100px', width: '100px', borderRadius: '50%' }}></div>
    )

}