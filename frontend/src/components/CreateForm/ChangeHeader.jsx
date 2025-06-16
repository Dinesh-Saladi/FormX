import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Pen } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function ChangeHeader({ formFields, setFormFields }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(formFields.title);
  const [description, setDescription] = useState(formFields.description);
  function HandleSubmit() {
    setFormFields((prev) => ({
      ...prev,
      title: title,
      description: description,
    }));
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-5 ml-5 shadow-2xl z-50 cursor-pointer flex items-center">
            <Pen className="h-10 w-10" />
            <h2>Change Headers</h2>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Headers</DialogTitle>
            <DialogDescription>Change the following details</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              HandleSubmit();
              console.log("submitted...");
              setOpen(false);
            }}
          >
            <div className="flex flex-col gap-2 pb-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="cursor-pointer">
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChangeHeader;
