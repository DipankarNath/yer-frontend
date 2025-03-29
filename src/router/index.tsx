import { Routes, Route } from "react-router";
import Login from "@/pages/login";
import PatientRegistration from "@/pages/patientsRegistration";
import ProviderRegistration from "@/pages/providerRegistration";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/provider-registration" element={<ProviderRegistration />} />
      <Route path="/patient-registration" element={<PatientRegistration />} />
    </Routes>
  );
}
