import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

const ListArticles = () => {
    const [articleList, setArtList] = useState(0);
    let content = [];

    useEffect(() => {
        if (articleList)
            return;

        fetch('/api/list_articles').then(res => res.json()).then(data => {
            let articles = [];
            for (var key in data) {
                let val = JSON.parse(data[key]);
                articles.push({
                    key: key,
                    val: val
                });
            }

            articles.sort((a, b) => {
                if (a.val.published < b.val.published)
                    return 1;
                if (a.val.published === b.val.published)
                    return 0;
                if (a.val.published > b.val.published)
                    return -1;
            });

            setArtList(articles);
        });
    });

    if (articleList) {
        content = articleList.map((art, idx) => <li key={idx}>{moment(art.val.published).format("YYYY MMM DD")} - <Link to={`/article/${art.key}`}>{art.key}</Link> </li>);
        console.log(articleList);
        console.log(content);
    }

    return (<ul> {content} </ul>);
}

export default ListArticles;
