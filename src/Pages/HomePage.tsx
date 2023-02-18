import { HomeCard } from "../Components/HomeCard"
import { ColorPageProps, Page } from "../utils/types"
import './HomePage.css'

export const HomePage = ({setLevel}: ColorPageProps) => {

    return (
        <div className="home-grid">
            <HomeCard text='Color-On-Color' handleClick={() => setLevel(Page.COLOR_ON_COLOR)}/>
            <HomeCard text='Color Creation' handleClick={() => setLevel(Page.COLOR_CREATION)}/>
            <HomeCard text='Color Identification' handleClick={() => setLevel(Page.COLOR_IDENTIFICATION)}/>
        </div>
    )

}