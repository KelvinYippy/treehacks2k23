import { useState } from 'react';
import './App.css';
import { HomePage } from './pages/HomePage';
import { Page } from './utils/types';
import { ColorOnColorPage } from './pages/ColorOnColorPage';
import { ColorCreationPage } from './pages/ColorCreation';
import { ColorIdentificationPage } from './pages/ColorIdentification';
import AlbersFullLogo from './assets/AlbersFullLogo.png'

function App() {

    const [currentPage, setCurrentPage] = useState(Page.HOME)

    return (
        <div>
            <img 
                src={AlbersFullLogo} 
                style={{ cursor: 'pointer' }}
                alt="Full Logo" 
                onClick={() => setCurrentPage(Page.HOME)}
            />
            {
                currentPage === Page.HOME &&
                <HomePage setLevel={setCurrentPage}/>
            }
            {
                currentPage === Page.COLOR_ON_COLOR &&
                <ColorOnColorPage/>
            }
            {
                currentPage === Page.COLOR_CREATION &&
                <ColorCreationPage/>
            }
            {
                currentPage === Page.COLOR_IDENTIFICATION &&
                <ColorIdentificationPage/>
            }
        </div>
    )

}

export default App;
