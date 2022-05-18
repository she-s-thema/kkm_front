import './style.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Side from './components/Side';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Side />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signup' element={<SignUp />} />
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