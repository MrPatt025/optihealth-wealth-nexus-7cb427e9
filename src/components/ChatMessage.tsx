import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 p-4 animate-fade-in",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={cn(
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-gradient-accent text-background"
        )}>
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "max-w-[70%] rounded-lg px-4 py-2 shadow-md",
        isUser 
          ? "bg-primary text-primary-foreground ml-auto" 
          : "bg-card text-card-foreground"
      )}>
        <p className="text-sm">{message}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};