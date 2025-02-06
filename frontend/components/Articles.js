// Articles.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PT from 'prop-types';

export default function Articles(props) {
  const { articles, getArticles, setCurrentArticleId, deleteArticle } = props;
  const navigate = useNavigate();

  if (!localStorage.getItem('token')) {
    navigate('/');
  }

  useEffect(() => {
    getArticles();
  }, []);

  const editArticle = article_id => {
    setCurrentArticleId(article_id);
  };

  return (
    <div className="articles">
      <h2>Articles</h2>
      {!articles.length
        ? 'No articles yet'
        : articles.map(art => (
          <div className="article" key={art.article_id}>
            <div>
              <h3>{art.title}</h3>
              <p>{art.text}</p>
              <p>Topic: {art.topic}</p>
            </div>
            <div>
              <button onClick={() => editArticle(art.article_id)}>Edit</button>
              <button onClick={() => deleteArticle(art.article_id)}>Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
}

Articles.propTypes = {
  articles: PT.arrayOf(PT.shape({
    article_id: PT.number,
    title: PT.string,
    text: PT.string,
    topic: PT.string,
  })).isRequired,
  getArticles: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  deleteArticle: PT.func.isRequired,
};
