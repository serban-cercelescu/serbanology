import React from 'react';

import About from './AboutPage'
import ArticlePage from './ArticlePage'
import Default from './DefaultPage'
import ListArticles from './ListArticles'

import './App.scss';

import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link,
    useLocation,
    useParams
} from "react-router-dom";

/*
    /about
    /articles
    /resources
    /show_article
*/

const RedirectArticlePage = (props) => {
    const location = useLocation();
    const search = location.search;
    const art = new URLSearchParams(search).get('art');
    console.log(art);

    return <Redirect to={`/article/{art}`} />
}

const App = () => (<>
    <Router>
        <div id="wrapper">
            <div id="header">
                <Link to="/" style={{textDecoration: "none"}}><h1 id="title">SERBANOLOGY</h1></Link>
                <div id="navbar">
                    <Link className="Navitem" to="/about">About</Link>
                    <Link className="Navitem" to="/articles">Articles</Link>
                    <Link className="Navitem" to="/resources">Resources</Link>
                    <a className="Navitem" href="https://twitter.com/warewaanai" style={{color: "#48aae6"}}>Twitter</a>
                </div>
            </div>

            <div id="main">
                <div id="mainContent">
                    <Switch>
                        <Route exact path={["/articles.php", "/articles/"]}>
                            <ListArticles />
                        </Route>

                        <Route exact path={["/about", "/about.php"]}>
                            <About />
                        </Route>

                        <Route exact path={["/article/:art"]}>
                            <ArticlePage />
                        </Route>

                        <Route exact path={["/show_article.php"]}>
                            <RedirectArticlePage />
                        </Route>

                        <Route exact path={["/", "/index.php"]}>
                            <Default showR={true} showU={false} />
                        </Route>

                    </Switch>
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
    </Router>
</>);


export default App;
