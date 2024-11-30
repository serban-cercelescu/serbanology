import React from 'react';
import Card from '../Components/Card'

const About = () =>
(<>
    <Card float="right" pic="me.jpg" width="240px">
        Jessica's drawing of me
    </Card>
    <p>
        My name is Șerban Cercelescu (hence the website name), I live in Cambridge and I'm originally from Bucharest. Here's a list of the stuff that preocupies me most as of December 2024:
    </p>
    <ul>
        <li>Jessica Burge</li>
        <li>Topology</li>
        <li>Algebra</li>
        <li>Quantum Error Correction</li>
    </ul>
    <p>
        I've created this website quite a while ago (October 2018) in order to share some of the cool stuff I come across. The website was created with the intention of having the "look and feel" of a textbook, any suggestions are warmly welcome.
    </p>
    <br/>
    <div>
        <h3>Contact</h3>
        <ul>
        <li>email: serban (dot) cercelescu (at) hotmail (dot) com</li>
        <li>codeforces: <b><a href="http://codeforces.com/profile/Anai" style={{color: "#FF8C00", textDecoration: "none"}}>Anai</a></b></li>
        </ul>
    </div>

    <Card center float="none" pic="alsome.jpg" width="400px">
        Me hanging out with <a href="https://codeforces.com/profile/Andrei1998">Andrei Constantinescu</a>
    </Card>
</>);

export default About;
