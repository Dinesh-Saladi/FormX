import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BACKEND_API + "/api";

function Form() {
  const { formId } = useParams();
  useEffect(() => {
    const getForm = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/form/get-form`, {
          params: {
            formId,
          },
        });
        console.log(JSON.parse(res.data.data.form_fields));
        toast.success("got the data");
      } catch (e) {
        console.log(e);
        toast.error("try again");
      }
    };
    getForm();
  }, []);
  return <div>Form</div>;
}

export default Form;
