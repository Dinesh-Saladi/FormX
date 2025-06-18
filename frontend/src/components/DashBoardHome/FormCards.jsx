import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Share, Trash } from "lucide-react";
function FormCards({ forms }) {
  const navigate = useNavigate();
  console.log(forms);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {forms.map((form) => {
        return (
          <Link to={`/form/${form.uuid}`}>
            <Card
              key={form.uuid}
              className="w-full h-full max-w-md rounded-xl shadow-md hover:shadow-2xl flex flex-col justify-center"
            >
              <CardHeader>
                <CardTitle className="text-start text-xl">
                  {form.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-start">
                  <p className="text-sm text-muted-foreground">
                    Created:{" "}
                    {formatDistanceToNow(new Date(form.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Responses: {form.responses}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-2">
                <Link to="/">
                  <Button
                    variant="outline"
                    className="flex gap-2 items-center mt-1"
                  >
                    <Share />
                    <span>Share</span>
                  </Button>
                </Link>
                <Link to="/form">
                  <Button
                    className="flex gap-2 items-center mt-1"
                    onClick={() => {
                      console.log("clicked.....");
                      navigate("/");
                    }}
                  >
                    <Trash />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export default FormCards;
