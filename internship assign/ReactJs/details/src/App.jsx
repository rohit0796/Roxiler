import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DetailList from './components/DetailList'
import UserDetail from './components/UserDetail'
import Search from './components/Search'
import { useSelector } from 'react-redux'
function App() {
  const [search, setSearch] = useState("")
  return (
    <div className='container'>
      <Search  setSearch={setSearch} search={search}/>
      <div className="home">
        <DetailList search={search} />
        <UserDetail />
      </div>
    </div>
  )
}

export default App
