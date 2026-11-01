import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AllTasks from './pages/AllTasks'
import Focus from './pages/Focus'
import Placeholder from './pages/Placeholder'
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
          <Route index element={<Placeholder name="Dashboard" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
