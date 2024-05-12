import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import CustomerBrowse from './components/CustomerBrowse';
import CustomerManage from './components/CustomerManage';
import ProductBrowse from './components/ProductBrowse';
import ProductManage from './components/ProductManage';
import NotFound from './components/NotFound';

import './App.css';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/customers/' element={<CustomerBrowse/>} />
        <Route path='/customer/:id' element={<CustomerBrowse/>} />
        <Route path='/customer/add' element={<CustomerManage/>} />
        <Route path='/customer/edit/:id' element={<CustomerManage/>} />
        <Route path='/products/' element={<ProductBrowse/>} />
        <Route path='/product/:id' element={<ProductBrowse/>} />
        <Route path='/product/add' element={<ProductManage/>} />
        <Route path='/product/edit/:id' element={<ProductManage/>} />
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
