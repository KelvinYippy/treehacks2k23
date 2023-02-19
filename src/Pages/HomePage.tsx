import { HomeCard } from "../components/HomeCard"
import { ColorPageProps, Page } from "../utils/types"
import './HomePage.css'

export const HomePage = ({setLevel}: ColorPageProps) => {

    return (
        <div>
            <div style={{ fontWeight: 'bold', fontSize: '6rem', textAlign: 'center' }}>Choose your Quest</div>
            <div className="home-grid">
                <HomeCard className="one" text='Color Relations' subtext="Learn to describe colors" handleClick={() => setLevel(Page.COLOR_ON_COLOR)}/>
                <HomeCard className="two" text='Mix and Match' subtext="See how close you can match colors" handleClick={() => setLevel(Page.COLOR_CREATION)}/>
                <HomeCard className="three" text='Fill in the Color' subtext="Generate colors based on a prompt" handleClick={() => setLevel(Page.COLOR_IDENTIFICATION)}/>
            </div>
        </div>
    )

}