import React, {Component} from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

import 'highlight.js/styles/github.css';

hljs.registerLanguage('python', python);

class Highlight extends Component {
    constructor(props) {
        super(props);

        this.nodeRef = new React.createRef();

        const langClass = (this.props.language === undefined ?
            "" :
            this.props.language.reduce(((accumulator, currentValue) => (accumulator + currentValue + " ")), ""));

        this.state = {
            content: "",
            langClass: langClass,
        }
    }

    highlight = () => {
        if (this.nodeRef) {
            const nodes = this.nodeRef.current.querySelectorAll('pre');
            nodes.forEach((node) => {
                hljs.highlightBlock(node);
            });
        }
    }

    componentDidMount() {
        fetch(`http://${window.HOST}/cdn/` + this.props.source)
        .then(res => res.text())
        .then(data => this.setState({content: data}));
    }
    
    componentDidUpdate() {
        this.highlight();
    }

    render() {
        return (
            <div ref={this.nodeRef}>
                <pre>{this.state.content}</pre>
            </div>
        );
    }
}

export default Highlight;
