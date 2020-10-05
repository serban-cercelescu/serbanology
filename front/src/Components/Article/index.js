import React, {useState, useEffect} from 'react'
import JsxParser from 'react-jsx-parser'

import Tex2SVG, { MathJaxProvider } from "react-hook-mathjax";
import Card from '../Card'
import Highlight from '../Highlight'
import {Link} from 'react-router-dom'

const Article = (props) => {
    const [content, setContent] = useState(0);
    const [meta, setMeta] = useState(1);

    useEffect(() => {
        fetch(`/api/content_article?art=${props.name}`).then(res => res.json()).then(data => {
            setContent(data.text);
        });
        if (meta === 1) {
            if (!props.meta) {
                fetch(`/api/meta_article?art=${props.name}`).then(res => res.json()).then(data => {
                    setMeta(data);
                });
            }
            else
                setMeta(props.meta);
        }
    });

    if (content === 0)
        return null;

    return (<>
            <div className="ArticleHeader">
                <div><Link className="ArtTitle" to={`/article/${props.name}`}><h2>{props.name}</h2></Link></div>
            </div>
            <MathJaxProvider>
                <JsxParser
                    disableKeyGeneration={false}
                    components={{
                        Card, // Most Common ones
                        Link,
                        Tex2SVG,
                        Highlight,
//                        ...meta.components
                    }}
                    jsx={`
                    <div>
                        ${content}
                    </div>
                `}/>
            </MathJaxProvider>
    </>);
}

export default Article;