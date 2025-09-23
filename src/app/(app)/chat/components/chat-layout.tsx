'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, Send, User } from 'lucide-react';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAnswer } from '../actions';
import type { ChatMessage, ChatHistory } from '@/lib/types';
import { useSettings } from '@/contexts/settings-context';
import { Skeleton } from '@/components/ui/skeleton';

const chatSchema = z.object({
  message: z.string().min(1, 'Message is required'),
});

const initialMessage: ChatMessage = {
  id: 'initial-message',
  role: 'model',
  content: "Hello! I'm StudyWise AI. How can I help you today?",
};


export default function ChatLayout() {
  const { tone } = useSettings();
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: '',
    },
  });

  const generateId = () => {
    // This function will only be called on the client
    return crypto.randomUUID();
  };

  const onSubmit = async (data: z.infer<typeof chatSchema>) => {
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: data.message,
    };
    
    // Filter out the initial message before creating the history
    const conversationMessages = messages.filter(m => m.id !== 'initial-message');
    const newMessages: ChatMessage[] = [...conversationMessages, userMessage];
    setMessages([initialMessage, ...newMessages]);
    setIsLoading(true);
    form.reset();

    // Convert ChatMessage[] to ChatHistory[] for the API
    const history: ChatHistory = newMessages.map(({ role, content }) => ({
        role,
        parts: [{ text: content }],
    }));

    const result = await getAnswer(data.message, `Respond in a ${tone} tone.`, history);
    
    const aiMessage: ChatMessage = {
      id: generateId(),
      role: 'model',
      content: result.answer,
    };
    setMessages((prev) => {
        // Find the user message and remove it to replace with the full history
        const updatedMessages = prev.filter(m => m.id !== userMessage.id);
        return [...updatedMessages, userMessage, aiMessage];
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'model' && (
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback><Bot size={20} className="text-primary" /></AvatarFallback>
                </Avatar>
              )}
              <Card
                className={`max-w-xl p-3 shadow-sm ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </Card>
              {message.role === 'user' && (
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback><User size={20} /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-4">
                <Avatar className="w-8 h-8 border">
                  <AvatarFallback><Bot size={20} className="text-primary" /></AvatarFallback>
                </Avatar>
                <Card className="max-w-xl p-3 shadow-sm bg-card">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </Card>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 bg-background border-t">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center gap-2"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Ask me anything about your studies..."
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
