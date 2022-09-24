import {useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import articles from './article-content';
import NotFound404Page from "./NotFound404Page";
import CommentList from '../components/CommentList';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: []});
    const {articleId} = useParams();

    useEffect(() => {
        const loadArticleInfo = async () => {

            const res = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = res.data;
            setArticleInfo(newArticleInfo);
        }
        loadArticleInfo();
        
    }, []);
    
  
    const article = articles.find(article => article.name === articleId );
    const addUpvote = async () => {
        const res = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = res.data;
        setArticleInfo(updatedArticle);
    };

    if (!article) {
        return <NotFound404Page />;
    }
    return (
        <>
        <h1>{ article.title} </h1>
        <div className='upvotes-section'>
            <button onClick={addUpvote}>Upvote</button>
            <p>This article has {articleInfo.upvotes} upvotes</p>
        </div>
        { article.content.map( (paragraph, i) => (
            <p key={i}> {paragraph} </p>
    ))}
    <AddCommentForm 
        articleName={articleId}
        onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}
    />
    <CommentList comments={articleInfo.comments}/>
        </>
    );
};

export default ArticlePage;