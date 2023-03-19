import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeMathjax from 'rehype-mathjax'
import remarkWikiLink from 'remark-wiki-link'
import remarkMdx from 'remark-mdx'

import Card from '../../Components/Card'


const Article = (props) => {
    const [content, setContent] = useState(0);
    const { article_name } = useParams();


    useEffect(() => {
        fetch(`/api/get_article/${props.page ? props.page : article_name}`)
        .then(res => {
          if (res.status === 404)
            window.location.href = '/vault/404';
          else
            return res.json();
        }).then(data =>
          setContent({
              text: data.text,
              title: props.page ? props.page : article_name
          })
        );
    }, [article_name]);

    if (content === 0)
        return null;

    return <>
        <h1> { content.title } </h1>

        <ReactMarkdown
            components={{
                img: (node, ...props) => {
                    console.log(node);
                    return <Card pic={node.src} children={node.alt} />;
                },
                code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                },
            }}

            remarkPlugins={[
              [
                remarkWikiLink,
                {
                  pageResolver: (name) => [name],
                  hrefTemplate: (permalink) => `/vault/${permalink}`
                }
              ],
              remarkGfm,
              remarkMath,
              remarkMdx
            ]}
            rehypePlugins={[rehypeMathjax]}

        >

          {content.text}

        </ReactMarkdown>
    </>;
}

export default Article;
