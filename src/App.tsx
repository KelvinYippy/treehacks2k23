import { useState } from 'react';
import './App.css';
import { HomePage } from './Pages/HomePage';
import { Page } from './utils/types';
import { ColorOnColorPage } from './Pages/ColorOnColorPage';
import { ColorCreationPage } from './Pages/ColorCreation';
import { ColorIdentificationPage } from './Pages/ColorIdentification';

function App() {

    const [currentPage, setCurrentPage] = useState(Page.HOME)

    return (
        <div>
            {
                currentPage === Page.HOME &&
                <HomePage setLevel={setCurrentPage}/>
            }
            {
                currentPage === Page.COLOR_ON_COLOR &&
                <ColorOnColorPage setLevel={setCurrentPage}/>
            }
            {
                currentPage === Page.COLOR_CREATION &&
                <ColorCreationPage setLevel={setCurrentPage}/>
            }
            {
                currentPage === Page.COLOR_IDENTIFICATION &&
                <ColorIdentificationPage setLevel={setCurrentPage}/>
            }
        </div>
    )

}

export default App;
