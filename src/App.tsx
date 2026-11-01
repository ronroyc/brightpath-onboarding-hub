import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Placeholder from './pages/Placeholder'
import SignIn from './pages/SignIn'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/hire" element={<Layout kind="hire" />}>
          <Route index element={<Placeholder name="Focus" />} />
          <Route path="tasks" element={<Placeholder name="All Tasks" />} />
        </Route>
        <Route path="/manager" element={<Layout kind="manager" />}>
          <Route index element={<Placeholder name="Dashboard" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
