import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AllTasks from './pages/AllTasks'
import Focus from './pages/Focus'
import HireDrillDown from './pages/HireDrillDown'
import ManagerDashboard from './pages/ManagerDashboard'
import SignIn from './pages/SignIn'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/hire" element={<Layout kind="hire" />}>
          <Route index element={<Focus />} />
          <Route path="tasks" element={<AllTasks />} />
        </Route>
        <Route path="/manager" element={<Layout kind="manager" />}>
          <Route index element={<ManagerDashboard />} />
          <Route path="hires/:id" element={<HireDrillDown />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
