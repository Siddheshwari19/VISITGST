import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeRegister from './pages/EmployeeRegister';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import CustomerLogin from './pages/CustomerLogin';
import CustomerRegister from './pages/CustomerRegister';
import CustomerDashboard from './pages/Customer-Dashboard';
import RequestForm from './pages/RequestForm';
import AppointmentForm from './pages/AppointmentForm';
import AllAppointments from './pages/AllAppointments';
import AllRequests from './pages/AllRequests';
import CustomerAppointments from './pages/CustomerAppointments';
import CustomerRequests from './pages/CustomerRequests';
import History from './pages/History';

function App() {
  const theme = createTheme({
    typography: {
        fontFamily: [
            'Open sans',

        ].join(','),
    },
});
let notShowSidebar=['/employee-login','/customer-login','/employee-register','/customer-register','/customer-dashboard','/','/request-form/','/customer-appointment','/customer-request'];

  return (
    <ThemeProvider  theme={theme}>
    <Router>
    {!notShowSidebar.includes(window.location.pathname)?<Sidebar/>:<></>}
      <Routes  >
      <Route path="/" element={<Home/>} />

        <Route path="/employee-login" element={<EmployeeLogin/>} />
        <Route path="/employee-register" element={<EmployeeRegister/>} />

        <Route path="/customer-login" element={<CustomerLogin/>} />
        <Route path="/customer-register" element={<CustomerRegister/>} />
        <Route path="/view-appointments" element={<AllAppointments/>} />
        <Route path="/view-requests" element={<AllRequests/>} />
        <Route path="/view-history" element={<History/>} />

        <Route path="/employee-dashboard" element={<Dashboard/>} />
        <Route path="/customer-dashboard" element={<CustomerDashboard/>} />
        <Route path="/customer-appointment" element={<CustomerAppointments/>} />
        <Route path="/customer-request" element={<CustomerRequests/>} />

        <Route path="/request-form/:employeeId" element={<RequestForm/>} />
        <Route path="/appointment-form/:employeeId" element={<AppointmentForm/>} />
        
      </Routes>
    </Router>
  </ThemeProvider>
  );
}

export default App;
