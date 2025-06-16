import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "@/components/theme-provider";
import SideBar from "./components/SideBar";
import DashBorad from "./pages/DashBorad";
import { Toaster } from "@/components/ui/sonner";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import BarLoader from "./components/BarLoader";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";

axios.defaults.withCredentials = true;

const BASE_URL = import.meta.env.VITE_BACKEND_API + "/api";

function App() {
  const { setUser, loading } = useAuthStore();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/auth/me`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Toaster richColors />
      {loading ? (
        <div className="flex min-h-screen items-center justify-center">
          <BarLoader />
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard/*" element={<DashBorad />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;
