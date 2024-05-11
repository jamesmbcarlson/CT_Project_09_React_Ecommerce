import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import CustomerManage from './components/CustomerManage';
import CustomerBrowse from './components/CustomerBrowse'
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
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
