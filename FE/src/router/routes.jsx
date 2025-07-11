import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/login';
import Document from '../pages/document/document';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path='/my-documents' element={<Document/>}/>
    </Routes>
  );
};

export default AppRoutes;
