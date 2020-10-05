import React, {useState, useEffect} from 'react';
import Article from '../Components/Article'

const Default = () => {
    const [art0, setArt0] = useState(0);

    useEffect(() => {
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

            if (art0 === 0) 
                setArt0({name: articles[0].key, meta: JSON.parse(data[articles[0].key])});
        });
    });

    if (art0 !== '0')
        return (<>
            <Article name={art0.name} meta={art0.meta} />
        </>);
    else
        return null;
}

export default Default;
