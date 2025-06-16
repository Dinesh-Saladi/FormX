import { motion } from "framer-motion";
import Generate from "./CreateForm/Generate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashBoardHome({ setFormFields }) {
  const [newForm, setNewForm] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (newForm) {
      navigate("/dashboard/create");
    }
  }, [newForm]);
  return (
    <div className="p-6 md:p-8 bg-background min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex flex-row justify-between"
      >
        <div>
          <h2 className="text-4xl font-bold text-foreground mb-2">
            My Forms Dashboard
          </h2>
          <p className="text-muted-foreground text-lg">
            View, manage, and analyze all your created forms in one place.
          </p>
        </div>
        <Generate setNewForm={setNewForm} setFormFields={setFormFields} />
      </motion.div>
    </div>
  );
}

export default DashBoardHome;
