import React from 'react';

import About from './AboutPage'
import Default from './DefaultPage'
import Article from './Components/Article';
import VaultPage from './VaultPage';

import './App.scss';

import {
    Routes,
    Route,
    Link,
    useLocation
} from "react-router-dom";

const App = () => (<>
        <div id="wrapper">
            <div id="header">
                <Link to="/" style={{textDecoration: "none"}}><h1 id="title">SERBANOLOGY</h1></Link>
                <div id="navbar">
                    <Link className="Navitem" to="/about">About</Link>
                    <Link className="Navitem" to="/vault">Vault</Link>
                    <Link className="Navitem" to="/vault/Other Blogs">Blogs I love</Link>
                    <Link className="Navitem" to="/vault/Highlights">Highlights</Link>
                </div>
            </div>

            <div id="main">
                <div id="mainContent">
                    <Routes>
                        <Route exact path="/about" element={<About />} />

                        <Route exact path="/vault" element={ <VaultPage/> } />

                        <Route exact path="/vault/:article_name" element={<Article />} />

                        <Route exact path="/" element={<Default />} />
                    </Routes>
                </div>
            </div>

            <div id="footer">
                <div
                    style={{
                        margin: "15px"
                    }}>
                    You are free to share and modify the content of this website for non-commercial purposes.
                </div>
            </div>
        </div>
</>);


export default App;
