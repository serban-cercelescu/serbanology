import React, {Component} from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

import 'highlight.js/styles/github.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.configure({
    languages: ["javascript", "python"],
    classPrefix: "",
});
hljs.initHighlighting();
console.log(hljs.listLanguages());

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

    componentDidMount() {
        fetch(this.props.source)
        .then(res => res.text())
        .then(data => this.setState({content: data}))
    }
    
    componentDidUpdate() {
        hljs.highlightBlock(this.nodeRef.current);
    }

    render() {
        return (
            <pre ref={this.nodeRef}>
                <code className={this.state.langClass}>
                    {this.state.content}
                </code>
            </pre>
        );
    }
}

export default Highlight;
