import { BrowserRouter, Routes, Route } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import Home from "./pages/public/Home"
import FindDoctors from "./pages/public/FindDoctors"
import Login from "./pages/public/Login"
import Register from "./pages/public/Register"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<FindDoctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App