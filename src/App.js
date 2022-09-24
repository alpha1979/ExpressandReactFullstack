import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './pages/Home';
import About from './pages/About';
import ArticleList from './pages/ArticlesList';
import ArticlePage from './pages/ArticlePage';
import NotFound404Page from './pages/NotFound404Page';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/articles' element={<ArticleList />} />
            <Route path='/articles/:articleId' element={<ArticlePage />} />
            <Route path='*' element={<NotFound404Page />} />
          </Routes>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
