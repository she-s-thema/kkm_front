import './style.css';
import React from 'react'
import Header from './components/Header';

export default function App() {
  return (
    <div className='App'>
      <Header />
      <p id='p'>h</p>
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