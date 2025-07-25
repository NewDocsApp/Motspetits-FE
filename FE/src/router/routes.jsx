import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Home from '../pages/home/home';
import TextEditor from '../pages/edittext/edittext';
import VerifyOtp from '../pages/verifyOtp/verifyOtp';
import { AnimatePresence } from 'framer-motion';


const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/document" element={<TextEditor />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
