import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  const navigate = useNavigate()
  const redirectToLogin = () => { navigate('/') }
  const redirectToArticles = () => { navigate('/articles') }

  const logout = () => {
    localStorage.removeItem('token')
    setMessage('Goodbye!')
    redirectToLogin()
  }

  const login = async ({ username, password }) => {
    setMessage('')
    setSpinnerOn(true)
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      localStorage.setItem('token', data.token)
      setMessage(data.message)
      redirectToArticles()
    } catch (err) {
      setMessage('Login failed')
    } finally {
      setSpinnerOn(false)
    }
  }

  const getArticles = async () => {
    setMessage('')
    setSpinnerOn(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(articlesUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.status === 401) {
        redirectToLogin()
      } else {
        const data = await response.json()
        setArticles(data.articles)
        setMessage(data.message)
      }
    } catch (err) {
      setMessage('Failed to fetch articles')
    } finally {
      setSpinnerOn(false)
    }
  }

  const postArticle = async article => {
    setMessage('')
    setSpinnerOn(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(articlesUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(article)
      })
      const data = await response.json()
      setArticles([...articles, data.article])
      setMessage(data.message)
    } catch (err) {
      setMessage('Failed to post article')
    } finally {
      setSpinnerOn(false)
    }
  }

  const updateArticle = async ({ article_id, article }) => {
    setMessage('')
    setSpinnerOn(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${articlesUrl}/${article_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(article)
      })
      const data = await response.json()
      setArticles(articles.map(a => a.article_id === article_id ? data.article : a))
      setMessage(data.message)
    } catch (err) {
      setMessage('Failed to update article')
    } finally {
      setSpinnerOn(false)
    }
  }

  const deleteArticle = async article_id => {
    setMessage('')
    setSpinnerOn(true)
    try {
      const token = localStorage.getItem('token')
      await fetch(`${articlesUrl}/${article_id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setArticles(articles.filter(a => a.article_id !== article_id))
      setMessage('Article deleted successfully')
    } catch (err) {
      setMessage('Failed to delete article')
    } finally {
      setSpinnerOn(false)
    }
  }

  return (
    <>
      <Spinner spinnerOn={spinnerOn} />
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}>
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="articles" element={
            <>
              <ArticleForm postArticle={postArticle} updateArticle={updateArticle} setCurrentArticleId={setCurrentArticleId} currentArticleId={currentArticleId} />
              <Articles articles={articles} deleteArticle={deleteArticle} getArticles={getArticles} setCurrentArticleId={setCurrentArticleId} currentArticleId={currentArticleId} />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2024</footer>
      </div>
    </>
  )
}
