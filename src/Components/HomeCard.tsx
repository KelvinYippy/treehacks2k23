import './HomeCard.css'

interface HomeCardProps {
    text: string
    subtext: string
    handleClick: () => void
    className: string
}

export const HomeCard = ({text, handleClick, className, subtext}: HomeCardProps) => {

    return (
        <div onClick={handleClick} className={`home-card-${className}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <div className={`square-${className}`}></div>
            <div style={{ fontSize: '36px' }}>{text}</div>
            <div className='subtext'>{subtext}</div>
        </div>
    )

}