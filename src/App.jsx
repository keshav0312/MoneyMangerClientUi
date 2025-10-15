import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Filter from './pages/Filter';
import Login from './pages/Login';
import ActivationSuccess from './components/ActivationSuccess.jsx';
import ActivationFailed from './components/Activationfailed.jsx';
import Signup from './pages/Signup';
import Expense from './pages/Expense';
import Income from './pages/Income';
import Category from './pages/Category';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // 👈 import it

function App() {
  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/activation_success' element={<ActivationSuccess></ActivationSuccess>} />
          <Route path='/activation_fail' element={<ActivationFailed />} />

          {/* ✅ Protected routes */}
          <Route path='/dashboard' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/filter' element={<ProtectedRoute><Filter /></ProtectedRoute>} />
          <Route path='/category' element={<ProtectedRoute><Category /></ProtectedRoute>} />
          <Route path='/income' element={<ProtectedRoute><Income /></ProtectedRoute>} />
          <Route path='/expense' element={<ProtectedRoute><Expense /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

const Root = () => {
  const authenticated = !!localStorage.getItem("token");
  return authenticated ? <Home /> : <Login />;
};

export default App;
