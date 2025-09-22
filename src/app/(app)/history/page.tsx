import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History as HistoryIcon } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
             <HistoryIcon className="w-12 h-12 text-muted-foreground" />
          </div>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This section will display your past chats, quizzes, and generated diagrams.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your learning journey will be saved here for easy access.</p>
        </CardContent>
      </Card>
    </div>
  );
}
