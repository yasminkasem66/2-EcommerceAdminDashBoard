import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './container/Home';
import Signin from './container/Signin';
import Signup from './container/Signup';
import PrivateRoutes from './HOC/privateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, getInitialData, isUserLogin } from './store/actions';
import { Orders } from './container/Orders';
import { Products } from './container/Products';
import { Category } from './container/Category';



function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => { 
    if (!auth.authenticate) {
      dispatch(isUserLogin())
    }
    dispatch(getInitialData())

  }, []);

  return (
    <div className="App">
        <Routes>
          <Route exact element={<PrivateRoutes  />}>
            <Route exact path="/" element={<Home />} />
          </Route>
          <Route   path="/orders" element={<Orders/>}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/category" element={<Category />} />
        
          <Route  exact path="/signin" element={<Signin />}/>
          <Route  exact path="/signup" element={<Signup />}/>
        </Routes>
    


      
    </div>
  );
}

export default App;
