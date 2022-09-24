import articles from './article-content';
import ArticleListComponent from '../components/ArticlesListComponent';
const ArticleList = () => {
    return (
        <>
        <h1>ArticleList</h1>
            <ArticleListComponent articles={articles}/>
        </>
    );
};

export default ArticleList;