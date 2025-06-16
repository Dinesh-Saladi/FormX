import { Button } from "@/components/ui/button";
import Email from "./FormComponents/Email";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Text from "./FormComponents/Text";
import Radio from "./FormComponents/Radio";
import CheckBox from "./FormComponents/CheckBox";
import Select from "./FormComponents/Select";
import TextArea from "./FormComponents/TextArea";
import Date from "./FormComponents/Date";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip, Rocket, Trash2 } from "lucide-react";
import EditFields from "@/components/CreateForm/EditFields";
import AddFieldButton from "@/components/CreateForm/AddFieldButton";
import ChangeHeader from "./CreateForm/ChangeHeader";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function CreateForm({ formFieldsDash, setFormFieldsDash }) {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(formFieldsDash);
  const [formData, setFormData] = useState({});
  // console.log(formData);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );
  function SortFields({ field }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: field });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex items-start gap-2"
      >
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing p-2 rounded hover:bg-muted touch-none"
          aria-label="Drag to reorder"
          {...listeners}
          {...attributes}
        >
          <Grip className="h-5 w-5" />
        </button>
        <div className="flex-1">
          {field.type === "text" && (
            <Text
              fieldId={field.uuid}
              setFormData={setFormData}
              required={field.required}
              placeholder={field.placeholder}
              label={field.label}
            />
          )}
          {field.type === "email" && (
            <Email
              fieldId={field.uuid}
              setFormData={setFormData}
              required={field.required}
              placeholder={field.placeholder}
              label={field.label}
            />
          )}
          {field.type === "radio" && (
            <Radio
              fieldId={field.uuid}
              setFormData={setFormData}
              required={field.required}
              label={field.label}
              options={field.options}
            />
          )}
          {field.type === "checkbox" && (
            <CheckBox
              fieldId={field.uuid}
              setFormData={setFormData}
              required={field.required}
              label={field.label}
              options={field.options}
            />
          )}
          {field.type === "select" && (
            <Select
              fieldId={field.uuid}
              setFormData={setFormData}
              required={field.required}
              label={field.label}
              options={field.options}
            />
          )}
          {field.type === "textarea" && (
            <TextArea
              fieldId={field.uuid}
              setFormData={setFormData}
              required={field.required}
              placeholder={field.placeholder}
              label={field.label}
            />
          )}
          {field.type === "date" && (
            <Date
              fieldId={field.uuid}
              setFormData={setFormData}
              required={field.required}
              label={field.label}
            />
          )}
        </div>
        <EditFields setFormFields={setFormFields} field={field} />
        <Button
          variant="destructive"
          onClick={() => {
            setFormFields((prev) => {
              console.log(prev);
              const newFields = prev.fields.filter(
                (f) => f.uuid !== field.uuid
              );
              console.log(newFields);
              return {
                ...prev,
                fields: newFields,
              };
            });
          }}
          className="p-2 cursor-pointer"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  function onDragEnd(event) {
    const { active, over } = event;
    console.log(event);
    if (!over || active.id === over.id) {
      return;
    }
    setFormFields((prev) => {
      const oldIndex = prev.fields.findIndex(
        (field) => field.uuid === active.id.uuid
      );
      const newIndex = prev.fields.findIndex(
        (field) => field.uuid === over.id.uuid
      );
      console.log(oldIndex + " " + newIndex);
      const newFields = arrayMove(prev.fields, oldIndex, newIndex);

      console.log(newFields);

      return {
        ...prev,
        fields: newFields,
      };
    });
  }
  return (
    <div className="bg-background min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 flex flex-row justify-between pt-6 md:pt-8 px-6 md:px-8 items-center"
      >
        <div>
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Form Editor
          </h2>
          <p className="text-muted-foreground text-lg">
            You're in control — drag, drop, and tweak your form fields with
            ease.
          </p>
        </div>
        <Button
          onClick={() => {
            toast.success("Form Published");
            setFormFieldsDash({
              title: "Untitled",
              description: "Undescribed",
              fields: [],
            });
            navigate("/dashboard");
          }}
          className="shadow-2xl z-50 cursor-pointer flex items-center"
        >
          <Rocket className="h-10 w-10" />
          <h2>Publish Form</h2>
        </Button>
      </motion.div>
      <div className="flex flex-col justify-center items-center mt-5 ml-5 mr-5 md:mt-10 md:ml-10 md:mr-10 mb-16">
        <Card className="min-w-[350px] w-full max-w-md py-4 rounded-xl shadow-md">
          <CardHeader>
            <CardTitle>{formFields.title}</CardTitle>
            <CardDescription>{formFields.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(formData);
              }}
            >
              <div className="grid w-full items-center gap-4">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={onDragEnd}
                >
                  <SortableContext
                    items={formFields.fields}
                    strategy={verticalListSortingStrategy}
                  >
                    {formFields.fields.map((field) => (
                      <SortFields key={field.uuid} field={field} />
                    ))}
                  </SortableContext>
                </DndContext>
                <Button className="w-full cursor-pointer" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <ChangeHeader setFormFields={setFormFields} formFields={formFields} />
      <AddFieldButton setFormFields={setFormFields} />
    </div>
  );
}

export default CreateForm;
