import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"

const ListView = (props) => {
    const [articlesList, setArticleList] = useState(0);

    useEffect(() => {
        fetch(`/api/get_list`).then(res => res.json()).then(data => {
            setArticleList(data);
        });
    }, []);

    if (articlesList === 0)
        return null;

    return <ul>
        {articlesList.map(
            (article, index) => <li key={index}> <Link to={`/vault/${article}`}> {article} </Link> </li>
        )}
    </ul>;
};

export default ListView;
