import { useState } from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { format } from "date-fns"
import { cn } from "@/lib/utils";

function Date({ fieldId, setFormData, required, label }) {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="date">{label}</Label>
      {/* <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="cursor-pointer justify-between font-normal w-full"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setFormData((p) => ({ ...p, [fieldId]: date }));
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal cursor-pointer hover:text-muted-foreground",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            className="cursor-pointer"
            onSelect={(date) => {
              setDate(date);
              setFormData((p) => ({ ...p, [fieldId]: date }));
              setOpen(false);
            }}
            autoFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        id="date"
        type="text"
        value={date || ""}
        onChange={() => {}}
        required={required}
        style={{
          position: "absolute",
          opacity: 0,
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
        tabIndex={-1}
      />
    </div>
  );
}

export default Date;
