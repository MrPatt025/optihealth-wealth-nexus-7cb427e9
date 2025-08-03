import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
  variant?: 'default' | 'card' | 'table' | 'profile';
}

export function LoadingSkeleton({ 
  className, 
  lines = 3, 
  showAvatar = false, 
  variant = 'default' 
}: LoadingSkeletonProps) {
  const renderDefault = () => (
    <div className={cn("space-y-3", className)}>
      {showAvatar && (
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-muted rounded-full loading-shimmer" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-24 loading-shimmer" />
            <div className="h-3 bg-muted rounded w-16 loading-shimmer" />
          </div>
        </div>
      )}
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i}
          className={cn(
            "h-4 bg-muted rounded loading-shimmer",
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );

  const renderCard = () => (
    <div className={cn("border rounded-lg p-6 space-y-4", className)}>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-muted rounded-lg loading-shimmer" />
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-muted rounded w-1/3 loading-shimmer" />
          <div className="h-4 bg-muted rounded w-1/2 loading-shimmer" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded loading-shimmer" />
        <div className="h-4 bg-muted rounded w-5/6 loading-shimmer" />
      </div>
    </div>
  );

  const renderTable = () => (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <div className="h-12 bg-muted rounded w-12 loading-shimmer" />
          <div className="h-12 bg-muted rounded flex-1 loading-shimmer" />
          <div className="h-12 bg-muted rounded w-24 loading-shimmer" />
          <div className="h-12 bg-muted rounded w-16 loading-shimmer" />
        </div>
      ))}
    </div>
  );

  const renderProfile = () => (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-muted rounded-full loading-shimmer" />
        <div className="space-y-3">
          <div className="h-6 bg-muted rounded w-32 loading-shimmer" />
          <div className="h-4 bg-muted rounded w-24 loading-shimmer" />
          <div className="h-4 bg-muted rounded w-40 loading-shimmer" />
        </div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-5 bg-muted rounded w-1/4 loading-shimmer" />
            <div className="h-4 bg-muted rounded loading-shimmer" />
            <div className="h-4 bg-muted rounded w-3/4 loading-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );

  switch (variant) {
    case 'card':
      return renderCard();
    case 'table':
      return renderTable();
    case 'profile':
      return renderProfile();
    default:
      return renderDefault();
  }
}