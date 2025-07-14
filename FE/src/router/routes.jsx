import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import Home from '../pages/home/home';
import TextEditor from '../pages/edittext/edittext';
import VerifyOtp from '../pages/verifyOtp/verifyOtp';
import { AnimatePresence } from 'framer-motion';


const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="" element={<Home />} />
        <Route path="/edit" element={<TextEditor />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
