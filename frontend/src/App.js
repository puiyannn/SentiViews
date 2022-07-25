import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect
} from "react-router-dom";
import Categories from './Components/Categories';
import Products from './Components/Products';
import NavBar from './Components/NavBar';
import Slider from './Components/Slider';
import Home from './Components/Home';
import ProductInfo from './Components/ProductInfo';
import SearchBar from './Components/SearchBar';
import FavouriteList from './Pages/FavouriteList';
import SignInModal from './Components/SignInModal';
import RecentlyViewed from './Pages/RecentlyViewed';
import { ComparisonContext, SignInModalContext } from './Helper/Context';
import SignIn from './Components/SignIn';
import Modal from 'react-modal';
import Comparison from './Pages/Comparison';
import SearchResult from './Pages/SearchResult';

function App() {

  const [signInModalIsOpen,setSignInModalIsOpen] = useState(false);
  const [comparison, setComparison] = useState(false);
  const [compareButton, setCompareButton] = useState(false);
  const comparisonList = []

  return (
    <Router>
      <SignInModalContext.Provider value={{signInModalIsOpen,setSignInModalIsOpen}}>
        <NavBar/>
        <SearchBar/>
        <ComparisonContext.Provider value={{comparison,setComparison,comparisonList,compareButton,setCompareButton}}>
          <Routes>
            <Route exact path="/favourite" element={<FavouriteList/>}/>
            <Route exact path="/viewed" element={<RecentlyViewed/>}/>
            <Route exact path="/products" element={<Products/>}/>
            <Route exact path="product/:id" element={<ProductInfo/>}/>
            <Route exact path="/comparison" element={<Comparison/>}/>
            <Route exact path="/search" element={<SearchResult/>}/>
            <Route exact path="/" element={<Home/>}/>
          </Routes>
        </ComparisonContext.Provider>
      </SignInModalContext.Provider>
    </Router>
  );
}

export default App;
