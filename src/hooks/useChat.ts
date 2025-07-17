import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const AI_RESPONSES = [
  "Based on your spending patterns, I recommend setting aside 15% more for your emergency fund this month.",
  "Your sleep quality has improved by 12% this week! Try maintaining your current bedtime routine.",
  "I notice you've been spending more on dining out. Would you like me to suggest some healthy, budget-friendly meal prep ideas?",
  "Your stress levels seem elevated today. Consider taking a 10-minute meditation break - I can guide you through it.",
  "Great job hitting your step goal! Your cardiovascular health score has increased by 3 points this week.",
  "I found 3 investment opportunities that align with your risk profile and sustainability values.",
  "Your hydration levels are below optimal. I'll send you gentle reminders throughout the day.",
  "Based on your health data, you might benefit from increasing your vitamin D intake. Shall I find nearby sunshine spots?"
];

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: "Hi! I'm your AI health and wealth advisor. How can I help optimize your day?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Add AI response
    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      message: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiResponse]);
    setIsTyping(false);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage
  };
};