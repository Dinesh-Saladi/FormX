import { motion } from "framer-motion";
import Generate from "./CreateForm/Generate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import BarLoader from "./BarLoader";
import FormCards from "./DashBoardHome/FormCards";

const BASE_URL = import.meta.env.VITE_BACKEND_API + "/api";

function DashBoardHome({ setFormFields }) {
  const { user } = useAuthStore();
  const [newForm, setNewForm] = useState(false);
  const navigate = useNavigate();
  const [getting, setGetting] = useState(false);
  const [forms, setForms] = useState([]);
  useEffect(() => {
    if (newForm) {
      navigate("/dashboard/create");
    }
  }, [newForm]);
  useEffect(() => {
    const getForms = async () => {
      try {
        setGetting(true);
        const res = await axios.get(`${BASE_URL}/form/get-forms`, {
          params: { userId: user.id },
        });
        setForms(res.data.data);
        console.log(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setGetting(false);
      }
    };
    if (user) getForms();
  }, []);
  if (getting)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BarLoader />
      </div>
    );
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 md:p-8 flex flex-col bg-background min-h-screen"
    >
      <div className="mb-8 flex flex-row justify-between">
        <div>
          <h2 className="text-4xl font-bold text-foreground mb-2">
            My Forms Dashboard
          </h2>
          <p className="text-muted-foreground text-lg">
            View, manage, and analyze all your created forms in one place.
          </p>
        </div>
        <Generate setNewForm={setNewForm} setFormFields={setFormFields} />
      </div>
      <div>
        <FormCards forms={forms} setForms={setForms}/>
      </div>
    </motion.div>
  );
}

export default DashBoardHome;
