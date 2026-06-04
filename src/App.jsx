import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Loan from './pages/Loan'
import Settings from './pages/Settings'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="loans" element={<Loan />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App