import { Routes, Route } from "react-router";
import Login from "@/pages/login";
import PatientRegistration from "@/pages/patientsRegistration";
import ProviderRegistration from "@/pages/providerRegistration";
import ProtectedRoute from "./protectedRouter";
import PatientDashboard from "@/pages/patientDashboard";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/provider-registration" element={<ProviderRegistration />} />
      <Route path="/patient-registration" element={<PatientRegistration />} />
      <Route element={<ProtectedRoute />}>
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      </Route>
    </Routes>
  );
}
