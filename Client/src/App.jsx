

import { useLocation, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";

import History from "./Components/HistoryUser";
import Home from "./Components/Home";
import UserRegistration from "./pages/users/UserRegistration";
import UserLogin from './pages/users/UserLogin';
import UserDashboard from './pages/users/UserDashboard';
import UserProfile from './pages/users/UserProfile';
import LabsRegister from './pages/labs/LabsRegister';
import LabsLogin from './pages/labs/LabsLogin';
import AllLabs from './pages/labs/AllLabs';
import LabsDashboard from './pages/labs/LabsDashboard';
import AllPatients from './pages/labs/AllPatients';
import LabProfile from './pages/labs/LabProfile';

import Footer from "./Components/Footer";
import DoctorLogin from "./pages/Doctor/DoctorLogin";
import DoctorRegister from "./pages/Doctor/DoctorRegister";
import Doctordashboard from "./pages/Doctor/Doctordashboard";
import Alldoctor from "./pages/Doctor/Alldoctor";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import AppointmentForm from "./pages/users/AppointmentForm";
import PatientBooked from "./pages/Doctor/PatientBooked";
import DoctorNavbar from "./Components/DoctorNavbar";
import ConfirmAppointment from "./pages/Doctor/ConfirmAppointment";
import Sidebar from "./Components/Sidebar";
import LabNavbar from "./Components/LabNavbar";

function AppWrapper() {
  const location = useLocation();
  // const hideNavbarRoutes = ["/", "/staff", "/dashboard", "/login","/doctor/dashboard","/labsDashboard/patients"];
  // const hideNavbar = hideNavbarRoutes.includes(location.pathname);


  const doctorRoutes = ["/doctor/dashboard", "/doctor/profile","/viewAppointment"];
const labRoutes = ["/labsDashboard", "/labsDashboard/patients","/labsDashboard/labProfile"];
const isDoctorRoute = doctorRoutes.includes(location.pathname);
const isLabRoute = labRoutes.includes(location.pathname);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditional Navbar */}
      {!isDoctorRoute && !isLabRoute && <Navbar />}

    {/* Doctor Navbar */}
    {isDoctorRoute && <DoctorNavbar />}

    {/* Lab Sidebar */}
    {isLabRoute && <LabNavbar />}
       
      {/* Main Content */}
      <main className="flex-grow  w-full">
        <Routes>
        
          <Route path="/" element={<Home />} />
          {/* <Route path="/appointment" element={<AppointScheduleUser />} />
          */}
      
         
          
          {/* Lab Section */}
        
          <Route path="/userRegister" element={<UserRegistration />} />
          <Route path="/userLogin" element={<UserLogin />} />

          <Route path="/userDashboard" element={<UserDashboard />} >
            <Route path="profile" element={<UserProfile />} />
            <Route path="labs" element={<AllLabs />} />
          </Route>

          <Route path="/labsRegister" element={<LabsRegister />} />
          <Route path="/labsLogin" element={<LabsLogin />} />
          <Route path="/labsDashboard" element={<LabsDashboard />} >
            <Route path="patients" element={<AllPatients />} />
            <Route path="labProfile" element={<LabProfile />} />
          </Route>



            <Route path="/doctor/login" element={<DoctorLogin />} />
       <Route path="/doctor/register" element={<DoctorRegister />} />
              <Route path="/doctor/dashboard" element={<Doctordashboard />} />
              
              <Route path="/doctor/all" element={<Alldoctor />} />
              <Route path="/doctor/:id" element={<DoctorProfile/>} />
              <Route path="/appointmentForm" element={<AppointmentForm/>} />
              <Route path="/appointments" element={<PatientBooked/>} />

              <Route path="/viewAppointment" element={<ConfirmAppointment/>} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

const App = () => <AppWrapper />;

export default App;
