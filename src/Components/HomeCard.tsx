import './HomeCard.css'

interface HomeCardProps {
    text: string
    handleClick: () => void
}

export const HomeCard = ({text, handleClick}: HomeCardProps) => {

    return (
        <div onClick={handleClick} className="home-card">
            {text}
        </div>
    )

}