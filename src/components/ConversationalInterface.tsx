import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Mic, MicOff, Brain, Sparkles } from "lucide-react";

const mockConversations = [
  {
    type: 'user',
    message: "How can I optimize my health spending this month?",
    timestamp: "2 minutes ago"
  },
  {
    type: 'ai',
    message: "Based on your health patterns, I recommend allocating 40% more to preventive care and reducing supplement spending by 15%. This could save you $240 monthly while improving your wellness score by 23%.",
    timestamp: "2 minutes ago",
    insights: [
      { label: "Potential Savings", value: "$240/month", trend: "up" },
      { label: "Wellness Impact", value: "+23%", trend: "up" },
      { label: "Risk Reduction", value: "12%", trend: "down" }
    ]
  },
  {
    type: 'user',
    message: "Show me my investment opportunities",
    timestamp: "5 minutes ago"
  },
  {
    type: 'ai',
    message: "I've identified 3 ESG investment opportunities aligned with your health values. Here's a personalized portfolio that balances your financial goals with wellness-focused companies.",
    timestamp: "5 minutes ago",
    insights: [
      { label: "Expected ROI", value: "8.4%", trend: "up" },
      { label: "ESG Score", value: "A+", trend: "stable" },
      { label: "Risk Level", value: "Moderate", trend: "stable" }
    ]
  }
];

export const ConversationalInterface = () => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      setIsTyping(true);
      setMessage("");
      // Simulate AI response delay
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
            Chat with Your AI Health & Wealth Coach
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Natural conversations that understand context, remember your goals, and provide actionable insights 
            with explainable AI reasoning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Chat Interface */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Brain className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">NEXUS AI</h3>
                  <p className="text-sm text-muted-foreground">Your Personal Coach</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs text-success">Online</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {mockConversations.map((conv, index) => (
                  <div key={index} className={`flex ${conv.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      conv.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <p className="text-sm">{conv.message}</p>
                      {conv.insights && (
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {conv.insights.map((insight, idx) => (
                            <div key={idx} className="text-center p-2 bg-background/20 rounded">
                              <div className={`text-xs font-medium ${
                                insight.trend === 'up' ? 'text-success' : 
                                insight.trend === 'down' ? 'text-destructive' : 'text-foreground'
                              }`}>
                                {insight.value}
                              </div>
                              <div className="text-xs opacity-70">{insight.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="text-xs opacity-50 mt-2">{conv.timestamp}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about your health, finances, or goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  variant={isListening ? "destructive" : "outline"} 
                  size="icon"
                  onClick={toggleVoice}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button variant="accent" size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">AI Capabilities</h3>
            
            {[
              {
                icon: <Sparkles className="h-5 w-5 text-accent" />,
                title: "Contextual Memory",
                description: "Remembers your goals, preferences, and conversation history for personalized advice."
              },
              {
                icon: <Brain className="h-5 w-5 text-primary-glow" />,
                title: "Explainable AI",
                description: "Every recommendation comes with clear reasoning and data sources you can verify."
              },
              {
                icon: <Mic className="h-5 w-5 text-success" />,
                title: "Voice & Text",
                description: "Seamless voice conversations with real-time transcription and audio responses."
              },
              {
                icon: <Send className="h-5 w-5 text-warning" />,
                title: "Multi-Modal Insights",
                description: "Text, charts, and interactive visualizations in a single conversation flow."
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-card transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};