"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Edit3,
  FileText,
  Users,
  Settings,
  LogOut,
  Save,
  Sparkles,
  User,
  Moon,
  Sun,
  Bell,
  Shield,
  CreditCard,
  Key,
  Mail,
  Globe,
  Trash2,
  AlertTriangle,
  Crown,
  Upload,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-context"

export default function SettingsPage() {
  const { isDark, toggleTheme } = useTheme()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Profile settings
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [email, setEmail] = useState("john@company.com")
  const [company, setCompany] = useState("Acme Corp")
  const [bio, setBio] = useState("Marketing Director focused on growth and customer acquisition.")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [weeklyReports, setWeeklyReports] = useState(true)
  const [usageAlerts, setUsageAlerts] = useState(true)

  // AI settings
  const [defaultTone, setDefaultTone] = useState("professional")
  const [creativity, setCreativity] = useState("balanced")
  const [autoSave, setAutoSave] = useState(true)

  // API settings
  const [apiKey, setApiKey] = useState("sk-1234567890abcdef")
  const [webhookUrl, setWebhookUrl] = useState("")

  const handleSaveProfile = () => {
    // In a real app, this would save to the backend
    console.log("Saving profile...")
  }

  const handleDeleteAccount = () => {
    // In a real app, this would delete the account
    console.log("Deleting account...")
    setIsDeleteDialogOpen(false)
  }

  const generateNewApiKey = () => {
    const newKey = "sk-" + Math.random().toString(36).substring(2, 18)
    setApiKey(newKey)
  }

  return (
    <div className={`${isDark ? "dark" : ""} theme-transition`}>
      <SidebarProvider>
        <div className={`flex h-screen transition-all duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
          <DashboardSidebar />
          <SidebarInset className="flex-1">
            <main className="flex-1 overflow-auto">
              <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                  <h1
                    className={`text-3xl font-bold mb-2 transition-colors duration-300 ${isDark ? "text-white" : "text-[#1A1A1A]"}`}
                  >
                    Settings
                  </h1>
                  <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                    Manage your account, preferences, and integrations
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Settings */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Profile Settings */}
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <User className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          Profile Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                              First Name
                            </Label>
                            <Input
                              id="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                              Last Name
                            </Label>
                            <Input
                              id="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Company
                          </Label>
                          <Input
                            id="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Bio
                          </Label>
                          <Textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                            rows={3}
                          />
                        </div>

                        <Button onClick={handleSaveProfile} className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white">
                          <Save className="h-4 w-4 mr-2" />
                          Save Profile
                        </Button>
                      </CardContent>
                    </Card>

                    {/* AI Preferences */}
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <Sparkles className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          AI Preferences
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="defaultTone" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Default Email Tone
                          </Label>
                          <Select value={defaultTone} onValueChange={setDefaultTone}>
                            <SelectTrigger className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="friendly">Friendly</SelectItem>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="direct">Direct</SelectItem>
                              <SelectItem value="funny">Funny</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="creativity" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            AI Creativity Level
                          </Label>
                          <Select value={creativity} onValueChange={setCreativity}>
                            <SelectTrigger className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="conservative">Conservative</SelectItem>
                              <SelectItem value="balanced">Balanced</SelectItem>
                              <SelectItem value="creative">Creative</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <Label htmlFor="autoSave" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                              Auto-save generated emails
                            </Label>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              Automatically save generated emails to templates
                            </p>
                          </div>
                          <Switch id="autoSave" checked={autoSave} onCheckedChange={setAutoSave} />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Notifications */}
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <Bell className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          Notifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="emailNotifications"
                              className="text-sm font-medium text-[#1A1A1A] dark:text-white"
                            >
                              Email Notifications
                            </Label>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Receive notifications about account activity
                            </p>
                          </div>
                          <Switch
                            id="emailNotifications"
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="marketingEmails"
                              className="text-sm font-medium text-[#1A1A1A] dark:text-white"
                            >
                              Marketing Emails
                            </Label>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Receive updates about new features and tips
                            </p>
                          </div>
                          <Switch id="marketingEmails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label
                              htmlFor="weeklyReports"
                              className="text-sm font-medium text-[#1A1A1A] dark:text-white"
                            >
                              Weekly Reports
                            </Label>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Get weekly summaries of your usage
                            </p>
                          </div>
                          <Switch id="weeklyReports" checked={weeklyReports} onCheckedChange={setWeeklyReports} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="usageAlerts" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                              Usage Alerts
                            </Label>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Get notified when approaching plan limits
                            </p>
                          </div>
                          <Switch id="usageAlerts" checked={usageAlerts} onCheckedChange={setUsageAlerts} />
                        </div>
                      </CardContent>
                    </Card>

                    {/* API & Integrations */}
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <Key className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          API & Integrations
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="apiKey" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            API Key
                          </Label>
                          <div className="flex space-x-2">
                            <Input
                              id="apiKey"
                              value={apiKey}
                              readOnly
                              className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF] font-mono text-sm"
                            />
                            <Button
                              variant="outline"
                              onClick={generateNewApiKey}
                              className="border-gray-300 hover:bg-gray-50 dark:border-purple-500/30 dark:hover:bg-gray-700"
                            >
                              Regenerate
                            </Button>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Use this key to access the ScribeBolt API
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="webhookUrl" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Webhook URL (Optional)
                          </Label>
                          <Input
                            id="webhookUrl"
                            placeholder="https://your-app.com/webhook"
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                            className="border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                          />
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Receive notifications when emails are generated
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="shadow-sm border-red-200 dark:border-red-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-red-600">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          Danger Zone
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-500/30">
                          <h4 className="font-medium text-red-800 dark:text-red-400 mb-2">Delete Account</h4>
                          <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Account
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                  This action cannot be undone. This will permanently delete your account and remove all
                                  your data from our servers.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-end space-x-2 pt-4">
                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button variant="destructive" onClick={handleDeleteAccount}>
                                  Yes, delete my account
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-6">
                    {/* Current Plan */}
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <Crown className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          Current Plan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <Badge className="bg-[#7B61FF]/10 text-[#7B61FF] border-[#7B61FF]/20 mb-2">Pro Plan</Badge>
                          <p className="text-2xl font-bold text-[#1A1A1A] dark:text-white">$79/month</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Billed monthly</p>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Emails this month</span>
                            <span className="font-medium text-[#1A1A1A] dark:text-white">1,247 / 2,500</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-[#7B61FF] h-2 rounded-full" style={{ width: "50%" }}></div>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full border-[#7B61FF]/30 text-[#7B61FF] hover:bg-[#7B61FF]/5"
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          Manage Billing
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Account Security */}
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <Shield className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          Security
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-[#1A1A1A] dark:text-white">Two-Factor Auth</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Not enabled</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:bg-gray-50 dark:border-purple-500/30 dark:hover:bg-gray-700"
                          >
                            Enable
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-[#1A1A1A] dark:text-white">Password</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Last changed 3 months ago</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:bg-gray-50 dark:border-purple-500/30 dark:hover:bg-gray-700"
                          >
                            Change
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-[#1A1A1A] dark:text-white">Sessions</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">2 active sessions</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:bg-gray-50 dark:border-purple-500/30 dark:hover:bg-gray-700"
                          >
                            Manage
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Support */}
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <Mail className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          Support
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start border-gray-300 hover:bg-gray-50 dark:border-purple-500/30 dark:hover:bg-gray-700"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Help Center
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-gray-300 hover:bg-gray-50 dark:border-purple-500/30 dark:hover:bg-gray-700"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Contact Support
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

function DashboardSidebar() {
  const { isDark, toggleTheme } = useTheme()

  const menuItems = [
    { title: "Rewrite", icon: Edit3, href: "/dashboard" },
    { title: "Templates", icon: FileText, href: "/dashboard/templates" },
    { title: "Personas", icon: Users, href: "/dashboard/personas" },
    { title: "Bulk Personalization", icon: Upload, href: "/dashboard/bulk-personalization" },
    { title: "Email Analyzer", icon: Zap, href: "/dashboard/email-analyzer" },
    { title: "Team Workspace", icon: Users, href: "/dashboard/team-workspace" },
    { title: "Settings", icon: Settings, href: "/dashboard/settings", active: true },
  ]

  return (
    <Sidebar
      className={`border-r transition-all duration-300 ${
        isDark ? "border-purple-500/30 bg-gray-900" : "border-gray-200 bg-white"
      }`}
      variant="sidebar"
    >
      <SidebarHeader
        className={`border-b transition-all duration-300 p-6 ${isDark ? "border-purple-500/30" : "border-gray-200"}`}
      >
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#7B61FF] rounded-lg flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className={`text-xl font-bold transition-colors duration-300 ${isDark ? "text-white" : "text-black"}`}>
            ScribeBolt
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel
            className={`text-xs uppercase tracking-wider mb-2 transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.active}
                    className={`w-full justify-start transition-all duration-300 ${
                      isDark
                        ? "text-white hover:text-white hover:bg-purple-500/20 data-[active=true]:bg-[#7B61FF] data-[active=true]:text-white"
                        : "text-black hover:text-black hover:bg-gray-100 data-[active=true]:bg-[#7B61FF] data-[active=true]:text-white"
                    }`}
                  >
                    <Link href={item.href} className="flex items-center space-x-3 px-3 py-2 rounded-md">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Theme Toggle */}
        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className={`w-full justify-start transition-all duration-300 ${
                    isDark
                      ? "text-white hover:text-white hover:bg-purple-500/20"
                      : "text-black hover:text-black hover:bg-gray-100"
                  }`}
                >
                  {isDark ? <Sun className="h-5 w-5 mr-3" /> : <Moon className="h-5 w-5 mr-3" />}
                  <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter
        className={`border-t transition-all duration-300 p-4 ${isDark ? "border-purple-500/30" : "border-gray-200"}`}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={`flex items-center space-x-3 px-3 py-2 transition-colors duration-300 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              <div className="w-8 h-8 bg-[#7B61FF] rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate transition-colors duration-300 ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  John Doe
                </p>
                <p
                  className={`text-xs truncate transition-colors duration-300 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  john@company.com
                </p>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={`w-full justify-start transition-all duration-300 ${
                isDark
                  ? "text-white hover:text-white hover:bg-purple-500/20"
                  : "text-black hover:text-black hover:bg-gray-100"
              }`}
            >
              <Link href="/login" className="flex items-center space-x-3 px-3 py-2 rounded-md">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
