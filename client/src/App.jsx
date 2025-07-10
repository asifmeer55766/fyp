import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import RegisterForm from './components/authentication/Register'
import LoginForm from './components/authentication/Login'
import Features from './pages/features/Features'
import About from './pages/about/About'
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import UserDashboard from './pages/userDashboard/UserDashboard';
import SystemSetting from './pages/adminDashboard/systemSetting/SystemSetting';
import DocsHistory from './pages/userDashboard/docsHistory/DocsHistory';
import LoaderVerify from './components/loaders/LoaderVerify';
function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/features' element={<Features />} />
          <Route path='/about' element={<About />} />
          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route path='system-setting' element={<SystemSetting />} />
          </Route>
          <Route
            path="/user-dashboard/*"
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          >
            <Route path='docs-history' element={<DocsHistory />} />
          </Route>
        </Routes>
        {/* <LoaderVerify verify={'Authenticating your credentials, please wait...'} /> */}
        <Footer />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
