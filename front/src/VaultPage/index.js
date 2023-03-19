import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GraphView from './GraphView'
import ListView from './ListView'


const VaultPage = (props) => {
    const[ state, setState ] = useState({
        graphView: true,
        listView: false
    });

    const Options = (_) => {
        const handleChange = (event) => {
            console.log(event.target.name)
            if (event.target.name === 'listView')
                setState({
                    graphView: false,
                    listView: true
                });
            else if (event.target.name === 'graphView')
                setState({
                    graphView: true,
                    listView: false
                });
        };

        console.log(state);

        return <>
            you can either see the {state.graphView ? 'Graph View ' :  <Link name="graphView" onClick={handleChange}> Graph View </Link>}
            or the {state.listView ? 'List View ' :  <Link name="listView" onClick={handleChange}> List View </Link>}
        </>
    }

    console.log(state);
    if (!state)
        return null;

    return <>
        <h1>Vault Browser</h1>
        <p> My blog is now synced to my academic obsidian vault. If you want an overview of its contents, <Options />. </p>

        { state.graphView ? <GraphView /> : <ListView /> }
    </>
}

export default VaultPage;
