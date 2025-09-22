'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSettings, type Tone } from '@/contexts/settings-context';

export default function SettingsPage() {
  const { tone, setTone } = useSettings();

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Customize your StudyWise AI experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ai-tone">AI Tutor Tone</Label>
            <Select value={tone} onValueChange={(value: Tone) => setTone(value)}>
              <SelectTrigger id="ai-tone" className="w-[180px]">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                <SelectItem value="humorous">Humorous</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Choose how you want the AI tutor to communicate with you.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
