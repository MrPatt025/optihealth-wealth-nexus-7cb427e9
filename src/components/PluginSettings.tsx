import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Save, RotateCcw } from 'lucide-react';
import { usePlugins, PluginMetadata } from '@/contexts/PluginContext';
import { useToast } from '@/hooks/use-toast';

interface PluginSettingsProps {
  plugin: PluginMetadata;
  trigger?: React.ReactNode;
}

export function PluginSettings({ plugin, trigger }: PluginSettingsProps) {
  const { updatePluginSettings, getPluginSettings } = usePlugins();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(() => getPluginSettings(plugin.id));

  const handleSave = () => {
    updatePluginSettings(plugin.id, settings);
    toast({
      title: "Settings Saved",
      description: `Settings for ${plugin.name} have been updated.`,
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    setSettings({});
    toast({
      title: "Settings Reset",
      description: `Settings for ${plugin.name} have been reset to defaults.`,
    });
  };

  const renderField = (field: any, key: string) => {
    const value = settings[key] || field.default;

    switch (field.type) {
      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={key}
              checked={value || false}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ ...prev, [key]: checked }))
              }
            />
            <Label htmlFor={key}>{field.title}</Label>
          </div>
        );

      case 'number':
        return (
          <div className="space-y-2">
            <Label htmlFor={key}>{field.title}</Label>
            <Input
              id={key}
              type="number"
              value={value || field.default || 0}
              onChange={(e) => 
                setSettings(prev => ({ ...prev, [key]: parseInt(e.target.value) || 0 }))
              }
              min={field.minimum}
              max={field.maximum}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case 'string':
        if (field.enum) {
          return (
            <div className="space-y-2">
              <Label htmlFor={key}>{field.title}</Label>
              <Select
                value={value || field.default}
                onValueChange={(newValue) => 
                  setSettings(prev => ({ ...prev, [key]: newValue }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {field.enum.map((option: string) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {field.description && (
                <p className="text-sm text-muted-foreground">{field.description}</p>
              )}
            </div>
          );
        }

        return (
          <div className="space-y-2">
            <Label htmlFor={key}>{field.title}</Label>
            {field.format === 'textarea' ? (
              <Textarea
                id={key}
                value={value || field.default || ''}
                onChange={(e) => 
                  setSettings(prev => ({ ...prev, [key]: e.target.value }))
                }
                placeholder={field.description}
              />
            ) : (
              <Input
                id={key}
                type="text"
                value={value || field.default || ''}
                onChange={(e) => 
                  setSettings(prev => ({ ...prev, [key]: e.target.value }))
                }
                placeholder={field.description}
              />
            )}
          </div>
        );

      case 'object':
        return (
          <div className="space-y-4">
            <Label>{field.title}</Label>
            <div className="pl-4 border-l-2 border-muted space-y-3">
              {Object.entries(field.properties || {}).map(([subKey, subField]: [string, any]) => (
                <div key={subKey}>
                  {renderField(subField, `${key}.${subKey}`)}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <Settings className="h-4 w-4 mr-2" />
      Settings
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img src={plugin.icon} alt="" className="h-5 w-5" />
            {plugin.name} Settings
          </DialogTitle>
          <DialogDescription>
            Configure settings for {plugin.name} v{plugin.version}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {plugin.settingsSchema?.properties ? (
            Object.entries(plugin.settingsSchema.properties).map(([key, field]: [string, any]) => (
              <div key={key} className="space-y-2">
                {renderField(field, key)}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No configurable settings available for this plugin.</p>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}