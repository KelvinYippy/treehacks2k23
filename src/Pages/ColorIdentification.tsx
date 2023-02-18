import backArrow from '../assets/backArrow.svg'
import { ColorPageProps, Page } from '../utils/types'

export const ColorIdentificationPage = ({setLevel}: ColorPageProps) => {

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
                Color Identification
            </div>
            {/* <div style={{ paddingTop: '1rem' }}>
                <ColorDisplay backgroundColor={`rgb(${r}, ${g}, ${b})`}/>
            </div> */}
            <div style={{ paddingTop: '1rem', fontWeight: 'bold' }}>
                Now, adjust the scales to what you think is the correct RYB value!
            </div>
            <input type="range"/>
            <input type="range"/>
            <input type="range"/>
        </div>
        </div>
    )

}