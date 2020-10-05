import React from 'react';
import Article from '../Components/Article'
import { useParams } from 'react-router-dom';

const ArticlePage = () => {
    const { art } = useParams();
    return <Article name={art} />
}

export default ArticlePage;