import React, { createContext, useReducer } from 'react'
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Signin from './components/Signin'
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import Signup from './components/Signup';
import Logout from './components/Logout';
import { initialState,reducer } from '../src/reducer/UseReducer';

export const UserContext = createContext();


const Routing = () => {

  return (

<switch>
      
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/signin" element={<Signin />}/>

  <Route path="/about" element={<About/>}/>

  <Route path="/contact" element={<Contact/>}/>

  <Route path="/signup" element={<Signup/>}/>

  <Route path="/logout" element={<Logout/>}/>

  <Route path="*" element={<Error/>}/>

</Routes>

</switch>
  )
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>

    <UserContext.Provider value={{state,dispatch}}>
      <Navbar />
      <Routing/>

      </UserContext.Provider>


    </>
  )
}

export default App
