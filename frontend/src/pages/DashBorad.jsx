import { useEffect, useState } from "react";
import CreateForm from "../components/CreateForm";
import DashBoardHome from "../components/DashBoardHome";
import SideBar from "../components/SideBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

function DashBorad() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    title: "Untitled",
    description: "Undescribed",
    fields: [],
  });
  console.log(formFields);  

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  if (!user) return null;
  
  return (
    <div className="flex h-screen">
      <SideBar />
      <main className="flex-1 overflow-y-auto mt-16 md:mt-0">
        <Routes>
          <Route
            path="/"
            element={<DashBoardHome setFormFields={setFormFields} />}
          />
          <Route
            path="/create"
            element={
              <CreateForm
                formFieldsDash={formFields}
                setFormFieldsDash={setFormFields}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default DashBorad;
