import React from 'react';
import Card from '../Components/Card'

const About = () =>
(<>
    <Card float="right" pic="me.jpg" width="240px">
        Jessica's drawing of me
    </Card>
    <p>
        My name is Șerban Cercelescu (hence the website name), I live in Oxford and I'm originally from Bucharest. Most of what I do now is maths and theoretical computer science. Here's a list of the stuff that preocupies me most as of October 2022:
    </p>
    <ul>
        <li>Jessica Burge</li>
        <li>Applications of Algebraic Topology in Promise Constraint Satistfaction Problems</li>
        <li>Complex Analysis</li>
        <li>Algebraic Number Theory</li>
    </ul>
    <p>
        I've created this website quite a while ago (October 2018) in order to share some of the cool stuff I come across. The website was created with the intention of having the "look and feel" of a textbook, any suggestions are warmly welcome.
    </p>
    <br/>
    <div>
        <h3>Contact</h3>
        <ul>
        <li>email: serban-ion (dot) cercelescu (at) exeter (dot) ox (dot) ac (dot) uk</li>
        <li>codeforces: <b><a href="http://codeforces.com/profile/Anai" style={{color: "#FF8C00", textDecoration: "none"}}>Anai</a></b></li>
        </ul>
    </div>

    <Card float="center" pic="alsome.jpg" width="400px">
        Me hanging out with <a href="https://codeforces.com/profile/Andrei1998">Andrei Constantinescu</a>
    </Card>

    <br/>
    <br/>
    <div style={{textAlign: "center", marginTop: "auto", height: "min-content"}}>
        <p>
            <i> What is the cost of lies? It’s not that we will mistake them for the truth. The real danger is that, if we hear enough lies, then we no longer recognize the truth at all. What can we do then? What else is left but to abandon even the hope of truth and content ourselves instead with stories? In these stories, it doesn’t matter who the heroes are. All we want to know is who is to blame. </i>
        </p>
    </div>
</>);

export default About;