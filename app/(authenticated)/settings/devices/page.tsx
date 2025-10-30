'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Watch, Smartphone, Activity, Plus, Link as LinkIcon } from 'lucide-react';

export default function DevicesSettingsPage() {
  const router = useRouter();
  const [devices, setDevices] = useState([
    {
      id: '1',
      name: 'Apple Watch Series 9',
      type: 'watch',
      brand: 'Apple Health',
      connected: true,
      lastSync: '2 hours ago',
      metrics: ['Heart Rate', 'Steps', 'Sleep']
    },
    {
      id: '2',
      name: 'iPhone 15 Pro',
      type: 'phone',
      brand: 'Apple Health',
      connected: true,
      lastSync: '5 minutes ago',
      metrics: ['Activity', 'Mindfulness']
    }
  ]);

  const availableDevices = [
    { id: 'fitbit', name: 'Fitbit', icon: Watch },
    { id: 'garmin', name: 'Garmin', icon: Watch },
    { id: 'whoop', name: 'WHOOP', icon: Activity },
    { id: 'oura', name: 'Oura Ring', icon: Watch },
    { id: 'googlefit', name: 'Google Fit', icon: Smartphone }
  ];

  const toggleDevice = (deviceId: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, connected: !device.connected }
        : device
    ));
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'watch':
        return Watch;
      case 'phone':
        return Smartphone;
      default:
        return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="mb-2"
          >
            ← Back
          </Button>
          <h1 className="text-2xl font-bold text-stone-900">Wearables & Devices</h1>
          <p className="text-stone-600 mt-1">
            Connect your devices to track progress
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        
        {/* Connected Devices */}
        <Card>
          <CardHeader>
            <CardTitle>Connected Devices</CardTitle>
            <CardDescription>Manage your connected wearables</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {devices.length === 0 ? (
              <div className="text-center py-8">
                <Watch className="h-12 w-12 mx-auto mb-3 text-stone-400" />
                <p className="text-sm text-stone-600">No devices connected yet</p>
              </div>
            ) : (
              devices.map((device) => {
                const DeviceIcon = getDeviceIcon(device.type);
                return (
                  <div key={device.id} className="border border-stone-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                          <DeviceIcon className="h-5 w-5 text-stone-900" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-stone-900">
                            {device.name}
                          </h3>
                          <p className="text-xs text-stone-600">{device.brand}</p>
                          <p className="text-xs text-stone-500 mt-1">
                            Last synced: {device.lastSync}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={
                            device.connected 
                              ? "bg-stone-100 text-stone-900 border-stone-200"
                              : "bg-stone-50 text-stone-500 border-stone-100"
                          }
                        >
                          {device.connected ? 'Connected' : 'Disconnected'}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                      <div>
                        <p className="text-xs text-stone-600">Tracking</p>
                        <p className="text-sm text-stone-900 mt-0.5">
                          {device.metrics.join(', ')}
                        </p>
                      </div>
                      <Switch
                        checked={device.connected}
                        onCheckedChange={() => toggleDevice(device.id)}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Add New Device */}
        <Card>
          <CardHeader>
            <CardTitle>Add Device</CardTitle>
            <CardDescription>Connect a new wearable or app</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {availableDevices.map((device) => {
                const Icon = device.icon;
                return (
                  <Button
                    key={device.id}
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2"
                  >
                    <Icon className="h-6 w-6 text-stone-900" />
                    <span className="text-sm">{device.name}</span>
                  </Button>
                );
              })}
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 border-dashed"
              >
                <Plus className="h-6 w-6 text-stone-600" />
                <span className="text-sm text-stone-600">Other</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Permissions */}
        <Card>
          <CardHeader>
            <CardTitle>Data Permissions</CardTitle>
            <CardDescription>Control what data is collected</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="heart-rate">Heart Rate</Label>
                <p className="text-xs text-stone-600">
                  Track stress and recovery metrics
                </p>
              </div>
              <Switch id="heart-rate" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="activity">Activity & Steps</Label>
                <p className="text-xs text-stone-600">
                  Monitor daily movement patterns
                </p>
              </div>
              <Switch id="activity" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sleep">Sleep Data</Label>
                <p className="text-xs text-stone-600">
                  Analyze sleep quality and patterns
                </p>
              </div>
              <Switch id="sleep" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="mindfulness">Mindfulness Minutes</Label>
                <p className="text-xs text-stone-600">
                  Track meditation and breathing
                </p>
              </div>
              <Switch id="mindfulness" />
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-stone-100 border-stone-200">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <LinkIcon className="h-5 w-5 text-stone-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-stone-900 mb-1">
                  Why connect devices?
                </p>
                <p className="text-xs text-stone-700">
                  Connected devices help your coach understand your physical and mental state, 
                  enabling more personalized coaching and better insights into your progress.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

