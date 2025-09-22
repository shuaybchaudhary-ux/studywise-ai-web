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
import { generateQuestions } from './actions';
import { Skeleton } from '@/components/ui/skeleton';

const quizSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters long'),
});

export default function QuizPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [topic, setTopic] = useState('');

  const form = useForm<z.infer<typeof quizSchema>>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      topic: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof quizSchema>) => {
    setIsLoading(true);
    setQuestions([]);
    setTopic(data.topic);
    const result = await generateQuestions(data.topic);
    setQuestions(result);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Practice Quiz Generator</CardTitle>
          <CardDescription>
            Enter a topic to generate practice questions and test your
            knowledge.
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
                        placeholder="e.g., Photosynthesis, The Renaissance"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Questions'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || questions.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Practice Questions for: {topic}</CardTitle>
            <CardDescription>
              Review these questions. Note: This AI generates open-ended questions, not multiple-choice quizzes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="p-4">
                  <Skeleton className="h-5 w-3/4" />
                </Card>
              ))}
            {questions.map((q, index) => (
              <Card key={index} className="p-4">
                <p>
                  <strong>{index + 1}.</strong> {q}
                </p>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
