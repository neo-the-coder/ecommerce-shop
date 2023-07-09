import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Components
import Header from './components/Header';
// import Pages
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';

const App = () => {
  return (
    <div className="container mx-auto">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path='/product/:id' element={<ProductDetails/>} /> */}
        </Routes>
        {/* <SideBar /> */}
        {/* <Footer /> */}
      </Router>
    </div>
  );
};

export default App;
