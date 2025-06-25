"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  Plus,
  Search,
  Edit,
  Trash2,
  MoreVertical,
  Sparkles,
  User,
  Target,
  Briefcase,
  Moon,
  Sun,
  Zap,
  Upload,
} from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-context"

interface Persona {
  id: string;
  name: string;
  description: string;
  painPoints?: string;
  createdAt?: string;
  lastUsed?: string;
  usageCount?: number;
}

export default function PersonasPage() {
  const { isDark, toggleTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null)
  const [personas, setPersonas] = useState<Persona[]>([])
  const user_id = "REPLACE_WITH_USER_ID" // TODO: get from session

  useEffect(() => {
    async function fetchPersonas() {
      const res = await fetch(`/api/personas?user_id=${user_id}`)
      const data = await res.json()
      if (data.success) setPersonas(data.personas)
    }
    fetchPersonas()
  }, [user_id])

  const handleCreatePersona = async (persona: Persona) => {
    const res = await fetch("/api/personas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, name: persona.name, description: persona.description }),
    })
    const data = await res.json()
    if (data.success) setPersonas([data.persona, ...personas])
  }

  const handleUpdatePersona = async (persona: Persona) => {
    const res = await fetch("/api/personas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: persona.id, user_id, name: persona.name, description: persona.description }),
    })
    const data = await res.json()
    if (data.success) setPersonas(personas.map(p => p.id === persona.id ? data.persona : p))
  }

  const handleDeletePersona = async (personaId: string) => {
    const res = await fetch("/api/personas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: personaId, user_id }),
    })
    const data = await res.json()
    if (data.success) setPersonas(personas.filter(p => p.id !== personaId))
  }

  const filteredPersonas = personas.filter(
    (persona) =>
      persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.painPoints?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.createdAt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.lastUsed?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.usageCount?.toString().includes(searchQuery.toLowerCase()),
  )

  const usePersonaInRewrite = (persona: Persona) => {
    // In a real app, this would navigate to the rewrite page with the persona pre-selected
    console.log("Using persona in rewrite:", persona.name)
    // You could use router.push('/dashboard?persona=' + persona.id) here
  }

  return (
    <div className={`${isDark ? "dark" : ""} theme-transition`}>
      <SidebarProvider>
        <div className={`flex h-screen transition-all duration-300 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
          <DashboardSidebar />
          <SidebarInset className="flex-1 w-full">
            <main className="flex-1 w-full overflow-auto">
              <div className="px-4 sm:px-8 w-full max-w-none">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1
                      className={`text-3xl font-bold mb-2 transition-colors duration-300 ${isDark ? "text-white" : "text-[#1A1A1A]"}`}
                    >
                      Personas
                    </h1>
                    <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                      Create and manage target personas for personalized email outreach
                    </p>
                  </div>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        New Persona
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Persona</DialogTitle>
                        <DialogDescription>
                          Define a target persona for your email outreach campaigns.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Persona Name
                          </Label>
                          <Input
                            id="name"
                            placeholder="e.g., Startup CTO, Ecom Founder"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Description
                          </Label>
                          <Input
                            id="description"
                            placeholder="Brief description of this persona"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="painPoints" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Pain Points & Challenges
                          </Label>
                          <Textarea
                            id="painPoints"
                            placeholder="Describe the main challenges, pain points, and goals this persona faces..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="min-h-[120px]"
                          />
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                          <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              const newPersona: Persona = {
                                id: Date.now().toString(),
                                name: searchQuery,
                                description: searchQuery,
                                painPoints: searchQuery,
                                createdAt: new Date().toISOString().split("T")[0],
                                lastUsed: "",
                                usageCount: 0,
                              }
                              handleCreatePersona(newPersona)
                              setIsCreateDialogOpen(false)
                            }}
                            className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white"
                          >
                            Save Persona
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search personas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-[#7B61FF] focus:ring-[#7B61FF]"
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            Total Personas
                          </p>
                          <p className="text-2xl font-bold text-[#1A1A1A] dark:text-white transition-colors duration-300">
                            {personas.length}
                          </p>
                        </div>
                        <Users className="h-8 w-8 text-[#7B61FF]" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            Total Usage
                          </p>
                          <p className="text-2xl font-bold text-[#1A1A1A] dark:text-white transition-colors duration-300">
                            {personas.reduce((sum, p) => sum + (p.usageCount ?? 0), 0)}
                          </p>
                        </div>
                        <Target className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                            Most Used
                          </p>
                          <p className="text-lg font-bold text-[#1A1A1A] dark:text-white transition-colors duration-300 truncate">
                            {personas.length > 0
                              ? personas.reduce((prev, current) =>
                                  (prev.usageCount ?? 0) > (current.usageCount ?? 0) ? prev : current,
                                ).name
                              : "None"}
                          </p>
                        </div>
                        <Briefcase className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Personas List */}
                {filteredPersonas.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredPersonas.map((persona) => (
                      <PersonaCard
                        key={persona.id}
                        persona={persona}
                        onDelete={handleDeletePersona}
                        onEdit={setEditingPersona}
                        onUse={usePersonaInRewrite}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="shadow-sm border-gray-200 dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-[#7B61FF]/10 rounded-full flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-[#7B61FF]" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-2">No personas found</h3>
                      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-4">
                        {searchQuery
                          ? "Try adjusting your search to find personas."
                          : "Create your first persona to start personalizing your email outreach."}
                      </p>
                      {!searchQuery && (
                        <Button
                          onClick={() => setIsCreateDialogOpen(true)}
                          className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create Persona
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Edit Persona Dialog */}
                {editingPersona && (
                  <Dialog open={true} onOpenChange={() => setEditingPersona(null)}>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Persona</DialogTitle>
                        <DialogDescription>Update your persona details.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-name" className="text-sm font-medium text-[#1A1A1A] dark:text-white">
                            Persona Name
                          </Label>
                          <Input
                            id="edit-name"
                            value={editingPersona.name}
                            onChange={(e) => handleUpdatePersona({ ...editingPersona, name: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="edit-description"
                            className="text-sm font-medium text-[#1A1A1A] dark:text-white"
                          >
                            Description
                          </Label>
                          <Input
                            id="edit-description"
                            value={editingPersona.description}
                            onChange={(e) => handleUpdatePersona({ ...editingPersona, description: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="edit-painPoints"
                            className="text-sm font-medium text-[#1A1A1A] dark:text-white"
                          >
                            Pain Points & Challenges
                          </Label>
                          <Textarea
                            id="edit-painPoints"
                            value={editingPersona.painPoints}
                            onChange={(e) => handleUpdatePersona({ ...editingPersona, painPoints: e.target.value })}
                            className="min-h-[120px]"
                          />
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                          <Button variant="outline" onClick={() => setEditingPersona(null)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              if (editingPersona) {
                                handleUpdatePersona(editingPersona)
                                setEditingPersona(null)
                              }
                            }}
                            className="bg-[#7B61FF] hover:bg-[#6B51E5] text-white"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

function PersonaCard({ persona, onDelete, onEdit, onUse }: {
  persona: Persona;
  onDelete: (id: string) => void;
  onEdit: (persona: Persona) => void;
  onUse: (persona: Persona) => void;
}) {
  return (
    <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow dark:border-purple-500/30 dark:bg-gray-800 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg text-[#1A1A1A] dark:text-white truncate">{persona.name}</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{persona.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(persona)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(persona.id)} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pain Points:</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{persona.painPoints}</p>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Used {persona.usageCount} times</span>
          <span>Created {new Date(persona.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUse(persona)}
            className="flex-1 border-[#7B61FF]/30 text-[#7B61FF] hover:bg-[#7B61FF]/5"
          >
            <Zap className="h-4 w-4 mr-2" />
            Use in Rewrite
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(persona)}
            className="border-gray-300 hover:bg-gray-50 dark:border-purple-500/30 dark:hover:bg-gray-700"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardSidebar() {
  const { isDark, toggleTheme } = useTheme()

  const menuItems = [
    { title: "Rewrite", icon: Edit3, href: "/dashboard" },
    { title: "Templates", icon: FileText, href: "/dashboard/templates" },
    { title: "Personas", icon: Users, href: "/dashboard/personas", active: true },
    { title: "Bulk Personalization", icon: Upload, href: "/dashboard/bulk-personalization" },
    { title: "Email Analyzer", icon: Zap, href: "/dashboard/email-analyzer" },
    { title: "Team Workspace", icon: Users, href: "/dashboard/team-workspace" },
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
                      {item.icon && <item.icon className="h-5 w-5" />}
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
