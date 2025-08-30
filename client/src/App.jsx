import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import RegisterForm from "./components/authentication/Register";
import LoginForm from "./components/authentication/Login";
import Features from "./pages/features/Features";
import About from "./pages/about/About";
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import UserDashboard from "./pages/userDashboard/UserDashboard";
import SystemSetting from "./pages/adminDashboard/systemSetting/SystemSetting";

import LoaderVerify from "./components/loaders/LoaderVerify";
import UserGuide from "./pages/userGuide/UserGuide";
import ProcessAnimation from "./components/animation/loading/Loading";
import DisplayFunctionalRequirements from "./pages/displayFunctionalReq/DisplayFunctionalReq";
// import FinalOutputDocs from "./pages/finalOutputDocs/FinalOutputDocs";
import Status from "./components/status/Status";
import Spiner from "./components/status/Spiner";
import { useState, useEffect } from "react";
import Footer from "./components/footer/Footer";
import NotFound from "./pages/notFound/NotFound";
import ScrollToTop from "./components/scrollTop/ScrollToTop";
import Profile from "./pages/adminDashboard/profile/Profile";
import ProjectsList from "./pages/adminDashboard/projectlist/ProjectList";
import UsersList from "./pages/adminDashboard/userlist/UsersList";
import Settings from "./pages/adminDashboard/setting/Setting";
import UserProfile from "./pages/userDashboard/profile/UserProfile";
import UserProjectsList from "./pages/userDashboard/projectlist/UserProjectList";
import ProjectOutput from "./pages/userDashboard/projectouput/ProjectOutput";
import FinalOutputDocsNew from "./pages/finalOutputDocs/FinalOutputDocsNew";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  return loading ? (
    <div className="spiner-box">
      <Spiner
        status={"Initializing... Please wait while we prepare your experience"}
      />
    </div>
  ) : (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/user-guide" element={<UserGuide />} />
          <Route path="/status" element={<Status />} />
          <Route path="/contact" element={<About />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/projects" element={<UserProjectsList />} />
          {/* <Route path="/projects/:id" element={<ProjectOutput />} /> */}
          <Route path="/projects/:id" element={<FinalOutputDocsNew />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/display-functional-req"
            element={
              <ProtectedRoute>
                <DisplayFunctionalRequirements />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Profile />} />
            <Route path="system-setting" element={<SystemSetting />} />
            <Route path="profile" element={<Profile />} />
            <Route path="project-list" element={<ProjectsList />} />
            <Route path="user-list" element={<UsersList />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route
            path="/user-dashboard/*"
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserProfile />} />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="user-project-list" element={<UserProjectsList />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
