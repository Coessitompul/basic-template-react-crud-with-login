import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import AboutPage from './pages/AboutPage';
import RegisterPage from './pages/RegisterPage';
import { useHydration } from './hooks/useHydration';
import NotFoundPage from './pages/NotFoundPage';
import store from './store/store.js';
import NotFoundPagePublic from './pages/public/NotFoundPage.jsx';

// useLocation di gunakan untuk mengetahui sedang di path mana kita
/* karena <Header /> dan <Footer /> berada diluar Routes maka ketika pindah halaman maka Header dan Footer tidak akan terpengaruh */
// { !location.pathname.startsWith("/admin") ? <Header /> : null }

function App() {
  const state = store.getState(); // Get the current Redux state
  const accessToken = state.users?.accessToken; // Access the token
  const location = useLocation();

  const { isHydrated } = useHydration();

  if (!isHydrated) {
    return <div>Loading...</div>
  }

  return (
    <>
      {/* { !location.pathname.startsWith("/admin") ? null : <Header /> } */}
      {/* <Header/> */}

      <Header/>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/about" Component={AboutPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="*" Component={NotFoundPagePublic} />
        </Routes>

      <Footer/>
      {/* { !location.pathname.startsWith("/admin") ? null : <Footer /> } */}
    </>
  )
}

export default App
