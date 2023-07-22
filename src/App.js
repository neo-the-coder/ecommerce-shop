import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Components
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
// import Pages
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';
import Categories from './pages/Categories';
import ProductDetails from './pages/ProductDetails';
// import Data
import { categoryNames } from './data/categories';

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
          {categoryNames.map((path, i) => (
            <Fragment key={i}>
              <Route exact path={`/${path}`} element={<Categories />} />
              <Route path={`/${path}/:productSlug`} element={<ProductDetails />} />
            </Fragment>
          ))}
        </Routes>
        {/* <SideBar /> */}
        {/* <Footer /> */}
      </Router>
    </div>
  );
};

export default App;
