import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SecurityMonitorProps {
  settings?: Record<string, any>;
}

const SecurityMonitor: React.FC<SecurityMonitorProps> = ({ settings = {} }) => {
  const securityStatus = [
    { label: 'Firewall Status', status: 'Active', level: 'secure', icon: Shield },
    { label: 'Last Scan', status: '2 min ago', level: 'secure', icon: CheckCircle },
    { label: 'Threats Blocked', status: '12 today', level: 'warning', icon: AlertTriangle },
    { label: 'Encryption', status: 'AES-256', level: 'secure', icon: Lock },
  ];

  const getStatusColor = (level: string) => {
    switch (level) {
      case 'secure': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'danger': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusVariant = (level: string) => {
    switch (level) {
      case 'secure': return 'default';
      case 'warning': return 'secondary';
      case 'danger': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Security Monitor
        </CardTitle>
        <CardDescription>
          Real-time security status and threat monitoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {securityStatus.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <item.icon className={`h-4 w-4 ${getStatusColor(item.level)}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              <Badge variant={getStatusVariant(item.level) as any}>
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityMonitor;