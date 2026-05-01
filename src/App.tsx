import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminPage from "./Page/AdminPage"
import LoginPage from "./Page/LoginPage"
import PrivatePage from "./Page/PrivatePage"


function App() {


  return (
    <>
      <BrowserRouter>
      <Routes >
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivatePage />} >
        <Route path="/" element={<AdminPage />} />
        
        </Route>
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
