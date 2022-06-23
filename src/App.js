import './style.css';
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Auth from './components/Auth';

export default function App() {
  const [loginWindow, setLoginWindow] = useState();
  const showLogin = () => {
    setLoginWindow(<Login stopShowLogin={stopShowLogin} />)
  }
  const stopShowLogin = () => {
    setLoginWindow();
    window.location.href="/"
  }
  return (
    <div className='App'>
      <BrowserRouter>
        <Header showLogin={showLogin} />
        {loginWindow}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="auth/kakao/callback" element={<Auth />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// eslint-disable-next-line no-lone-blocks
{/* <BrowserRouter>
  <nav>
    
    <NavLink to="/">Home</NavLink>  NavLink : 선택된 요소 class에 active 자동 생성 
    <NavLink to="test">Test</NavLink>
  </nav>
  <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='test' element={<Test />} />
  </Routes>
</BrowserRouter> */}