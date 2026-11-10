import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import { isAuthenticated } from "../utils/auth";

//pages
import SignIn from "../pages/SignIn";
import ContactUsPage from "../pages/ContactUsPage";
import ForgotPassword from "../pages/ForgotPassword";
import UserRegister from "../pages/UserRegister";
import HomeDashboard from "../pages/HomeDashboard";
// Helper
const Private = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);
const AppRoutes = () => {
  const storedUser = localStorage.getItem("user");
  let userInfo = storedUser ? JSON.parse(storedUser) : null;
  return (
    <Routes>
    <Route path="/" element={<Private><HomeDashboard /></Private>} />

{/* Public Routes */}
      <Route
        path="/sign-in"
        element={isAuthenticated() ? <Navigate to="/" replace /> : <SignIn />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/sign-up" element={<UserRegister />} />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
