import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store";
import "./index.css";
import App from "./App";
import Contact from "./pages/Contact/Contact";
import Portfolio from "./pages/Portfolio/Portfolio";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import reportWebVitals from "./reportWebVitals";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate replace to="/admin/login" />;
}

function AdminRouteGate({ children }) {
  const [isUnlocked] = useState(() => {
    const passed = sessionStorage.getItem("admin_gate_passed") === "true";
    sessionStorage.removeItem("admin_gate_passed"); // Consume the flag immediately!
    return passed;
  });

  return isUnlocked ? children : <Navigate replace to="/" />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route
              path="/admin/login"
              element={
                <AdminRouteGate>
                  <AdminLogin />
                </AdminRouteGate>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRouteGate>
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                </AdminRouteGate>
              }
            />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
