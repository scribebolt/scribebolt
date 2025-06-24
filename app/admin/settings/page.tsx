"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, Mail, Shield, Bell, Database, Zap } from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    // Contact Settings
    adminEmail: "admin@scribebolt.com",
    supportEmail: "support@scribebolt.com",
    supportLink: "https://help.scribebolt.com",

    // Feature Toggles
    enableNewUserRegistration: true,
    enableEmailAnalyzer: true,
    enableBulkProcessing: true,
    enableTeamWorkspace: true,
    enableAPIAccess: true,

    // System Settings
    maxEmailsPerDay: 1000,
    maxTemplatesPerUser: 50,
    sessionTimeout: 24,

    // Notification Settings
    enableSystemAlerts: true,
    enableUsageAlerts: true,
    enableSecurityAlerts: true,

    // Maintenance
    maintenanceMode: false,
    maintenanceMessage: "ScribeBolt is currently undergoing scheduled maintenance. We'll be back shortly!",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const handleInputChange = (key: string, value: string | number | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSaveMessage("Settings saved successfully!")
    setIsSaving(false)

    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(""), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-600 mt-2">Configure system settings and feature toggles</p>
      </div>

      {saveMessage && (
        <Alert>
          <AlertDescription>{saveMessage}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Settings
            </CardTitle>
            <CardDescription>Configure admin and support contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleInputChange("adminEmail", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleInputChange("supportEmail", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportLink">Support Link</Label>
              <Input
                id="supportLink"
                type="url"
                value={settings.supportLink}
                onChange={(e) => handleInputChange("supportLink", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Limits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              System Limits
            </CardTitle>
            <CardDescription>Configure system-wide usage limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxEmailsPerDay">Max Emails Per Day (per user)</Label>
              <Input
                id="maxEmailsPerDay"
                type="number"
                value={settings.maxEmailsPerDay}
                onChange={(e) => handleInputChange("maxEmailsPerDay", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxTemplatesPerUser">Max Templates Per User</Label>
              <Input
                id="maxTemplatesPerUser"
                type="number"
                value={settings.maxTemplatesPerUser}
                onChange={(e) => handleInputChange("maxTemplatesPerUser", Number.parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange("sessionTimeout", Number.parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Toggles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Feature Toggles
          </CardTitle>
          <CardDescription>Enable or disable application features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New User Registration</Label>
                  <p className="text-sm text-gray-600">Allow new users to sign up</p>
                </div>
                <Switch
                  checked={settings.enableNewUserRegistration}
                  onCheckedChange={(checked) => handleInputChange("enableNewUserRegistration", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Analyzer</Label>
                  <p className="text-sm text-gray-600">Enable email analysis feature</p>
                </div>
                <Switch
                  checked={settings.enableEmailAnalyzer}
                  onCheckedChange={(checked) => handleInputChange("enableEmailAnalyzer", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bulk Processing</Label>
                  <p className="text-sm text-gray-600">Enable bulk email processing</p>
                </div>
                <Switch
                  checked={settings.enableBulkProcessing}
                  onCheckedChange={(checked) => handleInputChange("enableBulkProcessing", checked)}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Team Workspace</Label>
                  <p className="text-sm text-gray-600">Enable team collaboration features</p>
                </div>
                <Switch
                  checked={settings.enableTeamWorkspace}
                  onCheckedChange={(checked) => handleInputChange("enableTeamWorkspace", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>API Access</Label>
                  <p className="text-sm text-gray-600">Enable API endpoints</p>
                </div>
                <Switch
                  checked={settings.enableAPIAccess}
                  onCheckedChange={(checked) => handleInputChange("enableAPIAccess", checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Configure system notification preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Alerts</Label>
                <p className="text-sm text-gray-600">Receive alerts for system events</p>
              </div>
              <Switch
                checked={settings.enableSystemAlerts}
                onCheckedChange={(checked) => handleInputChange("enableSystemAlerts", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Usage Alerts</Label>
                <p className="text-sm text-gray-600">Receive alerts for usage thresholds</p>
              </div>
              <Switch
                checked={settings.enableUsageAlerts}
                onCheckedChange={(checked) => handleInputChange("enableUsageAlerts", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Security Alerts</Label>
                <p className="text-sm text-gray-600">Receive alerts for security events</p>
              </div>
              <Switch
                checked={settings.enableSecurityAlerts}
                onCheckedChange={(checked) => handleInputChange("enableSecurityAlerts", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Maintenance Mode
          </CardTitle>
          <CardDescription>Enable maintenance mode to restrict user access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Maintenance Mode</Label>
              <p className="text-sm text-gray-600">Temporarily disable user access</p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
            />
          </div>
          {settings.maintenanceMode && (
            <div className="space-y-2">
              <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
              <Textarea
                id="maintenanceMessage"
                value={settings.maintenanceMessage}
                onChange={(e) => handleInputChange("maintenanceMessage", e.target.value)}
                placeholder="Enter message to display to users..."
                rows={3}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="bg-purple-600 hover:bg-purple-700">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
