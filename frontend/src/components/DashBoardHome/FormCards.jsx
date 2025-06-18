import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
function FormCards({ forms }) {
  console.log(forms);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {forms.map((form) => {
        return (
          <Card
            key={form.uuid}
            className="w-full max-w-md rounded-xl shadow-md hover:shadow-2xl flex flex-col justify-center"
          >
            <CardHeader>
              <CardTitle className="text-start text-xl">{form.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col w-full items-start">
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
          </Card>
        );
      })}
    </div>
  );
}

export default FormCards;
