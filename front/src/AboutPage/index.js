import React from 'react';
import Card from '../Components/Card'
import me from './me.jpg'

const About = () =>
(<>
    <Card float="right" pic={me} width="240px">
        Me, doing some more than necessary reading.
    </Card>
    <p>
        My name is Şerban Cercelescu (hence the website name). I'm 19, living in Bucharest, but soon moving to Oxford to continue my studies. I'm quite passionate about maths, computer science, philosophy, anthropology (and human studies in general) and of course, Age of Empires 2. I created this website quite a while ago (October 2018) in order to share some of the cool stuff I come across in my studies. The website was created with the intent of having the "look and feel" of a textbook, any suggestions are warmly welcome :)
    </p>

    <br/>
    <div>
        <h3>Contact</h3>
        <ul>
        <li>email: warewaanai@gmail.com</li>
        <li>codeforces: <b><a href="http://codeforces.com/profile/Anai" style={{color: "#FF8C00", textDecoration: "none"}}>Anai</a></b></li>
        <li>atcoder: <b><a href="https://beta.atcoder.jp/users/anai" style={{color: "#0000FF", textDecoration: "none"}}>Anai</a></b></li>
        </ul>
    </div>

    <br/>
    <br/>
    <div style={{textAlign: "center", marginTop: "auto", height: "min-content"}}>
        <p>
            <i> What is the cost of lies? It’s not that we will mistake them for the truth. The real danger is that, if we hear enough lies, then we no longer recognize the truth at all. What can we do then? What else is left but to abandon even the hope of truth and content ourselves instead with stories? In these stories, it doesn’t matter who the heroes are. All we want to know is who is to blame. </i>
        </p>
    </div>
</>);

export default About;