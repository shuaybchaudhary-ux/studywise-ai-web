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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createPlan } from './actions';
import { Skeleton } from '@/components/ui/skeleton';

const planSchema = z.object({
  learningPreferences: z.string().min(3, 'Required'),
  timeConstraints: z.string().min(3, 'Required'),
  examDates: z.string().min(3, 'Required'),
  topics: z.string().min(3, 'Required'),
});

export default function StudyPlanPage() {
  const [studyPlan, setStudyPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof planSchema>>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      learningPreferences: '',
      timeConstraints: '',
      examDates: '',
      topics: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof planSchema>) => {
    setIsLoading(true);
    setStudyPlan('');
    const result = await createPlan(data);
    setStudyPlan(result.studyPlan);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Study Plan</CardTitle>
          <CardDescription>
            Fill out your details below and our AI will generate a custom study plan for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="learningPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning Preferences</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Visual, Auditory, Kinesthetic"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeConstraints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Constraints</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 2 hours per day, weekends only"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="examDates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upcoming Exam Dates</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Mid-term on Oct 15th, Final on Dec 10th"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topics to Study</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List all subjects and topics you need to cover"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating Plan...' : 'Generate Study Plan'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || studyPlan) && (
        <Card>
          <CardHeader>
            <CardTitle>Your Personalized Study Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
            {studyPlan && <p className="whitespace-pre-wrap">{studyPlan}</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
