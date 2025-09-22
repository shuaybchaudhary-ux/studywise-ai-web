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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getSummary } from './actions';
import { Skeleton } from '@/components/ui/skeleton';

const summarySchema = z.object({
  content: z.string().min(100, 'Content must be at least 100 characters long'),
});

export default function SummarizePage() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof summarySchema>>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof summarySchema>) => {
    setIsLoading(true);
    setSummary('');
    const result = await getSummary(data.content);
    setSummary(result.summary);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Concept Summarization</CardTitle>
          <CardDescription>
            Paste any complex topic or educational content below to get a concise summary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content to Summarize</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your text here..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Summarizing...' : 'Generate Summary'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || summary) && (
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
            {summary && <p className="whitespace-pre-wrap">{summary}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
