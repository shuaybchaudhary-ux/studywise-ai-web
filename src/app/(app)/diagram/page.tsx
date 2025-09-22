'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getDiagram } from './actions';
import MermaidDiagram from './components/mermaid-diagram';
import { Skeleton } from '@/components/ui/skeleton';

const diagramSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters long'),
});

export default function DiagramPage() {
  const [diagramCode, setDiagramCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState('');

  const form = useForm<z.infer<typeof diagramSchema>>({
    resolver: zodResolver(diagramSchema),
    defaultValues: {
      topic: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof diagramSchema>) => {
    setIsLoading(true);
    setDiagramCode('');
    setTopic(data.topic);
    const result = await getDiagram(data.topic);
    setDiagramCode(result.diagramCode);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Interactive Diagram Generator</CardTitle>
          <CardDescription>
            Enter a topic to generate a visual diagram (flowchart, mindmap,
            etc.).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., The Water Cycle, How a Bill Becomes Law"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Diagram'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || diagramCode) && (
        <Card>
          <CardHeader>
            <CardTitle>Diagram for: {topic}</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <Skeleton className="h-64 w-full" />}
            {diagramCode && <MermaidDiagram code={diagramCode} />}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
