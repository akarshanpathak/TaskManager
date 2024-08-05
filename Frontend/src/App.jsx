import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import RouteNotFound from './components/RouteNotFound'

function App() {
  const [count, setCount] = useState(0)
  
  
  
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
       <Route path='/' element={<Home/>}/>

       <Route path="*" element={<RouteNotFound />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
