import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Components
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
// import Pages
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';
import Categories from './pages/Categories';

const App = () => {

  return (
    <div className="container mx-auto">
      <ScrollToTop/>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:type" element={<Categories />} />
          {/* <Route path='/product/:id' element={<ProductDetails/>} /> */}
        </Routes>
        {/* <SideBar /> */}
        {/* <Footer /> */}
      </Router>
    </div>
  );
};

export default App;
