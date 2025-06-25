"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
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
  Upload,
  Sparkles,
  User,
  Moon,
  Sun,
  Zap,
  UserPlus,
  Crown,
  Eye,
  Edit,
  MoreVertical,
  Mail,
  Calendar,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-context"

interface TeamMember {
  id: string
  name: string
  email: string
  role: "Owner" | "Editor" | "Viewer"
  avatar?: string
  joinedAt: string
  lastActive: string
}

interface SharedResource {
  id: string
  name: string
  type: "template" | "persona"
  createdBy: string
  createdAt: string
  usageCount: number
}

const user_id = "REPLACE_WITH_USER_ID"; // TODO: get from session
const workspace_id = "REPLACE_WITH_WORKSPACE_ID"; // TODO: get from context or session

export default function TeamWorkspacePage() {
  const { isDark } = useTheme()
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("Viewer")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    async function fetchTeamMembers() {
      const res = await fetch(`/api/team-members?workspace_id=${workspace_id}`);
      const data = await res.json();
      if (data.success) setTeamMembers(data.members);
    }
    fetchTeamMembers();
  }, [workspace_id]);

  const sharedResources: SharedResource[] = [
    {
      id: "1",
      name: "SaaS Founder Outreach",
      type: "template",
      createdBy: "John Doe",
      createdAt: "2024-01-15",
      usageCount: 45,
    },
    {
      id: "2",
      name: "Startup CTO",
      type: "persona",
      createdBy: "Sarah Johnson",
      createdAt: "2024-01-10",
      usageCount: 23,
    },
    {
      id: "3",
      name: "Partnership Proposal",
      type: "template",
      createdBy: "Mike Chen",
      createdAt: "2024-01-08",
      usageCount: 12,
    },
    {
      id: "4",
      name: "Ecommerce Founder",
      type: "persona",
      createdBy: "John Doe",
      createdAt: "2024-01-05",
      usageCount: 67,
    },
  ]

  const handleInviteMember = async () => {
    if (!inviteEmail) return;
    const res = await fetch("/api/team-members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workspace_id, user_id, invited_email: inviteEmail, role: inviteRole }),
    });
    const data = await res.json();
    if (data.success) setTeamMembers([...teamMembers, data.member]);
    setInviteEmail("");
    setInviteRole("Viewer");
    setIsInviteDialogOpen(false);
  };

  const updateMemberRole = async (memberId: string, newRole: TeamMember["role"]) => {
    const res = await fetch("/api/team-members", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: memberId, user_id, role: newRole }),
    });
    const data = await res.json();
    if (data.success) setTeamMembers(teamMembers.map((member) => member.id === memberId ? data.member : member));
  };

  const removeMember = async (memberId: string) => {
    const res = await fetch("/api/team-members", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: memberId, user_id }),
    });
    const data = await res.json();
    if (data.success) setTeamMembers(teamMembers.filter((member) => member.id !== memberId));
  };

  const getRoleIcon = (role: TeamMember["role"]) => {
    switch (role) {
      case "Owner":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "Editor":
        return <Edit className="h-4 w-4 text-blue-500" />
      case "Viewer":
        return <Eye className="h-4 w-4 text-gray-500" />
    }
  }

  const getRoleBadge = (role: TeamMember["role"]) => {
    switch (role) {
      case "Owner":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Editor":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Viewer":
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
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
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1
                      className={`text-3xl font-bold mb-2 transition-colors duration-300 ${isDark ? "text-white" : "text-[#1A1A1A]"}`}
                    >
                      Team Workspace
                    </h1>
                    <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                      Collaborate with your team on templates, personas, and email campaigns
                    </p>
                  </div>
                  <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Invite Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Invite Team Member</DialogTitle>
                        <DialogDescription>Send an invitation to join your team workspace.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="invite-email" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Email Address
                          </Label>
                          <Input
                            id="invite-email"
                            type="email"
                            placeholder="colleague@company.com"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="invite-role" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Role
                          </Label>
                          <Select
                            value={inviteRole}
                            onValueChange={(value: TeamMember["role"]) => setInviteRole(value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Viewer">Viewer - Can view templates and personas</SelectItem>
                              <SelectItem value="Editor">Editor - Can create and edit content</SelectItem>
                              <SelectItem value="Owner">Owner - Full access and management</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                          <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleInviteMember}
                            disabled={!inviteEmail}
                            className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white"
                          >
                            Send Invitation
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Team Members */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <Users className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          Team Members ({teamMembers.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {teamMembers.map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                            >
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <p className="font-medium text-[#1A1A1A] dark:text-white">{member.name}</p>
                                    {getRoleIcon(member.role)}
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{member.email}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-500">
                                    Last active: {member.lastActive}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getRoleBadge(member.role)}>{member.role}</Badge>
                                {member.role !== "Owner" && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => updateMemberRole(member.id, "Viewer")}>
                                        Change to Viewer
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => updateMemberRole(member.id, "Editor")}>
                                        Change to Editor
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => updateMemberRole(member.id, "Owner")}>
                                        Change to Owner
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => removeMember(member.id)}
                                        className="text-red-600"
                                      >
                                        Remove Member
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Shared Resources */}
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <FileText className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          Shared Resources
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {sharedResources.map((resource) => (
                            <div
                              key={resource.id}
                              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-[#7B61FF]/10 rounded-lg flex items-center justify-center">
                                  {resource.type === "template" ? (
                                    <FileText className="h-5 w-5 text-[#7B61FF]" />
                                  ) : (
                                    <Users className="h-5 w-5 text-[#7B61FF]" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-[#1A1A1A] dark:text-white">{resource.name}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Created by {resource.createdBy} •{" "}
                                    {new Date(resource.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge
                                  variant="outline"
                                  className={
                                    resource.type === "template"
                                      ? "border-blue-200 text-blue-800"
                                      : "border-green-200 text-green-800"
                                  }
                                >
                                  {resource.type}
                                </Badge>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                  Used {resource.usageCount} times
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-6">
                    {/* Team Stats */}
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <Users className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          Team Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-[#1A1A1A] dark:text-white">{teamMembers.length}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Members</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-[#1A1A1A] dark:text-white">
                              {sharedResources.length}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Resources</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Templates</span>
                            <span className="font-medium text-[#1A1A1A] dark:text-white">
                              {sharedResources.filter((r) => r.type === "template").length}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Personas</span>
                            <span className="font-medium text-[#1A1A1A] dark:text-white">
                              {sharedResources.filter((r) => r.type === "persona").length}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Permissions */}
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <Shield className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          Role Permissions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <Crown className="h-4 w-4 text-yellow-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-[#1A1A1A] dark:text-white">Owner</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Full access, manage team, billing
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Edit className="h-4 w-4 text-blue-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-[#1A1A1A] dark:text-white">Editor</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Create, edit templates & personas
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Eye className="h-4 w-4 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-[#1A1A1A] dark:text-white">Viewer</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">View and use shared resources</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-[#1A1A1A] dark:text-white">
                          <Zap className="h-5 w-5 mr-2 text-[#7B61FF]" />
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start border-gray-300 hover:bg-gray-50 dark:border-purple-500/30 dark:hover:bg-gray-700"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Send Team Update
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-gray-300 hover:bg-gray-50 dark:border-purple-500/30 dark:hover:bg-gray-700"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Meeting
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-[#7B61FF]/30 text-[#7B61FF] hover:bg-[#7B61FF]/5"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Create Shared Template
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
    { title: "Team Workspace", icon: Users, href: "/dashboard/team-workspace", active: true },
    { title: "Settings", icon: Settings, href: "/dashboard/settings" },
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
