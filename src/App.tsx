import './App.css'
import {Route,Routes} from "react-router-dom"
import Home from './pages/Home'
import User1 from "./pages/User1"
import User2 from "./pages/User2"

function App() {
   
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/user1" element={<User1/>}></Route>
        <Route path="/user2" element={<User2/>}></Route>
      </Routes> 
   </div>
  )
}

export default App
